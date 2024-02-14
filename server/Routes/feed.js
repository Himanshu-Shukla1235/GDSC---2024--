const express = require("express");
const router = express.Router();

const {
  createFeed,
  addComment,
  getFeedAreaWise,
  addLike,
} = require("../Controllers/feed");
const authorizationMiddleware = require("../Middlewares/auth");

router.route("/createFeed").post(authorizationMiddleware, createFeed);
router.route("/addComment").patch(authorizationMiddleware, addComment);
router.route("/like").patch(authorizationMiddleware, addLike);
router.route("/getfeed").get(authorizationMiddleware, getFeedAreaWise);

module.exports = router;
