const discussionForumService = require('../services/DiscussionForumService');

exports.getQuestionsByGroup = async (req, res) => {
    try {
        const groupName = req.params.groupName;
        const requiredQuestions = await discussionForumService.getQuestionsByGroup(groupName);

        res.status(200).json(requiredQuestions);
    } catch(err) {
        res.status(500).json({"error": err.name , "message" : err.message});
    }
}

exports.postQuestion = async (req, res) => {
    try {
        const question = req.body;
        await discussionForumService.postQuestion(question);

        res.status(200).json({ "message" : "Question posted!" });
    } catch(err) {
        res.status(500).json({"error": err.name , "message" : err.message});
    }
}