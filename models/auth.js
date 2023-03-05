const mongoose = require("mongoose"); //mongoose is the API that connects us with the database
const Schema = mongoose.Schema; //creating a schema for the database (schema for a table)

const authSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    token: {
      type: String,
    },
    tokenExpiry:
    {
      type: String
    }
  },
  { timestamps: true }
); //so we can know when the blog was last edited / created etc

const Auth = mongoose.model("Auth", authSchema, "Auth"); //now it will model the schema on the database
module.exports = Auth;
