const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: String,
  tasks: [
    {
      title: String,
      completed: Boolean,
    },
  ],
});

module.exports = mongoose.model("User", UserSchema);
