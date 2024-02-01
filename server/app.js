require('dotenv').config();
require('express-async-errors');
const express = require("express");
const app = express();
const testRouter=require('./Routes/test');
const errorHandlerMiddleware=require('./Middlewares/errorHandlerMiddleware')
const notFound=require('./Middlewares/notFound')
//---------------------------------------------------middlewares--------------------------------->>>
app.use(express.json());



//routes

app.use('/api/v1/test',testRouter);

//errors
app.use(notFound);
app.use(errorHandlerMiddleware);

//--------------------------------------------------app start function--------------------------->>>
const PORT = process.env.port || 9000;

const start=async()=>{
  try {
    app.listen(PORT,()=>{
      console.log(`app is listening on port ${PORT}`)
    })
  } catch (error) {
    console.log(error)
  }

}
start()