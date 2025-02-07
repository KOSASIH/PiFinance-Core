const mongoose = require('mongoose');

// Define the RiskAssessment schema
const riskAssessmentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User ', // Reference to the User model
    },
    riskLevel: {
        type: String,
        required: true,
        enum: ['low', 'medium', 'high'], // Allowed risk levels
    },
    assessmentDate: {
        type: Date,
        default: Date.now, // Default to the current date
    },
    details: {
        type: String,
        required: true, // Description of the risk assessment
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

// Method to update the risk assessment
riskAssessmentSchema.methods.updateAssessment = async function(newRiskLevel, newDetails) {
    this.riskLevel = newRiskLevel; // Update the risk level
    this.details = newDetails; // Update the details
    this.updatedAt = Date.now(); // Update the timestamp
    await this.save(); // Save the updated assessment
    return this; // Return the updated assessment
};

// Create the RiskAssessment model
const RiskAssessment = mongoose.model('RiskAssessment', riskAssessmentSchema);

module.exports = RiskAssessment;
