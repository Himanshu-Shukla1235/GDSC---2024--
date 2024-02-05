

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


module.exports={getAllRooms}