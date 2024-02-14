const express = require("express");
const router = express.Router();
const authorizationMiddleware = require("../Middlewares/auth");

const { addFootPrints, findCFPbyDay } = require("../Controllers/carboFootPri");

router
  .route("/addcarbonFootPrint")
  .post(authorizationMiddleware, addFootPrints);



  module.exports = router;