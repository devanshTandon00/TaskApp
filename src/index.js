const express = require("express");
require("./db/mongoose");
const userRouter = require("./routers/userRouter");
const taskRouter = require("./routers/taskRouter");
const app = express();

const port = process.env.PORT || 3000;

// returns middleware that only parses json
app.use(express.json());

app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log("Server is up and running on port " + port);
});

const bycrpt = require("bycrptjs");

const myFunction = async () => {
  const pass = "Red@123";
  const hashed = await bycrpt.hashed(pass, 8);

  const isMatch = await bycrpt.compare(pass, hashed);
};

myFunction();
