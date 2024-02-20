const mongoose = require("mongoose");

const footPrintData = new mongoose.Schema({
    sender:{
        id:{
            type:String
        },
        name:{
            type:String
        }

    },
    data:{
        type:Array
        

    },
    total:{
        type:Number,
        default:0
    }

})
  

module.exports = mongoose.model("FootprintData", footPrintData);
