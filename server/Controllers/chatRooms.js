const {BadRequestError}=require('../Errors')

const ChatRoom=require('../Models/chatRoom');

const getAllRooms=async (req,res)=>{
    const {name}=req.params;

    const queryObject={}

   
    if(location){
        queryObject.location={$regex:location,$options:'i'};  //i is for case insensetive
    }
    if(name){
        queryObject.name={$regex:name,$options:'i'};
    }
    console.log(queryObject)

    let result= ChatRoom.find(queryObject);


   
        result=result.sort('createdAt');
   
    
    const page=Number(req.query.page)||1;
    const limit=Number(req.query.limit)||10;
    const skip=(page-1)*limit;

    result=result.skip(skip).limit(limit)
    const rooms=await result
    res.status(200).json({rooms,size:rooms.length} )
} 


///get all joined chatrooms
const getJoindedChatRooms=async(req,res,next)=>{

    const memberIdToFind=req.headers.userid;

    if(!memberIdToFind){
        next(new BadRequestError('login again then try!!'));
    }
    console.log(req.headers.userid);
    let result= await ChatRoom.find({ members: { $elemMatch: { $eq: memberIdToFind } } })
   
    console.log(result);

    res.status(200).json(result);
}

//joining the chat room
const joinChatRoom = async (req, res, next) => {
   
        const memberIdToAdd = req.headers.userid;
        const chatRoomId = req.query.chatRoomId; // Assuming you have the chat room ID in the request params
        
        console.log(req.query.chatRoomId)

        console.log("Adding member ID", memberIdToAdd, "to chat room ID", chatRoomId);

        // Assuming ChatRoom is your Mongoose model
        let result = await ChatRoom.findByIdAndUpdate(
            chatRoomId,
            { $addToSet: { members: memberIdToAdd } }, // $addToSet ensures uniqueness
            { new: true } // Return the modified document
        );

        if (!result) {
            return res.status(404).json({ error: "Chat room not found" });
        }

        console.log("Updated chat room:", result);

        res.status(200).json(result);
   
};


module.exports={getAllRooms,getJoindedChatRooms,joinChatRoom}