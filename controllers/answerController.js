const { default: mongoose } = require("mongoose");
const DBSchema = require("../models/dbSchema");

async function updateAnswer (answerId, method, questionId) {
    if (!mongoose.Types.ObjectId.isValid(questionId)) return null;
    if (!mongoose.Types.ObjectId.isValid(answerId)) return null;
    const answer = await DBSchema.Answer.findById(answerId);
    switch (method.toLowerCase()) {
        case "upvote":
            answer.votes += 1
            return await answer.save();
        case "downvote":
            answer.votes -= 1
            return await answer.save();
        case "accept":
            await DBSchema.Question.findByIdAndUpdate(questionId, {answered: true});
            await DBSchema.Answer.findByIdAndUpdate(answerId, {accepted: true});
            return answer;
        default: return null
    }
};

async function getAnswers (answersId) {
    return await DBSchema.Answer.find({_id: {"$in": answersId}});
};

module.exports = {updateAnswer, getAnswers};
