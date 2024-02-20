const express = require("express");
const router = express.Router();
const authorizationMiddleware = require("../Middlewares/auth");

const { addFootPrints, findCFPbyDay ,findCFPbywhole} = require("../Controllers/carboFootPri");

router
  .route("/addcarbonFootPrint")
  .post(authorizationMiddleware, addFootPrints);
router.route("/getCFPbyday").get(authorizationMiddleware, findCFPbyDay);
router.route("/getCFPwhole").get(authorizationMiddleware,findCFPbywhole);

module.exports = router;
