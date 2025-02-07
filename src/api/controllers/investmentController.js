const InvestmentService = require('../services/investmentService');

exports.createInvestment = async (req, res) => {
    try {
        const investment = await InvestmentService.create(req.user.id, req.body);
        res.status(201).json(investment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getInvestmentPortfolio = async (req, res) => {
    try {
        const portfolio = await InvestmentService.getPortfolio(req.user.id);
        res.status(200).json(portfolio);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
