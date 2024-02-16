const mongoose = require("mongoose");
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "must provide name"],
    trim: true,
    maxlength: [20, "name can not be more than 20 characters"],
  },
  avatar: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "must provide password"],
    maxlength: [20, "password can not be more than 20 characters"],
    minlength: [6, "password must be more than 6 characters"],
  },
  location: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Optional, ensures unique email addresses in the collection
    lowercase: true, // Optional, converts email to lowercase before saving
    trim: true, // Optional, removes leading and trailing whitespaces
    validate: {
      validator: function (value) {
        return emailRegex.test(value);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
});

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, username: this.username }, // Corrected to use 'username' instead of 'name'
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};

// UserSchema.methods.comparePassword = async function (canditatePassword) {
//   const isMatch = await bcrypt.compare(canditatePassword, this.password)
//   return isMatch
// }
UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("User", UserSchema);

module.exports = mongoose.model("User", UserSchema);
