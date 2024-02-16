const { mongo } = require("mongoose");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenciatedError } = require("../Errors");
const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const path = require("path");

const register = async (req, res, next) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res
    .status(StatusCodes.CREATED)
    .json({ user: { name: user.username, id: user._id }, token });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide username and password");
  }
  const user = await User.findOne({ email: email });
  if (!user) {
    throw new UnauthenciatedError("Invalid Credentials");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenciatedError("Invalid Credentials");
  }
  // compare password
  const token = user.createJWT();
  res
    .status(StatusCodes.OK)
    .json({ user: { name: user.username, id: user._id }, token });
};

const addAvatar = async (req, res, next) => {
  const userId = req.user.id;
  const imgData = req.body.avatar;

  const updatedUser = await User.findByIdAndUpdate(
    { _id: req.user.userId },
    { avatar: imgData },
    { new: true }
  );

  // ... rest of the logic to update the user and respond ...

  res.status(200).json(updatedUser);
};
const getUser=async(req,res,next)=>{
   const user = await User.find({ _id: req.user.userId });
   res.status(200).json(user);
}

module.exports = { login, register, addAvatar ,getUser};
