const express=require('express')
const router=express.Router();

const {addMessage,
    getAllMessages,
    createChatRoom,
}=require('../Controllers/messages');

router.route('/add').post(addMessage);
router.route('/allMessages').get(getAllMessages);
router.route('/createRoom').post(createChatRoom);

module.exports=router;