const express = require('express')
const {getMessages, uploadMessage, deleteMessage} = require("../controllers/messagesController")
const {authenticateUser} = require("../controllers/authenticationController") 

const router = express.Router()


//GET messages
router.get('/home/messages', getMessages)

//POST a single message
router.post('/home/messages', uploadMessage)

//Delete a single message
router.delete('/home/messages/:id', deleteMessage)

//Authenticate a User
router.post('/', authenticateUser)


module.exports = router