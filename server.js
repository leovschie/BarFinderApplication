const express = require("express");
const app = express();
const { postUserRegistration } = require("./controllers/registerController");
const { postUserLogin } = require("./controllers/loginController");
const { checkCookies } = require("./helperfunctions/checkCookies");
const { getUserHistory } = require("./helperfunctions/getUserHistory");
const { barFinder } = require("./helperfunctions/barFinder");
const logOut = require("./controllers/logOutController");
const cookieParser = require("cookie-parser");
const { connector } = require("./database/configuration/dbConfig");
const session = require("express-session");
const port = process.env.PORT || 5001;

app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    name: process.env.SESSION_COOKIE,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

app.post("/api/formdata", (req, res) => {
  const formData = req.body;
  const session = req.session.user;
  console.log("THIS IS THE SESSION !!!!!!!!!!!!!!!!!!", session);
  console.log(formData);
  barFinder(formData, session, res);
});
app.post("/register", postUserRegistration);
app.post("/login", postUserLogin);
app.post("/resulthistory", getUserHistory);
app.get("/logout", logOut);
app.get("/home", (req, res) => {
  checkCookies(req, res);
});

connector
  .sync()
  .then(() => {
    app.listen(port, () => console.log(`Got ears on port: ${port}`));
  })
  .catch(error =>
    console.error(`Cannot sync connector with server ${error.stack}`)
  );
