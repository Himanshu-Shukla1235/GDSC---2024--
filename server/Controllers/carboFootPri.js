const { BadRequestError } = require("../Errors");
const carboFootPrint = require("../Models/carboFootprint");
const { StatusCodes } = require("http-status-codes");

const addFootPrints = async (req, res, next) => {
  console.log("request for carboFootprint reached");

  const carboF = await carboFootPrint.create({
    senders: {
      id: req.user.userId,
      name: req.user.username,
    },
    time: req.body.time,
    date: req.body.date,
    carbonFootprint: req.body.carbonFootprint,
  });

  res.status(StatusCodes.CREATED).json(carboF);
};

const findCFPbyDay = async (req, res) => {
  try {
    const onlyDay = req.query.day;
    const onlyMonth = req.query.month;
    const onlyYear = req.query.year;
    const id = req.user.userId;
    console.log(
      "Request for finding carbon footprint reache",
      onlyDay,
      onlyMonth,
      onlyYear
    );

    // Query the database to find data matching the provided day, month, and year
    const CFP = await carboFootPrint.find({
      "senders.id": id,
      "date.day": onlyDay,
      "date.month": onlyMonth,
      "date.year": onlyYear,
    });
    console.log(CFP);
    res.status(200).json(CFP);
  } catch (error) {
    console.error("Error finding carbon footprint:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const findCFPbywhole = async (req, res) => {
  try {
    const id = req.user.userId;
    console.log("Request for finding carbon footprintWhole reache");

    // Query the database to find data matching the provided day, month, and year
    const CFP = await carboFootPrint.find({
      "senders.id": id,
    });
    console.log("this WholeCfp",CFP);
    res.status(200).json(CFP);
  } catch (error) {
    console.error("Error finding carbon footprintWhole:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { addFootPrints, findCFPbyDay, findCFPbywhole };
