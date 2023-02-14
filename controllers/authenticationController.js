const { json } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const url = require("url");
const Auth = require("../models/auth");
const querystring = require("querystring");


const authenticateUser = async(req, res) =>
{
    if (req.body.authtype == "signup") {
        const username = req.body.username.toString();
    
        Auth.findOne({ username: username }, function (err, obj) {
          if (err) return handleError(err);
    
          if (!obj) {
            //null object means that the user does not exist
            const newAuth = new Auth({
              username: req.body.username,
              password: req.body.password,
            });
            newAuth
              .save()
              .then((result) => {
                const responseData = {
                  message: "OK",
                };
                const jsonContent = JSON.stringify(responseData);
                res.end(jsonContent);
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            const responseData = {
              message: "User Already Exists!",
            };
            const jsonContent = JSON.stringify(responseData);
            res.end(jsonContent);
          }
        });
      } else if (req.body.authtype == "login") {
        const username = req.body.username.toString();
        var _responsemessage;
        Auth.findOne({ username: username }, function (err, obj) {
          if (err) return handleError(err);
          if (!obj) {
            _responsemessage = "This User Does not Exist!";
          } else if (obj.password.toString() == req.body.password.toString()) {
            SessionUserName = username;
            _responsemessage = "OK";
          } else if (obj.password != req.body.password) {
            _responsemessage = "Wrong Password!";
          }
          responseData = {
            message: _responsemessage,
          };
          const jsonContent = JSON.stringify(responseData);
          res.end(jsonContent);
        });
      }
}

module.exports = 
{
    authenticateUser
}