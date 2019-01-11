const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create Schema
const UserSchema = new Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  emailAddress: {
    type: String
  },
  password: {
    type: String
  },
});