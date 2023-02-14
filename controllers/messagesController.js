const { json } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const url = require("url");
const Auth = require("../models/auth");
const UserMessageInstance = require("../models/userdata");
const querystring = require("querystring");

//getting messages from server
const getMessages = async (req, res) => {
  const queryObject = url.parse(req.url, true).query;
  try {
    const messages = await UserMessageInstance.find({ username: "Lucifer" })
      .limit(parseInt(queryObject.perpage))
      .skip(parseInt(queryObject.skip))
      .sort({ createdAt: -1 });

    res.status(200).json(messages);
  } catch (e) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//posting a single message
const uploadMessage = async (req, res) => {
  try {
    const message = await new UserMessageInstance({
      username: "Lucifer",
      message: req.body.message,
      path: req.body.path,
      mediatype: req.body.mediatype,
      dateTime: req.body.dateTime,
      isUploaded: "true",
    }).save();

    if (!message) {
      res.status(404).json({ error: "No such entry" });
    }

    res.status(200).json(messagee);
  } catch (e) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//deleting a message
const deleteMessage = async (req, res) => {
  try {
    const message = await UserMessageInstance.findOneAndDelete({
      _id: req.params.id,
    });

    if (!message) {
      res.status(404).json({ error: "No such entry" });
    }

    res.status(200).json(message);
  } catch (e) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getMessages,
  uploadMessage,
  deleteMessage,
};
