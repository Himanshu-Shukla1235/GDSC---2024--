const express=require('express');
const router=express.Router();

const{getAllRooms}=require('../Controllers/chatRooms');


router.route('/search').get(getAllRooms);

module.exports=router;