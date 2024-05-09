const express = require("express");
const questionController = require("../controllers/questionsController");
const answerController = require("../controllers/answerController");

const router = express.Router();
router.use(express.json());

router.get("/", async (req, res) => {
    const questions = await questionController.getAllQuestions();
    if (!questions) res.status(404).json({error: "No questions found!"});
    res.json(questions);
});

router.post("/", async (req, res) => {
    const question = await questionController.createQuestion(req.body);
    if (!question) res.status(404).json({error: "Questions not added to DB!"});
    res.json(question);
});

router.get("/:id", async (req,res) => {
    const question = await questionController.getQuestionById(req.params.id);
    const answers = (question.answers.length > 0) ? await answerController.getAnswers(question.answers) : [];
    if (!question) res.status(404).json({error: `Question with id ${req.params.id} is not found!`})    
    res.render("question", {
        Title: "",
        index: false,
        question: question,
        answers: answers
    });
});

router.post("/:id", async (req, res) =>{
    const question = await questionController.addAnswer(req.params.id, req.body);
    if (!question) res.status(404).json({error: `Question with id ${req.params.id} is not found!`})
    res.redirect(201, `/questions/${req.params.id}`); 
});

module.exports = router;
