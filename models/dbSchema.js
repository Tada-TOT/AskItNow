const mongoose = require("mongoose");

const answerSchema = mongoose.Schema({
    text: {
        type: String,
        required: true
    }, 
    addedAt: {
        type: Date,
        default: Date.now()
    },
    answeredBy: {
        type: String,
        default: undefined
    },
    votes: {
        type: Number,
        default: 0
    },
    accepted: {
        type: Boolean,
        default: false
    }
});
const Answer = mongoose.model('Answer', answerSchema);

const questionsSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: undefined
    },
    tags: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    answers: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Answer"
        }],
        default: []
    },
    answered: {
        type: Boolean,
        default: false
    },
    author: {
        id: Number,
        username: String,
    }
});
const Question = mongoose.model('Question', questionsSchema);

const userSchema = mongoose.Schema({
    password: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        default: undefined
    },
    email: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        default: undefined
    },
    avatarUrl: {
        type: String,
        default: "https://www.gravatar.com/avatar/placeholder?s=50&d=robohash"
    }
});
const User = mongoose.model('User', userSchema);

module.exports = {Answer, Question, User};
