// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract PiCoin is ERC20, Ownable, ReentrancyGuard {
    // Constants
    uint256 public constant TARGET_VALUE = 314159 * 10 ** 18; // Target value in wei (18 decimals)
    uint256 public constant TOTAL_SUPPLY = 100000000000 * 10 ** 18; // Total supply in wei (18 decimals)
    uint256 public collateralRatio; // Collateralization ratio
    mapping(address => uint256) public collateral; // Collateral amounts for each user

    // Events
    event Minted(address indexed to, uint256 amount);
    event Burned(address indexed from, uint256 amount);
    event CollateralAdded(address indexed user, uint256 amount);
    event CollateralRemoved(address indexed user, uint256 amount);

    constructor() ERC20("PiCoin", "PI") {
        _mint(msg.sender, TOTAL_SUPPLY); // Mint total supply to the contract owner
        collateralRatio = 150; // Default collateralization ratio (150%)
    }

    // Mint new PiCoins
    function mint(address to, uint256 amount) external onlyOwner {
        require(totalSupply() + amount <= TOTAL_SUPPLY, "Exceeds total supply limit");
        _mint(to, amount);
        emit Minted(to, amount);
    }

    // Burn PiCoins
    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
        emit Burned(msg.sender, amount);
    }

    // Add collateral
    function addCollateral(uint256 amount) external nonReentrant {
        require(amount > 0, "Amount must be greater than zero");
        collateral[msg.sender] += amount;
        emit CollateralAdded(msg.sender, amount);
    }

    // Remove collateral
    function removeCollateral(uint256 amount) external nonReentrant {
        require(collateral[msg.sender] >= amount, "Insufficient collateral");
        collateral[msg.sender] -= amount;
        emit CollateralRemoved(msg.sender, amount);
    }

    // Get collateral balance
    function getCollateralBalance(address user) external view returns (uint256) {
        return collateral[user];
    }

    // Override transfer function to include collateral checks
    function transfer(address recipient, uint256 amount) public override returns (bool) {
        require(collateral[msg.sender] >= (amount * collateralRatio) / 100, "Insufficient collateral for transfer");
        return super.transfer(recipient, amount);
    }

    // Override transferFrom function to include collateral checks
    function transferFrom(address sender, address recipient, uint256 amount) public override returns (bool) {
        require(collateral[sender] >= (amount * collateralRatio) / 100, "Insufficient collateral for transfer");
        return super.transferFrom(sender, recipient, amount);
    }
}
