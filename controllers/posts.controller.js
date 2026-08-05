const express = require("express");
const Post = require("../models/Post.js");
const router = express.Router();

async function createPost(req, res) {
    try {
        const {
            title,
            text,
            img,
            author
        } = req.body

        const createdPost = await Post.create({
            title,
            text,
            img,
            author: req.user._id
        })

        return res.status(201).json(createdPost)
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({ message: error.message })
        }
        console.log(error)
        res.status(500).json({ message: error.message })
    }
}




module.exports = {
    createPost,
}