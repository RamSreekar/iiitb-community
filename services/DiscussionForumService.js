const Discussions = require('../models/DiscussionForumModel')

exports.getQuestionsByGroup = async (groupName) => {
    const requiredQuestions = await Discussions.find({ branch : "CSE" });

    return requiredQuestions;
}

exports.postQuestion = async (req) => {
    const question = new Discussions(req);

    await question.save();
}


