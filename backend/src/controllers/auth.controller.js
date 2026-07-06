const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')
const redis = require('../config/catche') 

async function registerUser(req,res){

    const {userName, email, password} = req.body

    const isUserExist = await userModel.findOne({
        $or:[
            {userName:userName},
            {email:email}
        ]
    })

    if(isUserExist){
        return res.status(400).json({
            message:'user already exist'+ isUserExist.email == email ?'email is already exist':'userName already exist'
        })
    }

    const hash = await bcrypt.hash(password,10)

    const user = await userModel.create({
        userName:userName,
        email:email,
        password:hash
    })

    const token = jwt.sign({
        id:user._id
        },process.env.JWT_SECRET,{expiresIn:"3d"}
    )

    res.cookie("token",token)

    res.status(201).json({
        message: "User registered successfully",
        user: {
            id: user._id,
            userName: user.userName,
            email: user.email
        }
    })

}


async function loginUser(req,res){

    const {email, password, userName} = req.body;

    const user = await userModel.findOne({
        $or: [
            { email },
            { userName }
        ]
    })

    if (!user) {
        return res.status(400).json({
            message: "Invalid credentials"
        })
    }

    const isPasswordValid = await bcrypt.compare(password,user.password)

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid credentials"
        })
    }

    const token = jwt.sign(
        {
            id: user._id,
            username: user.username
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "3d"
        }
    )

    res.cookie("token", token)

    return res.status(200).json({
        message: "User logged in successfully",
        user: {
            id: user._id,
            userName: user.userName,
            email: user.email
        }
    })
}


async function getMeUser(req,res){

    const userId = req.user.id

    const user = await userModel.findById(userId)

    res.status(200).json({
        message:"user data fatch successfully",
        user
    })
}

async function logoutUser(req,res){

    const token = req.userToken

    res.clearCookie('token')

    await redis.set(token,Date.now().toString(),"EX",60*60*24*3)

    res.status(204).json({
        message:"logout Successfully"
    })
    
}

module.exports = {registerUser, loginUser, getMeUser, logoutUser}