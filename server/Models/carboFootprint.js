const mongoose = require("mongoose");

const carboFootprints = new mongoose.Schema({
  senders: {
    id: {
      type: String,
    },name:{
        type:String,
    }
  },
  time: {
    type: String,
  },
  date: {
    day: {
      type: Number,
    },
    month: {
      type: Number,
    },
    year: {
      type: Number,
    },
  },
  carbonFootprint: {
    type: Number,
  },
});


module.exports=mongoose.model("CorbonFootprints",carboFootprints)