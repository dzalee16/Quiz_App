const express = require("express");
const router = express.Router();
const Users = require("../models/Users");

//CRUD
//Create (post)
router.post("/", async (req, res) => {
  const user = new Users({
    username: req.body.username,
    score: req.body.score,
    time: req.body.time,
    difficulty: req.body.difficulty,
  });

  try {
    const userSave = await user.save();
    res.json(userSave);
  } catch (err) {
    res.json({ message: err });
  }
});

//Read (get)
router.get("/", async (req, res) => {
  try {
    const users = await Users.find();
    res.json(users);
  } catch (err) {
    res.json({ message: err });
  }
});

//Update (patch)

//Delete (delete)

module.exports = router;
