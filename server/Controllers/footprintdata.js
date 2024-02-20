const { mongo } = require("mongoose");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenciatedError } = require("../Errors");
const FootprintData = require("../Models/footPrintdata");

const updateData = async (req, res, next) => {
  try {
    const senderId = req.user.userId;
    const newData = req.body; // Assuming req.body is an object

    // Find the data with the specified senderId
    let existingData = await FootprintData.findOne({ "sender.id": senderId });

    if (!existingData) {
      // If the data doesn't exist, create a new one
      existingData = new FootprintData({
        sender: {
          id: senderId,
          name: req.user.username,
        },
        data: [],
        total: 0,
      });
    }

    // Update the data array by pushing the entire newData object
    if (newData.time) {
      newData.time.date = new Date().getDate();
      newData.time.month = new Date().getMonth();
      newData.time.year = new Date().getFullYear();
      existingData.data.push(newData);

      // Save the updated document
      existingData = await existingData.save();
    }

    // Respond with the updated data
    res.status(200).json(existingData);
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { updateData };
