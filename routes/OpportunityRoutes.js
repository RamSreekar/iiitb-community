const express = require("express");
const opportunityController = require("../controllers/OpportunityController");

const router = express.Router();

router.get("/all", opportunityController.getAllOpportunities);

router.get("/:opportunityId", opportunityController.getOpportunityById);

router.post("/create", opportunityController.postOpportunity);

module.exports = router;
