const express = require("express");
const opportunityController = require("../controllers/OpportunityController");

const router = express.Router();

router.get("/all", opportunityController.getAllOpportunities);

module.exports = router;
