const Opportunities = require("../models/OpportunityModel");

exports.getAllOpportunities = async () => {
    const opportunities = await Opportunities.find({});

    return opportunities;
}

exports.getOpportunityById = async (opportunityId) => {
    const requiredOpportunity = await Opportunities.findById(opportunityId);

    return requiredOpportunity;
}