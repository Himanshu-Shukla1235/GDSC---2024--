const { mongo } = require("mongoose");
const {StatusCodes}=require('http-status-codes');
const {BadRequestError,UnauthenciatedError}=require('../Errors')
const User=require('../Models/User')
const jwt=require('jsonwebtoken')
const bcrypt=require('bcryptjs')


const register=async(req,res,next)=>{

    const user = await User.create({ ...req.body })
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({ user: { name: user.username }, token })
}

const login=async(req,res,next)=>{

  console.log('reached')


  const { email, password } = req.body

  if (!email || !password) {
    throw new BadRequestError('Please provide username and password')
  }
  const user = await User.findOne({email:email})
  if (!user) {
    throw new UnauthenciatedError('Invalid Credentials')
  }
  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new UnauthenciatedError('Invalid Credentials')
  }
  // compare password
  const token = user.createJWT()
  res.status(StatusCodes.OK).json({ user: { name: user.username }, token })




}

module.exports={login,register};
