const express = require("express");
const router = express.Router();
const authorizationMiddleware = require("../Middlewares/auth");

const { addFootPrints, findCFPbyDay } = require("../Controllers/carboFootPri");

router
  .route("/addcarbonFootPrint")
  .post(authorizationMiddleware, addFootPrints);
router.route("/getCFPbyday").get(authorizationMiddleware, findCFPbyDay);

module.exports = router;
