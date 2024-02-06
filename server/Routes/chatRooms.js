const express=require('express');
const router=express.Router();

const{getAllRooms,getJoindedChatRooms,joinChatRoom}=require('../Controllers/chatRooms');


router.route('/search').get(getAllRooms);
router.route('/roomsJoined').get(getJoindedChatRooms).post(joinChatRoom);

module.exports=router;