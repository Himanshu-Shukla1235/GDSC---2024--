const express=require('express');
const router=express.Router();

const{login,register,addAvatar}=require('../Controllers/auth');
const authorizationMiddleware=require('../Middlewares/auth')
var multer = require('multer');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });


 

router.route('/login').post(login);
router.route('/register').post(register);
router.route('/upload').post(authorizationMiddleware,upload.single('image'),addAvatar)
module.exports=router;