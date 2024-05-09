const express = require("express");
const nunjuncks = require("nunjucks");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const connectDB = require("./db")


const PORT = process.env.PORT || 3000; 

const app = express();

nunjuncks.configure("./views", {
    express: app,
    autoescape: false
});

app.set("view engine", "njk");

// Cross Origin Resource Sharing
app.use(cors());

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

//serve static files
app.use("/", express.static(path.join(__dirname, "/public")));

// routes
app.get("/", async (req, res) => {
    res.render("index", {
        Title: "AskItNow Q&A Platform",
        index: true
    });
});
app.use("/answer", require("./routes/answerRouter"));
app.use("/question", require("./routes/questionsRouter"));
// app.use() for authentcation

app.use('*', (req, res) => {
    res.sendStatus(404)
});

// Connect to MongoDB
connectDB.connectDBLocal();

mongoose.connection.once("open", () => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});
