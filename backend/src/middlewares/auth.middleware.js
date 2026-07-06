const redis = require('../config/catche')
const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')

async function authUser(req, res, next){
    const token = req.cookies.token

    if(!token){
        return res.status(401).json({
            message:"token not provided"
        })
    }

    const isTokenBlacklisted = await redis.get(token)

    if(isTokenBlacklisted){
        return res.status(401).json({
            message:"Invalid Token"
        })
    }

    const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET,
    )

    req.user = decoded
    req.userToken = token

    next()
}

module.exports = {authUser} 