const express = require("express");
const { User, Course, Admin, Tags,Video} = require("../db");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../middleware/auth");
const { authenticateJwt } = require("../middleware/auth");
const path = require("path");
const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");
const firebaseStorage = require('./firebase'); 
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();

router.get("/me", authenticateJwt, async (req, res) => {
  const admin = await Admin.findOne({ username: req.user.username });
  if (!admin) {
    res.status(403).json({ msg: "Admin doesnt exist" });
    return;
  }
  res.json({
    userhandle: admin.userhandle,
  });
});

router.post("/signup", (req, res) => {
  const { userhandle, username, password } = req.body;
  function callback(admin) {
    if (admin) {
      res.status(403).json({ message: "Admin already exists" });
    } else {
      const obj = {
        userhandle: userhandle,
        username: username,
        password: password,
      };
      const newAdmin = new Admin(obj);
      newAdmin.save();

      const token = jwt.sign({ username, role: "admin" }, SECRET, {
        expiresIn: "1h",
      });
      res.json({ message: "Admin created successfully", token });
      console.log(token);
    }
  }
  Admin.findOne({ username }).then(callback);
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username, password });
  if (admin) {
    const token = jwt.sign({ username, role: "admin" }, SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "Logged in successfully", token,userhandle:admin.userhandle });
  } else {
    res.status(403).json({ message: "Invalid username or password" });
  }
});

router.post("/courses", authenticateJwt, async (req, res) => {
  let course = new Course({
    title: req.body.title,
    description: req.body.description,
    imageLink: req.body.imageLink,
    price: req.body.price,
    published: req.body.published,
    tags: req.body.tags,
    author: req.user.userhandle,
  });
  await course.save();

  for (let i = 0; i < req.body.tags.length; i++) {
    let existingTag = await Tags.findOne({ tags: req.body.tags[i] });

    if (existingTag) {
      // If the tag already exists, update it with the new course ID
      await Tags.findOneAndUpdate(
        { tags: req.body.tags[i] },
        { $push: { courses_with_tag_id: course._id } }
      );
    } else {
      // If the tag doesn't exist, create a new one
      let tag = new Tags({
        tags: req.body.tags[i],
        courses_with_tag_id: [course._id],
      });

      await tag.save();
    }
  }

  res.json({ message: "Course created successfully", courseId: course._id });
});


router.post(
  "/course/:courseid/upload",
  authenticateJwt,
  upload.single("video"),
  async (req, res) => {
    console.log(req.file); // Add this line to log the file object

    const videoName = req.body.name;
    const videoFile = req.file.buffer; // Convert Buffer to Uint8Array

    const videoRef = ref(firebaseStorage, "videos/" + videoName);
    uploadBytes(videoRef, videoFile.buffer)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then(async (downloadURL) => {
            const video = new Video({
              name: videoName,
              path: downloadURL, // Store the download URL instead of the local path
            });

            try {
              await video.save();

              const course = await Course.findById(req.params.courseid);
              if (!course) {
                return res.status(404).json({ message: "Course not found" });
              }
              course.videos.push(video);
              await course.save();
res.json({
  message: "Video uploaded successfully",
  videoName: videoName,
  downloadURL: downloadURL,
});            } catch (err) {
              res.status(500).json({ error: err.message });
            }
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }
);

router.get("/tags", authenticateJwt, async (req, res) => {
  let tags = await Tags.find().select("tags -_id");
  tags = tags.map((tagObj) => tagObj.tags);
  console.log(tags);
  res.json({ tags });
});

router.get("/courses/author/:userhandle", authenticateJwt, async (req, res) => {
  const courses = await Course.find({ author: req.params.userhandle });
  console.log(courses);
  res.json({ courses });
});

router.get("/course/:courseid", authenticateJwt, async (req, res) => {
  const courseid = req.params.courseid;
  const course = await Course.findById(courseid).populate("videos");
  res.json({ course });
});

module.exports = router;
