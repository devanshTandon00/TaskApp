const jwt = require("jsonwebtoken");
const user = require("../models/users");

//check if user is authenticated
const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "keepLearning");
  } catch (e) {
    res.status(401);
  }
};

module.exports = auth;
