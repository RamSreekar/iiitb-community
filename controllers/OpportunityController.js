const opportunityService = require("../services/OpportunityService");

exports.getAllOpportunities = async (req, res) => {
    try {
        const opportunities = await opportunityService.getAllOpportunities();

        res.status(200).json(opportunities);
    } catch(err) {
        res.status(500).json(err);
    }
}