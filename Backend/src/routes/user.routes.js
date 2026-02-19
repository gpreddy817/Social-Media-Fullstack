const express = require('express');
const UserController = require("../controllers/user.controller")
const identifyuser = require("../middlewares/auth.middleware")

const userRouter = express.Router();

/*
 *@route api/user/follow/:userid
 *desc: follow a user
 */ 
userRouter.post("/follow/:username", identifyuser, UserController.followUserController)

/*
 *@route api/user/unfollow/:userid
 *desc: unfollow a user
 */ 
userRouter.post("/unfollow/:username", identifyuser, UserController.unfollowUserController)

module.exports = userRouter;