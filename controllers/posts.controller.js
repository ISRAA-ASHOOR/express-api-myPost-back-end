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
        console.log(error)
    }
}

async function getAllPosts(req, res){
    try{
        const posts = await Post.find()
        console.log(posts)
        return res.status(200).json(posts);
    } catch (error) {
        console.log(error)
    }
}

async function getPostById(req, res) {
    try {
        const post = await Post.findById(req.params.id)
        return res.json(post)
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    createPost,
    getAllPosts,
    getPostById
}