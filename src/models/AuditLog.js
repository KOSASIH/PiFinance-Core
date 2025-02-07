const mongoose = require('mongoose');

// Define the AuditLog schema
const auditLogSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User ', // Reference to the User model
    },
    action: {
        type: String,
        required: true,
        enum: ['create', 'update', 'delete', 'login', 'logout', 'transaction'], // Allowed action types
    },
    targetId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        // This can reference different models based on the action
    },
    details: {
        type: String,
        required: true, // Description of the action taken
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Method to log an audit event
auditLogSchema.methods.logEvent = async function() {
    this.createdAt = Date.now(); // Set the creation date
    await this.save(); // Save the audit log
    return this; // Return the logged event
};

// Create the AuditLog model
const AuditLog = mongoose.model('AuditLog', auditLogSchema);

module.exports = AuditLog;
