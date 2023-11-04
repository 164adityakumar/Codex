const mongoose = require("mongoose");
// Define mongoose schemas
const userSchema = new mongoose.Schema({
    userhandle: String,
    username: {type: String},
    password: String,
    purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
  });
  
const adminSchema = new mongoose.Schema({
    userhandle: String,
    username: String,
    password: String
  });
  
const courseSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    imageLink: String,
    published: Boolean,
    author: String,
    tags: [String]
  });
const tagsSchema = new mongoose.Schema({
    tags: String,
    courses_with_tag_id: [String]
  });


const User = mongoose.model('User', userSchema);
const Admin = mongoose.model('Admin', adminSchema);
const Course = mongoose.model('Course', courseSchema);
const Tags = mongoose.model('Tags', tagsSchema);
  module.exports = {
    User,
    Admin,
    Course,
    Tags
  }