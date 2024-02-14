const { BadRequestError } = require('../Errors');
const carboFootPrint=require('../Models/carboFootprint');
const {StatusCodes}=require('http-status-codes');




const addFootPrints=async(req,res,next)=>{
console.log("request for carboFootprint reached")

const carboF=await carboFootPrint.create({
    senders: {
        id: req.user.userId,
        name:req.user.username
      },
      time:req.body.time,
      date:req.body.date,
      carbonFootprint: req.body.carbonFootPrint,
})

res.status(StatusCodes.CREATED).json(carboF);
}

const findCFPbyDay= async()=>{

    const CFP= await carboFootPrint.find({day:req.body.day,month:req.body.month,year:req.body.year})

    res.status(200).json(CFP)

}



module.exports={addFootPrints,findCFPbyDay} ;