const mongoose = require('mongoose')

const songSchema = new mongoose.Schema({
    url:{
        type:String,
        required:[true,"Song Url is Required"]
    },
    posterUrl:{
        type:String,
        required:[true,'posterUrl is Required']
    },
    title:{
        type:String,
        required:[true, "Title is Required"]
    },
    mood:{
        type:String,
        enum:{
            values:["sad", "happy", "surprised", "angry", "neutral"],
            message:"Enum this is"
        }
    }
})


const songModel = mongoose.model("song",songSchema)

module.exports = songModel