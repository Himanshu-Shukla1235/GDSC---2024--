const express=require('express');
const router=express.Router();
const authorizationMiddleware=require('../Middlewares/auth')

const{getAllRooms,getJoindedChatRooms,joinChatRoom}=require('../Controllers/chatRooms');


router.route('/search').get(authorizationMiddleware,getAllRooms);
router.route('/roomsJoined').get(authorizationMiddleware,getJoindedChatRooms).post(authorizationMiddleware,joinChatRoom);

module.exports=router;