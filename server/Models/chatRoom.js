const mongoose=require('mongoose');

const chatRoomSchema=new mongoose.Schema({
    name:{
        type:String,
    },
    members:{
        type:Array
    }
})


module.exports=mongoose.model("chatRoom",chatRoomSchema)