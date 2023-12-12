const express = require("express");
const { authenticateJwt, SECRET } = require("../middleware/auth");
const { User, Course, Admin, Tags } = require("../db");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.get("/me", authenticateJwt, async (req, res) => {
  const user = await User.findOne({ username: req.user.username });
  if (!user) {
    res.status(403).json({ msg: "User doesnt exist" });
    return;
  }
  res.json({
    userhandle: user.userhandle,
    purchasedCourses: user.purchasedCourses,
    username: user.username,
    Links: user.Links,
    bio: user.bio,
  });
});

router.put("/me", authenticateJwt, async (req, res) => {
  const { userhandle, username, bio, Links } = req.body;
  const user = await User.findOne({ username: req.user.username });
  if (!user) {
    res.status(403).json({ msg: "User doesn't exist" });
    return;
  }
  user.userhandle = userhandle;
  user.username = username;
  user.bio = bio;
  user.Links = Links;
  await user.save();
  res.json({
    userhandle: user.userhandle,
    username: user.username,
    bio: user.bio,
    Links: user.Links,
  });
});

router.post("/signup", async (req, res) => {
  const { userhandle, username, password } = req.body;
  const user = await User.findOne({ username });
  if (user) {
    res.status(403).json({ message: "User already exists" });
  } else {
    const newUser = new User({ userhandle, username, password });
    await newUser.save();
    const token = jwt.sign({ username, role: "user" }, SECRET, {
      expiresIn: "2h",
    });
    res.json({ message: "User created successfully", token });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (user) {
    const token = jwt.sign({ username, role: "user" }, SECRET, {
      expiresIn: "2h",
    });
    res.json({ message: "Logged in successfully", token });
  } else {
    res.status(403).json({ message: "Invalid username or password" });
  }
});

router.get("/tags", authenticateJwt, async (req, res) => {
  let tags = await Tags.find().select("tags -_id");
  tags = tags.map((tagObj) => tagObj.tags);
  console.log(tags);
  res.json({ tags });
});

router.get("/courses-by-tags", async (req, res) => {
  const tags = req.query.tags.split(",");
  const courses = await Course.find({ tags: { $all: tags } });
  res.json(courses);
});

router.get("/courses", authenticateJwt, async (req, res) => {
  const courses = await Course.find({ published: true });
  res.json({ courses });
});

router.get("/courses/:courseId", authenticateJwt, async (req, res) => {
  const course = await Course.findById(req.params.courseId).populate("videos");
  if (course) {
    res.json({ course });
  } else {
    res.status(404).json({ message: "Course not found" });
  }
});

router.post("/courses/:courseId", authenticateJwt, async (req, res) => {
  const course = await Course.findById(req.params.courseId);
  console.log(course);
  if (course) {
    const user = await User.findOne({ username: req.user.username });
    if (user) {
      user.purchasedCourses.push(course);
      await user.save();
      res.json({ message: "Course purchased successfully" });
    } else {
      res.status(403).json({ message: "User not found" });
    }
  } else {
    res.status(404).json({ message: "Course not found" });
  }
});

router.get("/purchasedCourses", authenticateJwt, async (req, res) => {
  const user = await User.findOne({ username: req.user.username }).populate(
    "purchasedCourses"
  );
  if (user) {
    res.json({ purchasedCourses: user.purchasedCourses || [] });
  } else {
    res.status(403).json({ message: "User not found" });
  }
});

module.exports = router;
