const mongoose = require('mongoose');

// Define the Transaction schema
const transactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User ', // Reference to the User model
    },
    type: {
        type: String,
        required: true,
        enum: ['deposit', 'withdrawal', 'transfer', 'investment', 'loan repayment'], // Allowed transaction types
    },
    amount: {
        type: Number,
        required: true,
        min: 0, // Transaction amount cannot be negative
    },
    accountId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'SavingsAccount', // Reference to the SavingsAccount model
    },
    investmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Investment', // Reference to the Investment model (optional)
    },
    loanId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Loan', // Reference to the Loan model (optional)
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

// Method to log a transaction
transactionSchema.methods.logTransaction = async function() {
    this.createdAt = Date.now(); // Set the creation date
    this.updatedAt = Date.now(); // Set the updated date
    await this.save(); // Save the transaction
    return this; // Return the logged transaction
};

// Create the Transaction model
const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
