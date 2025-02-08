// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./PiCoin.sol";
import "./StablecoinManager.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract TransactionProcessor is Ownable, ReentrancyGuard {
    using SafeMath for uint256;

    PiCoin public piCoin;
    StablecoinManager public stablecoinManager;

    // Dynamic fee structure
    uint256 public transactionFee; // Fee in basis points (1 basis point = 0.01%)
    uint256 public constant MAX_FEE = 1000; // Maximum fee of 10%

    // Event for logging transactions
    event TransactionProcessed(address indexed user, uint256 amount, string transactionType, uint256 timestamp, uint256 fee);
    event FeeUpdated(uint256 newFee);

    // Constructor
    constructor(PiCoin _piCoin, StablecoinManager _stablecoinManager, uint256 _initialFee) {
        piCoin = _piCoin;
        stablecoinManager = _stablecoinManager;
        setTransactionFee(_initialFee);
    }

    // Set transaction fee
    function setTransactionFee(uint256 _fee) public onlyOwner {
        require(_fee <= MAX_FEE, "Fee exceeds maximum limit");
        transactionFee = _fee;
        emit FeeUpdated(_fee);
    }

    // Process a deposit transaction
    function processDeposit(uint256 amount) external nonReentrant {
        require(amount > 0, "Amount must be greater than zero");
        
        // Mint new PiCoins for the user
        stablecoinManager.mint(amount);
        
        // Calculate fee
        uint256 fee = calculateFee(amount);
        require(piCoin.balanceOf(msg.sender) >= fee, "Insufficient balance to pay fee");
        
        // Transfer fee
        piCoin.transferFrom(msg.sender, address(this), fee);
        
        // Log the transaction
        emit TransactionProcessed(msg.sender, amount, "deposit", block.timestamp, fee);
    }

    // Process a withdrawal transaction
    function processWithdrawal(uint256 amount) external nonReentrant {
        require(amount > 0, "Amount must be greater than zero");
        
        // Burn PiCoins from the user
        stablecoinManager.burn(amount);
        
        // Calculate fee
        uint256 fee = calculateFee(amount);
        require(piCoin.balanceOf(msg.sender) >= fee, "Insufficient balance to pay fee");
        
        // Transfer fee
        piCoin.transferFrom(msg.sender, address(this), fee);
        
        // Log the transaction
        emit TransactionProcessed(msg.sender, amount, "withdrawal", block.timestamp, fee);
    }

    // Process a transfer transaction
    function processTransfer(address to, uint256 amount) external nonReentrant {
        require(to != address(0), "Invalid recipient address");
        require(amount > 0, "Amount must be greater than zero");
        require(piCoin.balanceOf(msg.sender) >= amount, "Insufficient balance");

        // Calculate fee
        uint256 fee = calculateFee(amount);
        require(piCoin.balanceOf(msg.sender) >= amount.add(fee), "Insufficient balance to pay fee");

        // Transfer PiCoins from the sender to the recipient
        piCoin.transferFrom(msg.sender, to, amount);
        
        // Transfer fee
        piCoin.transferFrom(msg.sender, address(this), fee);
        
        // Log the transaction
        emit TransactionProcessed(msg.sender, amount, "transfer", block.timestamp, fee);
    }

    // Calculate transaction fee
    function calculateFee(uint256 amount) internal view returns (uint256) {
        return amount.mul(transactionFee).div(10000); // Convert basis points to percentage
    }

    // Function to get the balance of a user
    function getBalance(address user) external view returns (uint256) {
        return piCoin.balanceOf(user);
    }

    // Function to set the StablecoinManager address (onlyOwner)
    function setStablecoinManager(StablecoinManager _stablecoinManager) external onlyOwner {
        stablecoinManager = _stablecoinManager;
    }
}
