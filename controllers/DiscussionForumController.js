const discussionForumService = require('../services/DiscussionForumService');

exports.getQuestionById = async (req, res) => {
    try {
        const questionId = req.params.questionId;
        const requiredQuestion = await discussionForumService.getQuestionById(questionId);

        if(requiredQuestion == null) {
            res.status(404).json({ "message": "No questions available for given branch!" });
            return;
        }

        res.status(200).json(requiredQuestion);
    } catch(err) {
        res.status(500).json({"error": err.name , "message" : err.message});
    }
}

exports.getQuestionsByGroup = async (req, res) => {
    try {
        const branch = req.params.branch;
        const requiredQuestions = await discussionForumService.getQuestionsByGroup(branch);

        if(requiredQuestions == null) {
            res.status(404).json({ "message": "No questions available for given branch!" });
            return;
        }

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

exports.postReply = async (req, res) => {
    try {
        console.log(req.body);

        const qId = req.body.qid;

        const replyTimestamp = req.body.timestamp;
        var replyAuthor = req.body.author;
        var authorArray = replyAuthor.split("@");
        var replyAuthorName = authorArray[0];
        var replyAuthorNameArray = replyAuthorName.split(".");
        var name = '';
        replyAuthorNameArray.forEach(part => {
            name += part 
        });
        replyAuthorName = name;
        const replyText = req.body.reply;

        replyId = qId + "/" + replyAuthorName + "/" + replyTimestamp;

        replyJson = {
            qid: qId,
            reply_id: replyId,
            reply_author: replyAuthor,
            reply_timestamp: replyTimestamp,
            reply_text: replyText
        };
        await discussionForumService.postReply(qId, replyId, replyJson);

        res.status(200).json({ "message" : "Reply posted!" });
    } catch(err) {
        res.status(500).json({"error": err.name , "message" : err.message});
    }
}