// proposalController.js

const proposalService = require('../services/proposalService');

exports.submitProposal = async (req, res) => {
    try {
        const proposal = await proposalService.submitProposal(req.body);
        res.status(201).json({ proposal });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getProposals = async (req, res) => {
    try {
        const proposals = await proposalService.getProposals();
        res.status(200).json({ proposals });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

