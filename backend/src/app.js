const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')

const app = express()

const authRouter = require('./routes/auth.route')
const songRouter = require('./routes/song.route')

app.use(express.json({ limit: 1024 * 1024 * 20 }))
app.use(cookieParser())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(express.static('./public'))

app.use('/api/auth', authRouter)
app.use('/api/song', songRouter)

module.exports = app