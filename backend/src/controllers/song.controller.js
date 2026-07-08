const songModel = require('../models/song.model')
const storageService = require('../services/storage.service')
const id3 = require('node-id3')

async function uploadSong(req,res){
    try {
        if(!req.file){
            return res.status(400).json({
                message:'song file is required'
            })
        }

        const songBuffer = req.file.buffer
        const {mood} = req.body

        const song = id3.read(songBuffer)
        if(!song || !song.title){
            return res.status(400).json({
                message:'invalid or missing MP3 metadata'
            })
        }

        if(!song.image || !song.image.imageBuffer){
            return res.status(400).json({
                message:'MP3 cover art is required to create posterUrl'
            })
        }

        const songFile = await storageService.uploadFile({
          buffer: songBuffer,
          filename: song.title + ".mp3",
                    folder: 'moodify/songs',
                    resourceType: 'auto'
        })

        const posterFile = await storageService.uploadFile({
            buffer: song.image.imageBuffer,
            filename: song.title + ".jpeg",
                        folder: 'moodify/poster',
                        resourceType: 'image'
        })

        const newSong = await songModel.create({
            url: songFile.secure_url || songFile.url,
            posterUrl: posterFile.secure_url || posterFile.url,
            title:song.title,
            mood
        })

        return res.status(201).json({
            message: 'Song uploaded successfully',
            mood,
            newSong
        })
    } catch (error) {
        return res.status(500).json({
            message: error?.message || 'Failed to upload song'
        })
    }

}

async function getSongs(req, res) {
    try {
        const { mood } = req.query

        const filter = mood ? { mood } : {}
        const songs = await songModel.find(filter).sort({ createdAt: -1 })

        return res.status(200).json({
            message: 'Songs fetched successfully',
            songs
        })
    } catch (error) {
        return res.status(500).json({
            message: error?.message || 'Failed to fetch songs'
        })
    }
}

module.exports = {
    uploadSong,
    getSongs
}