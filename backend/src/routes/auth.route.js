const express = require('express')

const authRouter = express.Router()
const authController = require('../controllers/auth.controller')
const authMiddleware = require('../middlewares/auth.middleware')


authRouter.post('/register', authController.registerUser)
authRouter.post('/login', authController.loginUser)
authRouter.get('/get-me', authMiddleware.authUser, authController.getMeUser)
authRouter.post('/logout',authMiddleware.authUser, authController.logoutUser)

module.exports = authRouter