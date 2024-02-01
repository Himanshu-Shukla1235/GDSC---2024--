const mongoose = require("mongoose");


const messageSchema=new mongoose.Schema({
    message:{
        text:{
            type:String,
            required:true,
        }
    },
    users: {
        type: Array,
        required: true,
    },    
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users",
        required:true,
    },

})

module.exports=mongoose.model("Messages",messageSchema);