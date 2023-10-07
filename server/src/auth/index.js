const jwt = require('jsonwebtoken')
const secretKey = 'veconomy'

async function login(email) {
    if (true) {
        const token = jwt.sign({ email }, secretKey)
        return token
    }

    return null
}

async function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(' ')[1];
        req.token = bearerToken;
        next()
    } else {
        res.sendStatus(403)
    }
}

async function getJWTData(token) {

}


