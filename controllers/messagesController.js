const { json } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const url = require("url");
const Auth = require("../models/auth");
const UserMessageInstance = require("../models/userdata");
const querystring = require("querystring");


//getting messages from server
const getMessages = async (req, res) =>
{
    const queryObject = url.parse(req.url, true).query;
    console.log(queryObject);
    var messagesToLoad = parseInt(queryObject.perpage);
    var skipMessages = parseInt(queryObject.skip);
    UserMessageInstance.find({ username: "Lucifer" })
      .limit(messagesToLoad)
      .skip(skipMessages)
      .sort({ createdAt: -1 })
      .then((result) => {
        const jsonContent = JSON.stringify(result);
        res.end(jsonContent);
      });
}

//posting a single message
const uploadMessage = async(req, res) =>
{
    console.log(req.body);

  const newInstance = new UserMessageInstance({
    username: "Lucifer",
    message: req.body.message,
    path: req.body.path,
    mediatype: req.body.mediatype,
    dateTime: req.body.dateTime,
    isUploaded: "true",
  });
  newInstance
    .save()
    .then((result) => {
      const responseData = {
        message: "Message Stored",
        result,
      };
      console.log(result);
      const jsonContent = JSON.stringify(responseData);
      res.end(jsonContent);
    })
    .catch((err) => {
      console.log(err);
    });
}

//deleting a message
const deleteMessage = async (req, res) =>
{
    console.log(req.params.id)

    UserMessageInstance.find({ _id: req.params.id })
      .remove()
      .then((result) => {
        const jsonContent = JSON.stringify(result);
        res.end(jsonContent);
      });
}


module.exports = {
    getMessages,
    uploadMessage,
    deleteMessage
}