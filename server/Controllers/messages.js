const messageModel=require('../Models/messages')
const mongoose=require('mongoose')
const chatRoomModel=require('../Models/chatRoom')
const BadRequestError=require('../Errors/BadRequest')
const {StatusCodes}=require('http-status-codes')

const createChatRoom=async(req,res,next)=>{

    const {name,members,aim,area,description}=req.body;
    if(!name || !members || !aim || !area || !description){
        next(new BadRequestError('please provide details!!'))
    }

    const room=await chatRoomModel.create({
        name:name,
        members:members,
        aim:aim,
        description:description,
        area:area,
    })

    res.status(StatusCodes.CREATED).json(room);

}




const addMessage=async(req,res,next)=>{
    const {to,message}=req.body;
    const from=req.user.userId;
    console.log(from);
    const data=await messageModel.create({
        message:{text:message},
        users:[from,to],
        sender:from,
    })

    if(data) return res.json({msg:"Message is added to the database"});
    return res.json({msg:"failed to add message"});
}

const getAllMessages=async(req,res,next)=>{
    // const {from}=req.query;
    var messages=await messageModel.find({}).sort({updatedAt:1});

    // messages=messages.map((msg)=>{
    //     return {
    //         formSelf:msg.sender.toString()==from,
    //         message:msg.message.text,
    //     }
    // })

    res.json(messages)
}


module.exports={
    addMessage,
    getAllMessages,
    createChatRoom,
}