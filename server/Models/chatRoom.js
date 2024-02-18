const mongoose = require("mongoose");

const chatRoomSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  aim: {
    type: String,
  },
  area: {
    type: String,
  },
  members: {
    type: Array,
  },
  description: {
    type: String,
  },
  avatar: {
    type: String,
  },
});

module.exports = mongoose.model("chatRoom", chatRoomSchema);
