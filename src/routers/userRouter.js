const express = require("express");
const router = express.Router();
const User = require("../models/users");

router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.getAuthToken();

    res.send({ user, token });
  } catch (e) {
    res.status(400).send();
  }
});

// two option of handling find
// 1. use promise .then() .catch() structure
// 2. use callback functions
router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (e) {
    res.status(500).send();
  }

  // User.find({}).then((users) => {
  //     res.send(users)
  // }).catch((error) => {
  //     res.status(500).send()
  // })

  // User.find({}, (result, error) => {
  //     if(error)
  //        res.send(users)
  //     else
  //         console.log(result)
  // })
});

// we use if condition since mongoDB returns an empty query result as a sucess as well
router.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send();
    res.send(user);
  } catch (e) {
    res.status(500).send;
  }
});

router.patch("/users/:id", async (req, res) => {
  // returns an array of elements of req.body
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValid = updates.every((update) => allowedUpdates.includes(update));

  if (!isValid) {
    return res.status(400).send({
      error: "Invalid Updates!",
    });
  }

  // check if there is no user since mongoDB is gonna consider it as a sucess so we need to handle that
  try {
    // Although this implementation is not wrong, it skips over the middleware we need to activate to
    // hash the user passwords.
    // const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})

    const user = await User.findById(req.params.id);
    updates.forEach((update) => {
      user[update] = req.body[update];
    });

    await user.save();

    if (!user) {
      return res.status(404).send();
    }

    // update old user and send modified user
    res.send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) return res.status(404).send();

    res.send(task);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
