const knex = require("../models/database")
const jwt = require('jsonwebtoken');


const loadCreateblog = (req, res) => {
    let reqtoken = req.cookies.key
    verifyToken = jwt.verify(reqtoken, "Secret Key")
    const payload = req.body;
    payload.user_id = verifyToken.id

    knex('blogs').insert(payload).then((Data) => {
        payload['id'] = Data[0]
        res.send({ 'status': 'success', 'data': payload })
    }).catch((err) => {
        console.log(err, "Error");
        res.send({ 'status': "error", 'message': err.sqlMessage })
    })
}

const getBlogbyId = (req, res) => {
    knex('blogs')
        .where({ id: parseInt(req.params.id) })
        .then((data) => {
            if (data.length > 0) {
                res.send({ 'data': data, 'message': `${req.params.id} Blog Got successfully!` })
            } else {
                res.send({ 'message': `${req.params.id} Blog not found!`, 'errorCode': 404 })
            }
        }).catch((err) => {
            console.log(err, "Some Error Came in getting Blog.");
            res.send(err)
        })
}

const getAllblogs = (req, res) => {
    knex('blogs').then((data) => {
        res.json(data)
    })
        .catch((err) => {
            console.log(err, "Blogs data error.");
        });
}

const updateBlogbyId = (req, res) => {
    knex('blogs')
        .where({ id: req.params.id })
        .update({
            "title": req.body.title,
            "description": req.body.description,
        }).then((updatedata) => {
            if (!updatedata) {
                console.log(updatedata, "id not exists");
                res.send({ 'message': 'invalid id' })
            } else {
                console.log(updatedata, "Updated Successfull...");
                res.send("Blog Updated")

            }
        }).catch((err) => {
            console.log(err, "Something went wrong");
        })
}

const deleteBlogbyId = (req, res) => {
    knex('blogs')
        .where({ id: parseInt(req.params.id) })
        .del()
        .then((delblog) => {
            if (delblog) {
                res.send({ 'data': delblog, 'message': `${req.params.id} Blog deleted successfully!` })
            } else {
                res.send({ 'message': `${req.params.id} Blog not found!`, 'errorCode': 404 })
            }
        }).catch((err) => {
            console.log(err, "Some Error Came...");
            res.send(err)
        })
}

module.exports = {
    loadCreateblog,
    getBlogbyId,
    getAllblogs,
    updateBlogbyId,
    deleteBlogbyId
}