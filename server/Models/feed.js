const mongoose = require("mongoose");

const feed = new mongoose.Schema({
  sender: {
    name: {
      type: String,
    },
    id: {
      type: String,
    },
    avatar: {
      type: String,
    },
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  time: {
    date: {
      type: String,
    },
    clock: {
      type: String,
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
