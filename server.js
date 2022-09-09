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
