const {StatusCodes}=require('http-status-codes');
const mongoose=require('mongoose');
const {
    CustomAPIError,
    BadRequestError,
    UnauthenciatedError
} =require('../Errors')



const checking=async(req,res,next)=>{

    if(!req.body.name)
    {
        return next(new BadRequestError('Please provide name!!!'))
    }

    res.status(201).json({"task":"success"});

}



module.exports={checking};