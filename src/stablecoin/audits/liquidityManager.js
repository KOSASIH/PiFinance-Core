// src/stablecoin/audits/liquidityManager.js

const fs = require('fs');
const path = require('path');

class LiquidityAudit {
    constructor() {
        this.auditFilePath = path.join(__dirname, 'liquidityAudit.json');
        this.initializeAuditFile();
    }

    // Initialize the liquidity audit file
    initializeAuditFile() {
        if (!fs.existsSync(this.auditFilePath)) {
            fs.writeFileSync(this.auditFilePath, JSON.stringify([])); // Create an empty array if file doesn't exist
        }
    }

    // Log an addition of liquidity
    logAddLiquidity(asset, amount, user) {
        const auditEntry = {
            action: 'addLiquidity',
            asset,
            amount,
            user,
            timestamp: new Date().toISOString(),
        };
        this.logAuditEntry(auditEntry);
    }

    // Log a removal of liquidity
    logRemoveLiquidity(asset, amount, user) {
        const auditEntry = {
            action: 'removeLiquidity',
            asset,
            amount,
            user,
            timestamp: new Date().toISOString(),
        };
        this.logAuditEntry(auditEntry);
    }

    // Log a swap operation
    logSwap(asset, stablecoinAmount, assetAmount, user) {
        const auditEntry = {
            action: 'swap',
            asset,
            stablecoinAmount,
            assetAmount,
            user,
            timestamp: new Date().toISOString(),
        };
        this.logAuditEntry(auditEntry);
    }

    // Log an audit entry to the file
    logAuditEntry(entry) {
        const auditHistory = this.getAuditHistory();
        auditHistory.push(entry);
        fs.writeFileSync(this.auditFilePath, JSON.stringify(auditHistory, null, 2));
        console.log('Liquidity audit entry logged:', entry);
    }

    // Retrieve the audit history
    getAuditHistory() {
        const data = fs.readFileSync(this.auditFilePath);
        return JSON.parse(data);
    }

    // Retrieve audit history for a specific user
    getUser AuditHistory(userAddress) {
        const history = this.getAuditHistory();
        return history.filter(entry => entry.user === userAddress);
    }
}

module.exports = new LiquidityAudit();
