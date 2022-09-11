const mongoose = require('mongoose'); //mongoose is the API that connects us with the database
const Schema = mongoose.Schema; //creating a schema for the database (schema for a table)
//const { UserName } = require('../globals/global');

const userMessageSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
   text: 
   {
    type: String,
    requred: true,
   },
   path: 
   {
    type: String,
    requred: true,
   }
}, { timestamps: true }); //so we can know when the blog was last edited / created etc

const UserMessageInstance = mongoose.model('Lucifer', userMessageSchema, 'Lucifer'); //now it will model the schema on the database
module.exports = UserMessageInstance; 