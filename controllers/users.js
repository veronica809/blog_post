const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.logout = async (req, res) => {
  try {
    req.session.destroy();
    res.redirect("/login");
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getUsersByProfileName = async (req, res) => {
  try {
    const results = await User.findAll({
      where: { profile: req.params.profile },
      attributes: [
        "id",
        "username",
        "firstname",
        "lastname",
        "dob",
        "createdAt",
        "updatedAt",
      ],
    });
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.logIn = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username } });
  const validPassword = await bcrypt.compare(password, user.password);
  if (validPassword) {
    //login user

    return true;
  } else {
    return false;
    // res.status(400).json({ message: "Invalid password" });
  }
};
