const express = require('express');
const { loadCreateblog, getBlogbyId, getAllblogs, updateBlogbyId, deleteBlogbyId } = require('../controllers/blogController');
const router = express.Router();
const knex = require("../models/database")
const {authenticateToken} = require('../auth/jwt');


router.post("/createblog", authenticateToken, loadCreateblog, knex)

router.get('/getblog/:id', authenticateToken, getBlogbyId, knex)

router.get('/getallblogs', authenticateToken, getAllblogs, knex)

router.put('/updateblog/:id', authenticateToken, updateBlogbyId, knex)

router.delete('/deleteblog/:id', authenticateToken, deleteBlogbyId, knex)

module.exports = router;