const postModel = require("../models/post.model")
const Imagekit = require("@imagekit/nodejs")
const { toFile } = require("@imagekit/nodejs")
const likeModel = require("../models/like.model")

const imagekit = new Imagekit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function CreatePostController(req, res) {
  try {
    const file = await imagekit.files.upload({
      file: await toFile(Buffer.from(req.file.buffer), "file"),
      fileName: "post-image",
      folder: "insta-clone"
    })

    const post = await postModel.create({
      caption: req.body.caption,
      imgUrl: file.url,
      user: req.user.id
    })

    return res.status(201).json({
      message: "Post created successfully",
      post
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Internal server error" })
  }
}

async function getPostController(req, res) {
  try {
    const userId = req.user.id

    const posts = await postModel.find({ user: userId })
      .sort({ createdAt: -1 })

    return res.status(200).json({
      message: "Posts fetched successfully",
      posts
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Internal server error" })
  }
}

async function getPostDetailsController(req, res) {
  try {
    const userId = req.user.id
    const postId = req.params.postId

    const post = await postModel.findById(postId)

    if (!post) {
      return res.status(404).json({
        message: "Post not found"
      })
    }

    if (post.user.toString() !== userId) {
      return res.status(403).json({
        message: "Forbidden content"
      })
    }

    return res.status(200).json({
      message: "Post fetched successfully",
      post
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Internal server error" })
  }
}

async function likeUserController(req, res) {
  try {
    const userId = req.user.id
    const postId = req.params.postId

    const post = await postModel.findById(postId)
    if (!post) {
      return res.status(404).json({ message: "Post not found" })
    }

    const like = await likeModel.findOneAndUpdate(
      { post: postId, user: userId },
      { post: postId, user: userId },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    )

    return res.status(200).json({
      message: "Post liked successfully",
      like
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Internal server error" })
  }
}

async function unLikeUserController(req, res) {
    try {
      const userId = req.user.id
      const postId = req.params.postId
  
      // Check if post exists
      const post = await postModel.findById(postId)
      if (!post) {
        return res.status(404).json({ message: "Post not found" })
      }
  
      // Delete the like
      const like = await likeModel.findOneAndDelete({ post: postId, user: userId })
  
      // Return clean response
      return res.status(200).json({
        message: like ? "Post unliked successfully" : "Like not found",
        likeId: like?._id || null
      })
  
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: "Internal server error" })
    }
  }
async function getFeedController(req, res) {
  try {
    const posts = await postModel
      .find()
      .populate("user", "username bio profileImage")
      .sort({ createdAt: -1 })
      .lean()

    return res.status(200).json({
      message: "Feed fetched successfully",
      posts
    })

  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: "Internal server error" })
  }
}

module.exports = {
  CreatePostController,
  getPostController,
  getPostDetailsController,
  likeUserController,
  getFeedController,
  unLikeUserController
}