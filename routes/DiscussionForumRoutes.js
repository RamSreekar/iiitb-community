const express = require("express");
const router = express.Router();

const discussionForumController = require('../controllers/DiscussionForumController');

router.get("/questions/:groupName", discussionForumController.getQuestionsByGroup);

router.post("/questions/post", discussionForumController.postQuestion);

module.exports = router;