const mongoose = require('mongoose');

// Define the SavingsAccount schema
const savingsAccountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User ', // Reference to the User model
    },
    balance: {
        type: Number,
        default: 0,
        min: 0, // Balance cannot be negative
    },
    interestRate: {
        type: Number,
        required: true,
        min: 0, // Interest rate cannot be negative
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

// Method to deposit money into the savings account
savingsAccountSchema.methods.deposit = async function(amount) {
    if (amount <= 0) {
        throw new Error('Deposit amount must be positive');
    }
    this.balance += amount;
    this.updatedAt = Date.now(); // Update the timestamp
    await this.save(); // Save the updated account
    return this.balance; // Return the new balance
};

// Method to withdraw money from the savings account
savingsAccountSchema.methods.withdraw = async function(amount) {
    if (amount <= 0) {
        throw new Error('Withdrawal amount must be positive');
    }
    if (amount > this.balance) {
        throw new Error('Insufficient funds');
    }
    this.balance -= amount;
    this.updatedAt = Date.now(); // Update the timestamp
    await this.save(); // Save the updated account
    return this.balance; // Return the new balance
};

// Create the SavingsAccount model
const SavingsAccount = mongoose.model('SavingsAccount', savingsAccountSchema);

module.exports = SavingsAccount;
