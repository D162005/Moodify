const express = require('express')

const songRouter = express.Router()
const upload = require('../middlewares/upload.middleware')
const songController = require('../controllers/song.controller')


songRouter.get('/', songController.getSongs)
songRouter.post('/',upload.single("song"), songController.uploadSong)

module.exports = songRouter