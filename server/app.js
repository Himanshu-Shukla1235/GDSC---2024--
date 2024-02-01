require('dotenv').config();
require('express-async-errors');
const express = require("express");
const app = express();
const testRouter=require('./Routes/test');
const errorHandlerMiddleware=require('./Middlewares/errorHandlerMiddleware')
const notFound=require('./Middlewares/notFound')
const connectDB=require('./DB/connect');
//require routes
const authRouter=require('./Routes/auth');

//---------------------------------------------------middlewares--------------------------------->>>
app.use(express.json());



//routes

app.use('/api/v1/test',testRouter);
app.use('/api/v1/auth',authRouter);

//errors
app.use(notFound);
app.use(errorHandlerMiddleware);

//--------------------------------------------------app start function--------------------------->>>
const PORT = process.env.port || 5000;

const start=async()=>{
  try{
      await connectDB(process.env.mongoURI)
      app.listen(PORT,console.log(`server is listening on port ${PORT}...`))

  }catch (error)
  {
      console.log(error)
  }
}
start()