const mongoose = require("mongoose");

const UsersScheme = mongoose.Schema({
  username: String,
  score: Number,
  time: Number,
  difficulty: String,
});

module.exports = mongoose.model("users", UsersScheme);
