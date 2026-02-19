const postModel = require("../models/post.model")
const Imagekit = require("@imagekit/nodejs")
const { toFile } = require("@imagekit/nodejs")
const jwt = require("jsonwebtoken")
const likeModel = require("../models/like.model")


const imagekit = new Imagekit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})

async function CreatePostController(req, res) {

    const file = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), 'file'),
        fileName: "test",
        folder: "insta-clone"
    })

    const post = await postModel.create({
        caption: req.body.caption,
        imgUrl: file.url,
        user: req.user.id
    })

    res.status(201).json({
        message: "post created successfully",
        post
    })
    
}

async function getPostController(req, res) {

    

    const userId = req.user.id

    const posts = await postModel.find({
        user: userId
    })

    res.status(200).json({
        message: "posts fetched successfully"
    })


}

async function getPostDetailsController(req, res) {
    
    const userId = req.user.id
    const postid = req.params.postId

    const post = await postModel.findById(postid)
    
    if(!post){
        return res.status(404).json({
            message: "post not found"
        })
    }

    const isValidUser = post.user.toString() == userId

    if (!isValidUser) {
        return res.status(403).json({
            message: "forbidden content"
        })
    }

    return res.status(200).json({
        message: "Post fetched successfully",
        post
    })
}

async function likeUserController(req, res) {
    try {
        const userId = req.user.id
        const postId = req.params.postId

        // Check if the post exists
        const post = await postModel.findById(postId)
        if (!post) {
            return res.status(404).json({ message: "Post not found" })
        }

        // Atomically create like if it doesn't exist
        const like = await likeModel.findOneAndUpdate(
            { post: postId, user: userId },       // filter
            { post: postId, user: userId },       // update
            { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true }
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


module.exports = {
    CreatePostController,
    getPostController,
    getPostDetailsController,
    likeUserController
}