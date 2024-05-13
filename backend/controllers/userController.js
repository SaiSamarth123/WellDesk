const User = require("../models/User");

exports.addTask = async (req, res) => {
  const { email, title } = req.body;
  let user = await User.findOne({ email });
  if (!user) {
    user = new User({ email, tasks: [] });
  }
  user.tasks.push({ title, completed: false });
  await user.save();
  res.send(user);
};

exports.getTasks = async (req, res) => {
  const { email } = req.query;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).send({ message: "User not found" });
  }
  res.send(user.tasks);
};
