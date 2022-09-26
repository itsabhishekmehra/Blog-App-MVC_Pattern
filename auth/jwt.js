const jwt = require('jsonwebtoken');
const { LIMIT_FUNCTION_ARG } = require('sqlite3');


function generateAccessToken(userInfo) {
    // console.log(userInfo, "Hi user Info");
    // return jwt.sign(username, "Secret Key");
    const { id, name, email } = userInfo;
    return jwt.sign({ id, email }, "Secret Key", { expiresIn: '2h' });
}

function authenticateToken(req, res, next) {
    // Gather the jwt access token from the request header
    var authHeader = req.query.token || req.body.token || req.headers.cookie;
    console.log(authHeader, "authHeader...");
    var token = authHeader && authHeader.split(' ')[0]
    console.log(token, "splited token....");
    if (token == undefined) {
        res.send({ "error": "token not found!" })
        next()
    }
    // const payload = req.body;
    // payload.user_id = veritoken.id
    try {
        if (token.startsWith('key=')) {
            token = token.slice(4, token.length);
            console.log(token, "token...inside if.");
            const decoded = jwt.verify(token, "Secret Key");
            console.log(decoded, "decoded...\n");
            req.decode = decoded;
            next(); // pass the execution off to whatever request the client intended
        }

    } catch (error) {
        console.log(error, "This is token error, please check it");
        req.Error = error.message
        next()
    }
}

module.exports = { generateAccessToken, authenticateToken };