const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/userRouter");
const taskRouter = require("./routers/taskRouter");
const app = express();

const port = process.env.PORT || 3000;

// app.use((req, res, next) => {
//   if (req.method != "GET") next();
// });

app.use((req, res, next) => {
  if (req.method) res.status(503).send("In maintainance mode!");
});

// returns middleware that only parses json
app.use(express.json());

app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("Server is up and running on port " + port);
});

const jwt = require("jsonwebtoken");

// use sign and verify methods to create authentication tokens and make sure user is authenticated correctly
const myFunction = async () => {
  const token = jwt.sign({ _id: "abcd0" }, "keepLearning", {
    expiresIn: "7 days",
  });
  console.log(token);

  const data = jwt.verify(token, "keepLearning");
  console.log(data);
};

myFunction();
