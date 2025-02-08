// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./PiCoin.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract StablecoinManager is Ownable, ReentrancyGuard {
    using SafeMath for uint256;

    PiCoin public piCoin;
    address public oracle; // Address of the price oracle

    // Collateral structure
    struct Collateral {
        uint256 amount; // Amount of collateral
        uint256 price;  // Price of the collateral in USD
    }

    // Mapping of user collateral
    mapping(address => Collateral) public collateralBalances;
    mapping(address => mapping(address => uint256)) public tokenCollateral; // Token collateral

    // Events
    event Minted(address indexed user, uint256 amount);
    event Burned(address indexed user, uint256 amount);
    event CollateralDeposited(address indexed user, uint256 amount);
    event CollateralWithdrawn(address indexed user, uint256 amount);
    event Liquidated(address indexed user, uint256 amount);

    // Constructor
    constructor(PiCoin _piCoin, address _oracle) {
        piCoin = _piCoin;
        oracle = _oracle;
    }

    // Deposit Ether as collateral
    function depositCollateral() external payable nonReentrant {
        require(msg.value > 0, "Must deposit a positive amount");
        collateralBalances[msg.sender].amount = collateralBalances[msg.sender].amount.add(msg.value);
        collateralBalances[msg.sender].price = getCollateralPrice(); // Update collateral price
        emit CollateralDeposited(msg.sender, msg.value);
    }

    // Deposit ERC20 tokens as collateral
    function depositTokenCollateral(address token, uint256 amount) external nonReentrant {
        require(amount > 0, "Must deposit a positive amount");
        IERC20(token).transferFrom(msg.sender, address(this), amount);
        tokenCollateral[msg.sender][token] = tokenCollateral[msg.sender][token].add(amount);
        emit CollateralDeposited(msg.sender, amount);
    }

    // Withdraw Ether collateral
    function withdrawCollateral(uint256 amount) external nonReentrant {
        require(collateralBalances[msg.sender].amount >= amount, "Insufficient collateral");
        collateralBalances[msg.sender].amount = collateralBalances[msg.sender].amount.sub(amount);
        payable(msg.sender).transfer(amount);
        emit CollateralWithdrawn(msg.sender, amount);
    }

    // Withdraw ERC20 token collateral
    function withdrawTokenCollateral(address token, uint256 amount) external nonReentrant {
        require(tokenCollateral[msg.sender][token] >= amount, "Insufficient collateral");
        tokenCollateral[msg.sender][token] = tokenCollateral[msg.sender][token].sub(amount);
        IERC20(token).transfer(msg.sender, amount);
        emit CollateralWithdrawn(msg.sender, amount);
    }

    // Mint new PiCoins
    function mint(uint256 amount) external nonReentrant {
        require(isCollateralized(msg.sender, amount), "Insufficient collateral for minting");
        piCoin.transfer(msg.sender, amount);
        emit Minted(msg.sender, amount);
    }

    // Burn PiCoins
    function burn(uint256 amount) external nonReentrant {
        require(piCoin.balanceOf(msg.sender) >= amount, "Insufficient balance to burn");
        piCoin.transferFrom(msg.sender, address(this), amount);
        emit Burned(msg.sender, amount);
    }

    // Check if user is collateralized
    function isCollateralized(address user, uint256 amount) internal view returns (bool) {
        uint256 collateralValue = collateralBalances[user].amount.mul(collateralBalances[user].price).div(1 ether);
        return collateralValue >= amount.mul(1 ether); // Assuming 1 PI = 1 USD for simplicity
    }

    // Liquidate under-collateralized positions
    function liquidate(address user) external onlyOwner {
        require(!isCollateralized(user, 0), "User  is not under-collateralized");
        uint256 collateralAmount = collateralBalances[user].amount;
        collateralBalances[user].amount = 0; // Reset collateral balance
        emit Liquidated(user, collateralAmount);
    }

    // Set the oracle address
    function setOracle(address _oracle) external onlyOwner {
        oracle = _oracle;
    }

    // Get the price of collateral from the oracle
    function getCollateralPrice() internal view returns (uint256) {
        // Placeholder for actual oracle integration
        // This should return the price of the collateral in USD
        return 1 ether; // Example: 1 ETH = 1 USD
    }
}
