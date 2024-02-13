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

// const addAvatar = async (req, res, next) => {
//   try {
//     const userId = req.user.userId;

//     // Check if req.file is present and contains the path to the uploaded file
//     console.log(req.file);
//     if (!req.file || !req.file.path) {
//       return res.status(400).json({ error: "No file uploaded" });
//     }

//     // Read the image file
//     const p = path.join(__dirname, "..");
//     const pathh = path.join(p, req.file.path);
//     console.log("path is:", pathh);

//     const imgData = await fs.readFile(pathh);

//     // Create an object to store in the database
//     // const img = {
//     //   data: imgData,
//     //   contentType: req.file.mimetype,
//     // };

//     // Update the user with the new avatar
//     console.log(req.user.userId);
//     const updatedUser = await User.findByIdAndUpdate(
//       userId,
//       {
//         username: "aman2",
//       },
//       { new: true }
//     );

//     res.json(updatedUser);
//   } catch (error) {
//     console.error("Error updating user avatar:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };
const addAvatar = async (req, res, next) => {
  try {
    const userId = req.user.id;

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const p = path.join(__dirname, "..");
    const pathh = path.join(p, req.file.path);

    const imgData = await fs.promises.readFile(pathh);

    // Update the user with the new avatar
    console.log(req.user.userId);
    const updatedUser = await User.findByIdAndUpdate(
      { _id: req.user.userId },
      { avatar: imgData },
      { new: true }
    );


    // ... rest of the logic to update the user and respond ...

    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user avatar:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
};

module.exports = { login, register, addAvatar };
