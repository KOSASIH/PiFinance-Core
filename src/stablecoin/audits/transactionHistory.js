// src/stablecoin/audits/transactionHistory.js

const fs = require('fs');
const path = require('path');

class TransactionHistory {
    constructor() {
        this.historyFilePath = path.join(__dirname, 'transactionHistory.json');
        this.initializeHistoryFile();
    }

    // Initialize the transaction history file
    initializeHistoryFile() {
        if (!fs.existsSync(this.historyFilePath)) {
            fs.writeFileSync(this.historyFilePath, JSON.stringify([])); // Create an empty array if file doesn't exist
        }
    }

    // Log a transaction
    logTransaction(transaction) {
        const history = this.getTransactionHistory();
        history.push(transaction);
        fs.writeFileSync(this.historyFilePath, JSON.stringify(history, null, 2));
        console.log('Transaction logged:', transaction);
    }

    // Retrieve transaction history
    getTransactionHistory() {
        const data = fs.readFileSync(this.historyFilePath);
        return JSON.parse(data);
    }

    // Retrieve transaction history for a specific user
    getUser TransactionHistory(userAddress) {
        const history = this.getTransactionHistory();
        return history.filter(tx => tx.user === userAddress);
    }
}

module.exports = new TransactionHistory();
