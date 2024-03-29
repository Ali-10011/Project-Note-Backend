const { json } = require("express");
const express = require("express");
const mongoose = require("mongoose");
const messagesRoutes = require("./routes/messages");
require('dotenv').config();


//Connect to Mongo and Listen
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true})
    //Your Mongo DB Connection String here.
  .then((data) => {
    console.log("Connected");
    app.listen(process.env.PORT || 5000);
  })
  .catch((err) => {
    console.log(err);
  });

//MiddleWare
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//All the routes
app.use("/api", messagesRoutes);
