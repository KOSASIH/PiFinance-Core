// src/models/Compliance.js

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig'); // Assuming you have a database configuration file

class Compliance extends Model {}

// Define the Compliance model
Compliance.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Users', // Assuming you have a Users model
            key: 'id',
        },
    },
    complianceType: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    status: {
        type: DataTypes.ENUM('pending', 'approved', 'rejected'),
        defaultValue: 'pending',
    },
    documentation: {
        type: DataTypes.JSONB, // Store compliance documents as JSON
        allowNull: true,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    sequelize,
    modelName: 'Compliance',
    tableName: 'compliance_records',
    timestamps: true,
});

// Export the Compliance model
module.exports = Compliance;
