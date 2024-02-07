const jwt=require('jsonwebtoken');
const {UnauthenciatedError}=require('../Errors/index')

const authorizationMiddleware=async(req,res,next)=>{
    
    const authHeader=req.headers.authorization;
    

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return next(new UnauthenciatedError('No token provided'))
    }
    const token=authHeader.split(' ')[1];
    // console.log(token)

    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        const {userId,username}=decoded;
        req.user={userId,username};

        // console.log(req.user);
        
    } catch (error) {
        return next(new UnauthenciatedError('No authorized to access this route'))
    }
    // console.log(req.headers.authorization)
    next();
}

module.exports=authorizationMiddleware;