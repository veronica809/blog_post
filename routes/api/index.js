const router = require("express").Router();
const { logout } = require("../../controllers/users");
const { checkAuth } = require("../../middlewares/authMiddleware");
const userRoutes = require("./userRoutes");
const blogpost = require("./blogpost")

router.use("/users", userRoutes);
router.use("/blogpost", blogpost);
router.get("/logout", logout);

module.exports = router;
