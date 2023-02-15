const User = require("../models/user");

const getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).send(error.messages);
  }
};

const createUser = async (req, res) => {
  const { first_name, username, email, password } = req.body;

  try {
    const user = await User.create({ first_name, username, email, password });
    res.json(user);
  } catch (error) {
    res.status(500).send(error.messages);
  }
};

module.exports = {
  getUsers,
  createUser,
};
