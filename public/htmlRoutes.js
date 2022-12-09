const router = require("express").Router();
const { Patientlist,postList, User } = require("../models");
const { checkAuth } = require("../middlewares/authMiddleware");
const e = require("express");

// HTML ROUTES
// GET / - home page
router.get("/", async (req, res) => {
  try {
    // const blogList = await postList.findAll({
    //    include: User
    // });
    const blogList = await postList.findAll();
    console.log(blogList);
    res.render("index", { blogList });
  } catch (err) {
    res.render("index");

    // res.status(400).json({ err, message: "Not found" });
  }
});
router.get("/post/:postId",checkAuth, async (req, res) => {
  try {
    console.log("reaching the route");
    console.log(req.params);
    const blog = await postList.findOne({
      where: {
        id: req.params.postId,
      },
      include: [{ all: true, nested: true }]

    });

    if (!blog) {
      return res.status(404).json({
        message: "Patient not found",
      });
    }
    console.log(blog.dataValues.User.id)
    console.log(req.session.userId)
    var response = {}
    if (req.session.userId==blog.dataValues.User.id){
      response = {
        ...blog.dataValues,
        canEdit:true
      }

    }else{
      response = {
        ...blog.dataValues,
        canEdit:false
      }
    }
    res.render("post", response);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      message: "Internal server error",
    });
  }
});
router.get("/login", (req, res) => {
  res.render("login");
});
router.get("/register", (req, res) => {
  res.render("registerUser");
});
router.get("/dashboard",checkAuth, async (req, res) => {
  try {
    const blogList = await postList.findAll({
      where: {
        user_id: req.session.userId,
      },
      include: [{ all: true, nested: true }]
    });
    console.log(blogList[0].dataValues.comments);
    res.render("dashboard", { blogList });
  } catch (err) {
    res.render("dashboard");

    // res.status(400).json({ err, message: "Not found" });
  }
  
});

router.get("/allusers", checkAuth, async (req, res) => {
  try {
    const users = await User.findAll();
    console.log(users);
    res.render("registeredUsers", { users });
  } catch (err) {
    res.status(500).json({ err, message: "Internal server error" });
  }
});

module.exports = router;
