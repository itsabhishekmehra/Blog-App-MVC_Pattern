const express = require("express");
const app = express();
const knex = require("../models/database")
const jwt = require('jsonwebtoken');
const { generateAccessToken } = require('../auth/jwt');

const loadSignup = (req, res) => {
    const bodyData = req.body;
    knex('users').insert(bodyData).then((Data) => {
        bodyData['id'] = Data[0]
        res.send({ 'status': 'success', 'data': bodyData })
    }).catch((err) => {
        console.log(err, "Error Coming");
        res.send({ 'status': "error", 'message': err.sqlMessage })
    });
}


const loadLogin = (req, res) => {
    knex('users')
        .where({ email: req.body.email })
        .then((datauser) => {
            if (datauser.length == 0) {
                res.send("Invalid User")
            }
            else if (datauser[0].password == req.body.password) {
                let tokenData = { id: datauser[0].id, name: datauser[0].name, email: datauser[0].email }
                const token = generateAccessToken(tokenData);
                res.cookie("key", token);
                res.send({ "token": token });
            }
            else {
                res.send("Password is wrong")
            }
        }).catch((err) => {
            console.log(err,);
            res.send(err, "email and Password is invalid.")
        })
}

module.exports = {
    loadSignup,
    loadLogin,
    generateAccessToken,
    // authenticateToken
}