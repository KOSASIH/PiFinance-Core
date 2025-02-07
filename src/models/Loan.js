const mongoose = require('mongoose');

// Define the Loan schema
const loanSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User ', // Reference to the User model
    },
    amount: {
        type: Number,
        required: true,
        min: 0, // Loan amount cannot be negative
    },
    interestRate: {
        type: Number,
        required: true,
        min: 0, // Interest rate cannot be negative
    },
    term: {
        type: Number,
        required: true,
        min: 1, // Loan term must be at least 1 month
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected', 'paid'],
        default: 'pending', // Default status is pending
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

// Method to approve the loan
loanSchema.methods.approve = async function() {
    this.status = 'approved';
    this.updatedAt = Date.now(); // Update the timestamp
    await this.save(); // Save the updated loan
    return this; // Return the updated loan
};

// Method to reject the loan
loanSchema.methods.reject = async function() {
    this.status = 'rejected';
    this.updatedAt = Date.now(); // Update the timestamp
    await this.save(); // Save the updated loan
    return this; // Return the updated loan
};

// Method to mark the loan as paid
loanSchema.methods.markAsPaid = async function() {
    this.status = 'paid';
    this.updatedAt = Date.now(); // Update the timestamp
    await this.save(); // Save the updated loan
    return this; // Return the updated loan
};

// Create the Loan model
const Loan = mongoose.model('Loan', loanSchema);

module.exports = Loan;
