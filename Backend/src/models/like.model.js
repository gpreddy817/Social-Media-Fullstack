const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts",
        required: [true, "post id is required to like"]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [true, "user id is required to create like"]
    }
}, {
    timestamps: true
})

likeSchema.index({ post: 1, user: 1 }, { unique: true })

const likeModel = mongoose.model("likes", likeSchema)

module.exports = likeModel
