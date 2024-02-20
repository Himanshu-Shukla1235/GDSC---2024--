const express = require("express");
const router = express.Router();

const { updateData } = require("../Controllers/footprintdata");
const authorizationMiddleware = require("../Middlewares/auth");


router.route("/update").patch(authorizationMiddleware, updateData);


module.exports = router;
