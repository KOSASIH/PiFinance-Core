// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SavingsContract {
    struct Account {
        uint256 balance;
        uint256 interestRate; // Annual interest rate in basis points
        uint256 lastInterestAccrued; // Timestamp of last interest accrual
        bool isActive;
    }

    mapping(address => Account) private accounts;
    address public owner;

    event AccountCreated(address indexed user, uint256 initialDeposit);
    event DepositMade(address indexed user, uint256 amount);
    event WithdrawalMade(address indexed user, uint256 amount);
    event InterestAccrued(address indexed user, uint256 interest);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    modifier accountExists() {
        require(accounts[msg.sender].isActive, "Account does not exist");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function createAccount(uint256 initialDeposit, uint256 interestRate) external {
        require(!accounts[msg.sender].isActive, "Account already exists");
        require(initialDeposit > 0, "Initial deposit must be greater than zero");
        require(interestRate > 0, "Interest rate must be greater than zero");

        accounts[msg.sender] = Account({
            balance: initialDeposit,
            interestRate: interestRate,
            lastInterestAccrued: block.timestamp,
            isActive: true
        });

        emit AccountCreated(msg.sender, initialDeposit);
    }

    function deposit(uint256 amount) external accountExists {
        require(amount > 0, "Deposit amount must be greater than zero");
        accounts[msg.sender].balance += amount;
        emit DepositMade(msg.sender, amount);
    }

    function withdraw(uint256 amount) external accountExists {
        require(amount > 0 && amount <= accounts[msg.sender].balance, "Invalid withdrawal amount");
        accounts[msg.sender].balance -= amount;
        emit WithdrawalMade(msg.sender, amount);
    }

    function accrueInterest() external accountExists {
        Account storage account = accounts[msg.sender];
        uint256 timeElapsed = block.timestamp - account.lastInterestAccrued;
        uint256 interest = (account.balance * account.interestRate * timeElapsed) / (365 days * 10000);
        account.balance += interest;
        account.lastInterestAccrued = block.timestamp;

        emit InterestAccrued(msg.sender, interest);
    }

    function getBalance() external view accountExists returns (uint256) {
        return accounts[msg.sender].balance;
    }

    function getInterestRate() external view accountExists returns (uint256) {
        return accounts[msg.sender].interestRate;
    }

    function deactivateAccount() external accountExists {
        delete accounts[msg.sender];
    }
}
