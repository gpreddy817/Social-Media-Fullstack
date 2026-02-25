const express = require("express")
const postRouter = express.Router()
const postcontroller = require("../controllers/post.controller")
const multer = require("multer")
const upload = multer({ Storage: multer.memoryStorage() })
const identifyuser = require("../middlewares/auth.middleware")

postRouter.post("/", upload.single("image") , identifyuser ,postcontroller.CreatePostController)

postRouter.get("/", identifyuser, postcontroller.getPostController)

postRouter.get("/details/:postId", identifyuser, postcontroller.getPostDetailsController)

postRouter.post("/like/:postId", identifyuser, postcontroller.likeUserController)

postRouter.post("/unlike/:postId", identifyuser, postcontroller.unLikeUserController)

postRouter.get("/feed", identifyuser, postcontroller.getFeedController)

module.exports = postRouter