const express = require('express');
const { likeDislikeblog, likes, dislikes } = require('../controllers/likeController');
const router = express.Router();
const knex = require("../models/database")
const {authenticateToken} = require('../auth/jwt');



router.post("/likedislikeblog", authenticateToken, likeDislikeblog, knex)

router.get("/likes", authenticateToken, likes, knex)

router.get("/dislikes", authenticateToken, dislikes, knex)


module.exports = router;