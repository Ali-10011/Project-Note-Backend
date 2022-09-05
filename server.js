const express = require('express');
const { Server } = require('ws');
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCU44eqvrt_LO2Sk2wuB7Zhe0cGLoLWWJE",
  authDomain: "project-note-bca4a.firebaseapp.com",
  projectId: "project-note-bca4a",
  storageBucket: "project-note-bca4a.appspot.com",
  messagingSenderId: "24249137468",
  appId: "1:24249137468:web:fd017a6ca15c1fee0a4639",
  measurementId: "G-6ZXW4SN246"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
let database = firebase.database();


const server = express()
    .use((req, res) => res.send("Hi there"))
    .listen(3000, () => console.log(`Listening on 3000`));

const wss = new Server({ server });

wss.on('connection', function(ws, req) {
    ws.on('message', message => {
        var dataString = message.toString();
        if (dataString == "Hello") {
            console.log(dataString)
            ws.send("Hi from Node.js");
        } else{
            console.log(dataString)
            ws.send("Are you not saying hi to me 🥺👉👈");
        }
    }) 
})

