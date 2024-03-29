const verifyToken = require('../middlewares/verifyToken');
const express = require("express");
const {
  getMessages,
  uploadMessage,
  deleteMessage,
} = require("../controllers/messagesController");
const { registerUser, authenticateUser } = require("../controllers/authenticationController");

const router = express.Router();

//GET messages
router.get("/home/messages", verifyToken, getMessages);

//POST a single message
router.post("/home/messages", verifyToken, uploadMessage);

//Delete a single message
router.delete("/home/messages/:id", verifyToken, deleteMessage);

//Authenticate a User
router.post("/auth/register", registerUser);

router.post("/auth/login", authenticateUser);

module.exports = router;
