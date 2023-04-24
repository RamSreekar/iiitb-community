const opportunityService = require("../services/OpportunityService");

exports.getAllOpportunities = async (req, res) => {
    try {
        const opportunities = await opportunityService.getAllOpportunities();

        res.status(200).json(opportunities);
    } catch(err) {
        res.status(500).json({"error": err.name , "message" : err.message});
    }
}

exports.getOpportunityById = async (req, res) => {
    try {
        const opportunityId = req.params.opportunityId;
        const requiredOpportunity = await opportunityService.getOpportunityById(opportunityId);

        if(requiredOpportunity == null) 
            res.status(404).json({"message" : "Opportunity doesn't exist with given Id!"});
        else 
            res.status(200).json(requiredOpportunity);
    } catch(err) {
        res.status(500).json({"error": err.name , "message" : err.message});
    }
}

exports.postOpportunity =  async (req, res, next) => {
    try {
        const opportunitiy = req.body;         
        await opportunityService.postOpportunity(opportunitiy);
        res.status(200).json({"message" : "Opportunitiy created!"});
    } 
    catch (err) {
      res.status(500).json({"error": err.name , "message" : err.message});
    }
  };