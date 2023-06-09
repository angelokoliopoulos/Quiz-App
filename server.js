const path = require("path");
const express = require("express");
require("dotenv").config();
const port = process.env.PORT || 5000;
const connectDB = require("./config/db");
const cors = require("cors");

connectDB();

const app = express();

app.use(express.static(path.join(__dirname, "public")));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//cors
app.use(
  cors({
    origin: ["*"],
    methods: ["GET"],
    // allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send({ message: "Welcome to Questions Api" });
});

const questionsRouter = require("./routes/routing");
app.use("/api/questions", questionsRouter);

app.listen(port, () => console.log(`Server is listening on port ${port}`));
