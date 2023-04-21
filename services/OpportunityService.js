const Opportunities = require("../models/OpportunityModel");

exports.getAllOpportunities = async () => {
    const opportunities = await Opportunities.find({});

    return opportunities;
}