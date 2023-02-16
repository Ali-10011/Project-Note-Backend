const Auth = require("../models/auth");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");



const registerUser = async (req, res) =>
{
 
  try {
    // Get user input
    const {username, password } = req.body;

    //Validate user input
    if (!(username && password)) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await Auth.findOne({ username });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10); //hashing the password

    // Create user in our database
    const newUser = await Auth.create({  //We will not store the password in database
      username: username,
      password: encryptedPassword,
    });
   
    // Create token
    const token = jwt.sign(
      { user_id: newUser._id, username },
      "I am Lucifer",
      {
        expiresIn: "5m",
      }
    );

    // save user token
    newUser.token = token;

    // return new user
    res.status(201).json(newUser);

  } catch (err) {
     res.status(500).json({ msg: "Internal Server ERROR" });
  }
}

const authenticateUser = async (req, res) => 
{
  
  try {
    // Get user input
    const { username, password } = req.body;

    // Validate user input
    if (!(username&& password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await Auth.findOne({ username });

    if(!user)
    {
     
    }

    if (user && (await bcrypt.compare(password, user.password))) { //comparing the actual password user entered with our hashed password
      const token = jwt.sign(
        { user_id: user._id, username },
        "I am Lucifer",
        {
          expiresIn: "5m",
        }
      );

      // save user token
      user.token = token;

      // user
      res.status(200).json(user);
      return;
    }
     res.status(400).send("Invalid Password");
  } catch (err) {
    res.status(500).json({msg: "Internal Server ERROR"});
  }

}

module.exports = {
  registerUser,
  authenticateUser
};
