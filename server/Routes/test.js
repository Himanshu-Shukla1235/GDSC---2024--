const express=require('express');
const router=express.Router();

const {checking}=require('../Controllers/test');

router.route('/').get(checking);





module.exports=router;