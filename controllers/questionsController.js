const { default: mongoose } = require("mongoose");
const DBSchema = require("../models/dbSchema");

async function getAllQuestions () {
    return await DBSchema.Question.find().sort({createdAt: -1});
};

async function createQuestion (questionDate) {
    return await DBSchema.Question.create(questionDate);
};

async function getQuestionById (questionId) {
    if (!mongoose.Types.ObjectId.isValid(questionId)) return null;
    return await DBSchema.Question.findById(questionId);
};

async function addAnswer (questionId, answerData) {
    if (!mongoose.Types.ObjectId.isValid(questionId)) return null;
    const answer = await DBSchema.Answer.create(answerData);
    if (!answer){
        console.log("Error, answer is not added to the DB.");
        return null;
    }
    const question = await DBSchema.Question.findById(questionId);
    question.answers.push(answer._id);
    return await question.save();
};

module.exports = {getAllQuestions, createQuestion, getQuestionById, addAnswer};
