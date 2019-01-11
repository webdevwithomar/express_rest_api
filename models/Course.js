const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create Schema
const CourseSchema = new Schema({
  user: {
    type: String
  },
  title: {
    type: String
  },
  description: {
    type: String
  },
  estimatedTime: {
    type: String
  },
  materialsNeeded: {
    type: String
  }
});