const User = require("../database/models/User");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator/check");

module.exports = {
  postUserLogin: (req, res) => {
    User.findOne({
      where: {
        email: req.body.email
      }
    })
      .then(foundUser => {
        bcrypt
          .compare(req.body.password, foundUser.dataValues.password)
          .then(results => {
            console.log("results from bcompare", results);
            if (req.body.email !== null && results) {
              req.session.user = foundUser.dataValues;
              res.send("/login");
            } else {
              console.error(
                "Something went wrong when logging in",
                error.stack
              );
              res.send("/login");

              //   res.redirect("/login");
            }
          })
          .catch(error => console.error(`Couldn't login: ${error.stack}`));
      })
      .catch(error =>
        console.error(
          `Something went wrong when comparing password ${error.stack}`
        )
      );
  }
};
