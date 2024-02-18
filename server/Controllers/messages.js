const messageModel = require("../Models/messages");
const mongoose = require("mongoose");
const chatRoomModel = require("../Models/chatRoom");
const BadRequestError = require("../Errors/BadRequest");
const { StatusCodes } = require("http-status-codes");

const createChatRoom = async (req, res, next) => {
  const { name, members, aim, area, description, avatar } = req.body;
  console.log(avatar);
  if (!name || !members || !aim || !area || !description) {
    next(new BadRequestError("please provide details!!"));
  }

  const updatedMembers = [...members, req.user.userId];

  const room = await chatRoomModel.create({
    name: name,
    members: updatedMembers,
    aim: aim,
    description: description,
    area: area,
    avatar: avatar,
  });

  res.status(StatusCodes.CREATED).json(room);
};

const addMessage = async (req, res, next) => {
  const { to, message, chatRoomID, time } = req.body;
  const { userId, username } = req.user;
  console.log(req.user);

  //checking if user presnt in the room
  const foundRoom = await chatRoomModel.findOne({
    _id: chatRoomID,
    members: { $elemMatch: { $eq: userId } },
  });

  if (!foundRoom) {
    next(new BadRequestError("first join the group!!"));
  }

  const data = await messageModel.create({
    message: { text: message },
    users: [userId, to],
    sender: {
      id: userId,
      name: username,
    },
    chatRoomID: chatRoomID,
    time: {
      day: time.day,
      month: time.month,
      hours: time.hours,
      minutes: time.minutes,
    },
  });

  if (data)
    return res.json({
      msg: "Message is added to the database",
      user: req.user.username,
    });
  return res.json({ msg: "failed to add message" });
};

const getAllMessages = async (req, res, next) => {
  const { chatRoomID } = req.query;
  console.log(req.query);
  const from = req.user.userId;

  const foundRoom = await chatRoomModel.findOne({
    _id: chatRoomID,
    members: { $elemMatch: { $eq: from } },
  });

  if (!foundRoom) {
    next(new BadRequestError("first join the group!!"));
  }
  var messages = await messageModel
    .find({ chatRoomID: chatRoomID })
    .sort({ updatedAt: 1 });

  res.json(messages);
};

module.exports = {
  addMessage,
  getAllMessages,
  createChatRoom,
};
