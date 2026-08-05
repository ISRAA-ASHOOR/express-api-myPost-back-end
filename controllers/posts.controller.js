const express = require("express");
const Post = require("../models/Post.js");
const router = express.Router();

async function createPost(req, res) {
    try {
        const {
            title,
            text,
            img
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

async function updatePost(req, res) {
    try {
        const {
            title,
            text,
            img
        } = req.body

        const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
            title,
            text,
            img
        }, { new: true })


        return res.json(updatedPost)
    } catch (error) {
        console.log(error)
    }
}

async function deletePost(req, res) {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id)
        return res.json(deletePost)
    } catch (error) {
        console.log(error)
    }
}

async function addComment(req, res){
    try{
        const post = await Post.findById(req.params.id);
        post.comments.push(req.body);
        await post.save();
        const newComment = post.comments[post.comments.length - 1];

        newComment._doc.author = req.user;

        res.status(201).json(newComment);
    } catch(error){
        console.log(error)
    }
}


module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    addComment
}