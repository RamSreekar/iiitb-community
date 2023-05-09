const Discussions = require('../models/DiscussionForumModel')

exports.getQuestionById = async (questionId) => {
    const requiredQuestion = await Discussions.findById(questionId);

    return requiredQuestion;
}

exports.getQuestionsByGroup = async (branch) => {
    const requiredQuestions = await Discussions.find({ branch : branch });

    return requiredQuestions;
}

exports.postQuestion = async (req) => {
    const question = new Discussions(req);

    await question.save();
}

exports.postReply = async (questionId, replyId, replyJson) => {
    data = { $set: { ["replies." + replyId]: replyJson } };

    await Discussions.updateOne({ _id: questionId }, data);
}
