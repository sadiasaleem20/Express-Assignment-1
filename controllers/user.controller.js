const User = require("../models/usermodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const validateUser = require("../validators/user.validator");

exports.register = async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details);

  const user = new User(req.body);
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(req.body.password, salt);
  await user.save();

  const token = user.generateAuthToken();
  res
    .header("x-auth-token", token)
    .send({ message: "User created successfully" });
};

exports.login = async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details);

  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(401).send({ message: "Invalid email or password" });

  const validPassword = await user.comparePassword(req.body.password);
  if (!validPassword)
    return res.status(401).send({ message: "Invalid email or password" });

  const token = user.generateAuthToken();
  res.header("x-auth-token", token).send({ message: "Logged in successfully" });
};
