const express = require('express')
const router = express.Router()
const knex = require("../models/database")
const jwt = require('jsonwebtoken');

//User Controller
const { loadSignup, loadLogin } = require("../controllers/userController")

router.post("/signup", loadSignup, knex)

router.post("/login", loadLogin, knex)

module.exports = router;