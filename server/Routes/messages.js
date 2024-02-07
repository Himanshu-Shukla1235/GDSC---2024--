const express=require('express')
const router=express.Router();
const authorizationMiddleware=require('../Middlewares/auth')

const {addMessage,
    getAllMessages,
    createChatRoom,
}=require('../Controllers/messages');

router.route('/add').post(authorizationMiddleware,addMessage);
router.route('/allMessages').get(authorizationMiddleware,getAllMessages);
router.route('/createRoom').post(authorizationMiddleware,createChatRoom);

module.exports=router;