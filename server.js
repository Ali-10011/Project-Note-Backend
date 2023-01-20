const { json } = require('express');
const express = require('express'); 
const mongoose = require('mongoose');
const http = require('http');
const url = require('url');
const Auth = require('./models/auth');
const UserMessageInstance = require('./models/userdata');
const querystring = require('querystring');


const app = express();
const uri = 'mongodb+srv://Art:Art1234@node-practice.jknzmex.mongodb.net/Project_Note';
mongoose.connect(uri,{ useNewUrlParser: true, useUnifiedTopology: true }).then((data)=>{console.log('Connected');app.listen(3000);}).catch((err)=>{console.log(err)});
var SessionUserName = 'Lucifer';
//module.exports = { UserName: SessionUserName };
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post('/',(req, res)=>{//requested url
    if(req.body.authtype == "signup")
    {
       const username = req.body.username.toString();
    
       Auth.findOne({'username' : username }, function (err, obj)
       {
        if (err) return handleError(err);
        
        if (!(obj)) //null object means that the user does not exist
        {
            const newAuth = new Auth({username: req.body.username, password:req.body.password }); 
            newAuth.save().then((result)=>{ const responseData = {
                message:"OK"
            }
            const jsonContent = JSON.stringify(responseData);
            res.end(jsonContent);
        
        }).catch((err)=>{
            
        console.log(err);     
        }
        );
       }
       else 
       {
        const responseData = {
            message:"User Already Exists!"
        }
        const jsonContent = JSON.stringify(responseData);
            res.end(jsonContent);
       }
    });
}
    else if (req.body.authtype == 'login')
    {
        const username = req.body.username.toString();
        var _responsemessage;
        Auth.findOne({'username' : username }, function (err, obj)
        {
         if (err) return handleError(err);
         if (!(obj))
         {
            _responsemessage = "This User Does not Exist!";
         }
         else if(obj.password.toString() == req.body.password.toString())
         {
            SessionUserName = username;
            _responsemessage = "OK";
         }
         else if (obj.password != req.body.password)
         {
            _responsemessage = "Wrong Password!";
           
         }
         responseData = {
            message:  _responsemessage
        }
         const jsonContent = JSON.stringify(responseData);
        res.end(jsonContent);
        });
       
  
    }
   
});


app.get('/home',(req, res)=>{
    const queryObject = url.parse(req.url, true).query;
    console.log(queryObject);
var pageno = parseInt(queryObject.pageno);
var messagesToLoad = parseInt(queryObject.perpage);
var skipMessages = parseInt(queryObject.skip) + messagesToLoad*pageno;
UserMessageInstance.find({username: 'Lucifer'}).limit(messagesToLoad).skip(skipMessages).sort({createdAt: -1}).then((result)=>{
    //console.log(result);
    const jsonContent = JSON.stringify(result);
    res.end(jsonContent);
});

});

app.post('/home', (req, res) =>
{
    
    console.log(req.body);

      const newInstance = new UserMessageInstance({username: 'Lucifer', message: req.body.message, path: req.body.path, mediatype: req.body.mediatype }); 
            newInstance.save().then((result)=>{ const responseData = {
                message:"Message Stored",
                result,
            }
            console.log(result);
            const jsonContent = JSON.stringify(responseData);
            res.end(jsonContent);
        
        }).catch((err)=>{
        console.log(err);     
        }
        );

   
});

