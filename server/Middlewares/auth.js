const jwt=require('jsonwebtoken');
const {unauthenciatedError}=require('../errors/index')

const authorizationMiddleware=async(req,res,next)=>{
    
    const authHeader=req.headers.authorization;
    console.log(authHeader)

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return next(new unauthenciatedError('No token provided'))
    }
    const token=authHeader.split(' ')[1];

    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        const {id,username}=decoded;
        req.user={id,username};
        // console.log(req.user);
        next();
    } catch (error) {
        return next(new unauthenciatedError('No authorized to access this route'))
    }
    console.log(req.headers.authorization)
    next();
}

module.exports=authorizationMiddleware;