const mongoose = require("mongoose");

const feed = new mongoose.Schema({
  sender: {
    name: {
      type: String,
    },
    id: {
      type: String,
    },
  },
  description: {
    type: String,
    required: false,
  },
  image: {
    type: String,
  },
  time: {
    date: {
      type: String,
      required: true,
    },
    clock: {
      type: String,
      required: true,
    },
  },
  location: {
    type: String,
  },
  Comments: {
    type: Array,
  },
  likes: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Feed", feed);
