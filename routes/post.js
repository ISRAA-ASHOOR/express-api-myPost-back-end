const Post = require('../models/Post')
const { Router } = require('express')
const mongoose = require('mongoose')
const verifyToken = require('../middleware/verifyToken')
const postcontroller = require('../controllers/posts.controller')

const router = Router()

router.post('/', verifyToken , postcontroller.createPost)

module.exports = router