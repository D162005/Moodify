const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:[true,'userName is Required'],
        unique:[true, 'userName must be Unique']
    },
    email:{
        type:String,
        required:[true,'email is required'],
        unique:[true,'email must be unique']
    },
    password:{
        type:String,
        required:[true,'password is required'],
    }
})

const userModel = mongoose.model('user',userSchema)

module.exports = userModel