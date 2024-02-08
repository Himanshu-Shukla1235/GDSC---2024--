const {BadRequestError}=require('../Errors')

const ChatRoom=require('../Models/chatRoom');

const getAllRooms=async (req,res)=>{
    const {name}=req.query;

    const queryObject={}

   
    // if(location){
    //     queryObject.location={$regex:location,$options:'i'};  //i is for case insensetive
    // }
    if(name){
        queryObject.name={$regex:name,$options:'i'};
    }
    

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

    const memberIdToFind=req.user.userId;
    // console.log(req.user)

    if(!memberIdToFind){
        next(new BadRequestError('login again then try!!'));
    }
    
    let result= await ChatRoom.find({ members: { $elemMatch: { $eq: memberIdToFind } } })
   
    // console.log('result is:',result);
    const user=req.user;

    res.status(200).json({result,user});
}

//joining the chat room
const joinChatRoom = async (req, res, next) => {
   
        const memberIdToAdd = req.user.userId;
        const chatRoomId = req.body.params.chatRoomID; // Assuming you have the chat room ID in the request params

        
        console.log(req.body.params.chatRoomID)

        // console.log("Adding member ID", memberIdToAdd, "to chat room ID", chatRoomId);

        // Assuming ChatRoom is your Mongoose model
        let result = await ChatRoom.findByIdAndUpdate(
            chatRoomId,
            { $addToSet: { members: memberIdToAdd } }, // $addToSet ensures uniqueness
            { new: true } // Return the modified document
        );

        if (!result) {
            return res.status(404).json({ error: "Chat room not found" });
        }

        // console.log("Updated chat room:", result);

        res.status(200).json(result);
   
};


module.exports={getAllRooms,getJoindedChatRooms,joinChatRoom}