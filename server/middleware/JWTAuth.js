const jwt = require('jsonwebtoken')
const secret = 'mysecret'

const JWTAuth = function(req, res, next) {
    const token = req.cookies.token

    if(!token) {
        res.status(401).send('unauthorized: no token provided')
    }else{
        jwt.verify(token, secret, (err, decoded)=>{
            if(err){
                res.status(401).send('unauthorized. invalid token')
            }else{
                req.email = decoded.email
                next()
            }
        })
    }
}

module.exports = JWTAuth

