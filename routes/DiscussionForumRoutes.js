const express = require("express");
const router = express.Router();

const discussionForumController = require('../controllers/DiscussionForumController');

router.get("/question/:questionId", discussionForumController.getQuestionById);

router.get("/questions/:branch", discussionForumController.getQuestionsByGroup);

router.post("/questions/post", discussionForumController.postQuestion);

router.post("/reply/post", discussionForumController.postReply);

module.exports = router;