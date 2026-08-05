const Post = require('../models/Post')
const { Router } = require('express')
const mongoose = require('mongoose')
const verifyToken = require('../middleware/verifyToken')
const postController = require('../controllers/posts.controller')

const router = Router()

router.get('/', postController.getAllPosts)
router.post('/', verifyToken , postController.createPost)
router.get('/:id', verifyToken , postController.getPostById)
router.put('/:id', verifyToken , postController.updatePost)

module.exports = router