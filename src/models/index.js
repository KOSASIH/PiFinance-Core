// Importing all models
const User = require('./User ');
const SavingsAccount = require('./SavingsAccount');
const Loan = require('./Loan');
const Investment = require('./Investment');
const Transaction = require('./Transaction');
const AuditLog = require('./AuditLog');
const Notification = require('./Notification');
const RiskAssessment = require('./RiskAssessment');

// Exporting all models as an object
module.exports = {
    User,
    SavingsAccount,
    Loan,
    Investment,
    Transaction,
    AuditLog,
    Notification,
    RiskAssessment,
};
