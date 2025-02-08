// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./PiCoin.sol";
import "./StablecoinManager.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract TransactionProcessor is Ownable, ReentrancyGuard {
    PiCoin public piCoin;
    StablecoinManager public stablecoinManager;

    // Event for logging transactions
    event TransactionProcessed(address indexed user, uint256 amount, string transactionType, uint256 timestamp);

    // Constructor
    constructor(PiCoin _piCoin, StablecoinManager _stablecoinManager) {
        piCoin = _piCoin;
        stablecoinManager = _stablecoinManager;
    }

    // Process a deposit transaction
    function processDeposit(uint256 amount) external nonReentrant {
        require(amount > 0, "Amount must be greater than zero");
        
        // Mint new PiCoins for the user
        stablecoinManager.mint(amount);
        
        // Log the transaction
        emit TransactionProcessed(msg.sender, amount, "deposit", block.timestamp);
    }

    // Process a withdrawal transaction
    function processWithdrawal(uint256 amount) external nonReentrant {
        require(amount > 0, "Amount must be greater than zero");
        
        // Burn PiCoins from the user
        stablecoinManager.burn(amount);
        
        // Log the transaction
        emit TransactionProcessed(msg.sender, amount, "withdrawal", block.timestamp);
    }

    // Process a transfer transaction
    function processTransfer(address to, uint256 amount) external nonReentrant {
        require(to != address(0), "Invalid recipient address");
        require(amount > 0, "Amount must be greater than zero");
        require(piCoin.balanceOf(msg.sender) >= amount, "Insufficient balance");

        // Transfer PiCoins from the sender to the recipient
        piCoin.transferFrom(msg.sender, to, amount);
        
        // Log the transaction
        emit TransactionProcessed(msg.sender, amount, "transfer", block.timestamp);
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
