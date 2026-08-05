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
        res.status(500).json({ error: error.message });
    }
}

async function getAllPosts(req, res){
    try{
        const posts = await Post.find()
        console.log(posts)
        return res.status(200).json(posts);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
}

async function getPostById(req, res) {
    try {
        const post = await Post.findById(req.params.id)
        return res.json(post)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
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
        res.status(500).json({ error: error.message });
    }
}

async function deletePost(req, res) {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id)
        return res.json(deletePost)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
}

async function addComment(req, res){
    try{
        const post = await Post.findById(req.params.id);
        const createdComment = post.comments.create({
            text : req.body.text,
            author: req.user._id
        });

        post.comments.push(createdComment)
        await post.save()
        return res.status(201).json(post);
    } catch(error){
        console.log(error)
        res.status(500).json({ error: error.message });
    }
}

async function updateComment(req, res){
    try{
        const post = await Post.findById(req.params.id);
        const comment = post.comments.id(req.params.commentId);
        comment.text = req.body.text;
        await post.save();
        return res.status(201).json(post);
    } catch(error){
        console.log(error)
        res.status(500).json({ error: error.message });
    }
}

async function deleteComment(req, res){
    try{
        const post = await Post.findById(req.params.id);
        post.comments.remove({_id: req.params.commentId});
        await post.save();
        return res.json(post)
    } catch(error){
        console.log(error)
        res.status(500).json({ error: error.message });
    }
}


module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    addComment,
    updateComment,
    deleteComment
}