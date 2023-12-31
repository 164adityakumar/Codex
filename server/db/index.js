const mongoose = require("mongoose");

// Define mongoose schemas
const userSchema = new mongoose.Schema({
  userhandle: String,
  username: { type: String },
  password: String,
  bio: String,
  Links: String,
  purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});

const adminSchema = new mongoose.Schema({
  userhandle: String,
  username: String,
  password: String,
  bio: String,
  Links: String,
});

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: Boolean,
  author: String,
  tags: [String],
  videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }], // Add this line
});

const tagsSchema = new mongoose.Schema({
  tags: String,
  courses_with_tag_id: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
  ],
});

const videoSchema = new mongoose.Schema({
  // Add this block
  name: String,
  path: String,
  course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
});

const User = mongoose.model("User", userSchema);
const Admin = mongoose.model("Admin", adminSchema);
const Course = mongoose.model("Course", courseSchema);
const Tags = mongoose.model("Tags", tagsSchema);
const Video = mongoose.model("Video", videoSchema); // Add this line

module.exports = {
  User,
  Admin,
  Course,
  Tags,
  Video, // Add this line
};
