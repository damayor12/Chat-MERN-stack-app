const express = require('express')
const { registerUser, authUser } = require('../controllers/userControllers')

const router = express.Router()

//Endpoints chaining
router.route('/').post(registerUser)
router.post('/login', authUser)

module.exports = router