const { json } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const messagesRoutes = require('./routes/messages')


const uri =
  "mongodb+srv://Art:Art1234@node-practice.jknzmex.mongodb.net/Project_Note";
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((data) => {
    console.log("Connected");
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });


  //MiddleWare
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//All the routes
app.use('/api', messagesRoutes)



