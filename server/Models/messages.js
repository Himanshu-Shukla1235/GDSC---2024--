const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    message: {
        text: {
            type: String,
            required: true,
        }
    },
    users: {
        type: Array,
        required: true,
    },
    sender: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true,
        },
        name: {
            type: String, // Assuming sender name is a string
            required: true,
        }
    },
    chatRoomID: {
        type: String
    },
    time:{
        day:{type:String},
      month:{type:String},
      hours:{type:String},
      minutes:{type:String},
    }
});

module.exports = mongoose.model("Messages", messageSchema);
