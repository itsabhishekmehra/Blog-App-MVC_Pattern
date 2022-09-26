const knex = require("../models/database")
const jwt = require('jsonwebtoken');


const likeDislikeblog = (req, res) => {
    let reqtoken = req.cookies.key
    verifyToken = jwt.verify(reqtoken, "Secret Key")
    const payloadlikedislike = req.body;
    payloadlikedislike.user_id = verifyToken.id
    const blogId = req.body.blog_id;
    knex('blogs').where({ id: blogId }).then((blogsdata) => {
        console.log(blogsdata);
        if (blogsdata.length == 0) {
            res.send("Blog doesen't exist.")
        }
        else if (blogsdata.length === 1) {
            knex('likedislike').where({ blog_id: blogId, user_id: payloadlikedislike.user_id }).update({
                "likedislike": req.body.likedislike
            }).then((updatedata) => {
                if (!updatedata) {
                    knex('likedislike').insert(payloadlikedislike).then((Data) => {
                        payloadlikedislike['id'] = Data[0]
                        res.send({ 'status': 'success', 'data': payloadlikedislike })
                    }).catch((err) => {
                        res.send({ 'status': 'Error', 'message': err.sqlMessage })
                    })
                } else {
                    console.log(updatedata, "LikeDislike Successfull...");
                    res.send("LikeDislike Updated")
                }
            }).catch((err) => {
                console.log(err, "Something went wrong");
            })
        }
    }).catch((err) => {
        res.send({ 'status': 'Error', 'message': err.sqlMessage })
    })
}

const likes = (req, res) => {
    let reqtoken = req.cookies.key
    verifyToken = jwt.verify(reqtoken, "Secret Key")
    const userId = verifyToken.id;
    console.log(userId, "userId..");
    knex('likedislike')
        .where('likedislike', 1)
        .andWhere('user_id', userId)
        .then((data) => {
            console.log(data.length, "-----total number of likes");
            res.send(data)
        }).catch((err) => {
            console.log(err, "Error in likes\n");
        })
}


const dislikes = (req, res) => {
    let reqtoken = req.cookies.key
    verifyToken = jwt.verify(reqtoken, "Secret Key")
    const userId = verifyToken.id;
    console.log(userId, "userId..");
    knex('likedislike')
        .where('likedislike', 0)
        .andWhere('user_id', userId)
        .then((data) => {
            console.log(data.length, "-----total number of dislikes");
            res.send(data)
        }).catch((err) => {
            console.log(err, "Error in dislikes\n");
        })
}

module.exports = {
    likeDislikeblog,
    likes,
    dislikes
}