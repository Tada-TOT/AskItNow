const express = require("express");
const answerController = require("../controllers/answerController");

const router = express.Router();
router.use(express.json());

router.get("/:answerId", async (req,res) => {
    const answer = await answerController.updateAnswer(req.params.answerId, req.query.method, req.query.questionId);
    if (!answer) res.status(404).json({error: `Answer with id ${req.params.id} is not found!`})    
    res.redirect(201, `/questions/${req.query.questionId}`);
});

module.exports = router;
