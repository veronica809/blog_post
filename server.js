const express = require("express");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const cookieParser = require("cookie-parser");
const sequelize = require("./config/connection");
const path = require("path");
const routes = require("./routes");
const { strict } = require("assert");
const { engine } = require("express-handlebars");

const app = express();
const port = process.env.PORT || 3000;

const sess = {
  secret: process.env.SESSION_SECRET,
  cookie: {
    maxAge: 3 * 60 * 1000,
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  },
  resave: false,
  saveUninitialize: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};
app.use(cookieParser());
app.use(session(sess));
app.use(function (req, res, next) {
  res.locals.session = req.session;
  next();
});

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(routes);

app.get("*", (req, res) => {
  res.status(404).send("page not found");
});

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("DB connected");
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch((error) => {
    console.log("DB connection failed");
    console.log(error);
  });
