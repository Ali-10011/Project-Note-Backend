const { json } = require('express');
const express = require('express'); 
const mongoose = require('mongoose');
const Auth = require('./models/auth');

const app = express();
const uri = 'mongodb+srv://Art:Art1234@node-practice.jknzmex.mongodb.net/Project_Note';
mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true }).then((data)=>{console.log('Connected');app.listen(3000);}).catch((err)=>{console.log(err)});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post('/',(req, res)=>{//requested url
    //response.send('<p>Hello, its my homepage</p>'); //we 'send' the response
    //console.log(JSON.parse(request));

    console.log(req.body.username);
    console.log(req.body.password);
    console.log(req.body.authtype);
    
    if(req.body.authtype == 'signup')
    {
    const newAuth = new Auth({username: req.body.username, password:req.body.password }); //'Blog' is the name of  our  model th at we created  //The request body is sent using the 'names' that we defined
    newAuth.save().then((result)=>{ const responseData = {
        message:"signup OK"
    }
     
    const jsonContent = JSON.stringify(responseData);
    res.end(jsonContent);

}).catch((err)=>{console.log(err);

});
    
    }
    else 
    {
Auth.findById(req.username).then((data)=>{  
   const responseData = {
    message:"Login OK"
}
 
const jsonContent = JSON.stringify(responseData);
res.end(jsonContent);  }).catch((err)=>{console.log(err)});
    }
   
});

// const express = require('express');
// const { Server } = require('ws');
// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCU44eqvrt_LO2Sk2wuB7Zhe0cGLoLWWJE",
//   authDomain: "project-note-bca4a.firebaseapp.com",
//   projectId: "project-note-bca4a",
//   storageBucket: "project-note-bca4a.appspot.com",
//   messagingSenderId: "24249137468",
//   appId: "1:24249137468:web:fd017a6ca15c1fee0a4639",
//   measurementId: "G-6ZXW4SN246"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// let database = firebase.database();


// const server = express()
//     .use((req, res) => res.send("Hi there"))
//     .listen(3000, () => console.log(`Listening on 3000`));

// const wss = new Server({ server });

// wss.on('connection', function(ws, req) {
//     ws.on('message', message => {
//         var dataString = message.toString();
//         if (dataString == "Hello") {
//             console.log(dataString)
//             ws.send("Hi from Node.js");
//         } else{
//             console.log(dataString)
//             ws.send("Are you not saying hi to me 🥺👉👈");
//         }
//     }) 
// })

