const mongoose = require('mongoose');

// Define the Investment schema
const investmentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User ', // Reference to the User model
    },
    amount: {
        type: Number,
        required: true,
        min: 0, // Investment amount cannot be negative
    },
    assetType: {
        type: String,
        required: true,
        enum: ['stocks', 'bonds', 'crypto', 'real estate'], // Allowed asset types
    },
    investmentDate: {
        type: Date,
        default: Date.now,
    },
    expectedReturn: {
        type: Number,
        default: 0, // Default expected return
    },
    status: {
        type: String,
        enum: ['active', 'completed', 'cancelled'],
        default: 'active', // Default status is active
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

// Method to update the investment status
investmentSchema.methods.updateStatus = async function(newStatus) {
    if (!['active', 'completed', 'cancelled'].includes(newStatus)) {
        throw new Error('Invalid status');
    }
    this.status = newStatus;
    this.updatedAt = Date.now(); // Update the timestamp
    await this.save(); // Save the updated investment
    return this; // Return the updated investment
};

// Method to calculate expected return based on a simple interest model
investmentSchema.methods.calculateExpectedReturn = function(rateOfReturn) {
    if (rateOfReturn < 0) {
        throw new Error('Rate of return must be non-negative');
    }
    this.expectedReturn = this.amount * (1 + rateOfReturn); // Simple interest calculation
    return this.expectedReturn; // Return the expected return
};

// Create the Investment model
const Investment = mongoose.model('Investment', investmentSchema);

module.exports = Investment;
