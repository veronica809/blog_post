const { Patientlist } = require("../../models");
const { postList } = require("../../models");
const { comments } = require("../../models");

const { User } = require("../../models");
const { checkAuth } = require("../../middlewares/authMiddleware");
const router = require("express").Router();

router.get("/", async (req, res) => {
  try {
    const posts = await postList.findAll({});
    res.status(200).json(postList);
  } catch (err) {
    res.status(400).json({ err, message: "Not found" });
  }
});

router.post("/", async (req, res) => {
  console.log("reaching the backend route");
  console.log(req.body);
  try {
    await postList.create({
      ...req.body,
      // user_id: req.session.userId,
    });
    console.log("it is responding");
    res.redirect("/dashboard");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/add", async (req, res) => {
  console.log("reaching the backend route");
  console.log(req.body);
  console.log(req.session.userId);
  try {
    await postList.create({
      ...req.body,
      user_id: req.session.userId,
    });
    res.status(200).json();
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
router.post("/comment/add", async (req, res) => {
  console.log("reaching the backend route");
  console.log(req.body);
  console.log(req.session.userId);
  try {
    await comments.create({
      ...req.body,
      user_id: req.session.userId,
    });
    res.status(200).json();
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
router.post("/blogedit", async (req, res) => {
  console.log("the edit request is coming as:");
  console.log(req.body);
  try {
    if (req.body.edit) {
      await postList
        .update(
          {
            title: req.body.title,
            body: req.body.body,
            edit: false,
          },
          {
            where: {
              id: req.body.id,
            },
          }
        )
        .then(function () {
          res.status(200).send("OK");
        });
    } else {
      await postList
        .update(
          {
            edit: true,
          },
          {
            where: {
              id: req.body.id,
            },
          }
        )
        .then(function () {
          res.status(200).send("OK");
        });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/delete/:id", (req, res) => {
  postList.destroy({ where: { id: req.params.id } }).then(function (response) {
    console.log("the response from sequelize is:");
    console.log(response);
    res.status(201).json(response);
  });
});

module.exports = router;
