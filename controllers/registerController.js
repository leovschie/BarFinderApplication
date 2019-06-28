const User = require("../database/models/User");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator/check");

module.exports = {
  postUserRegistration: (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      req.session.error = errors.array();
    } else {
      bcrypt
        .hash(req.body.password, 10)
        .then(hashPassword => {
          User.create({
            email: req.body.email,
            password: hashPassword
          })
            .then(results => {
              req.session.user = results.dataValues;
              console.log(
                "User's session after registration: ",
                req.session.user
              );
              res.send(results.dataValues);
            })
            .catch(error => {
              console.error(`Cannot create user: ${error.stack}`);
            });
        })
        .catch(error =>
          console.error(
            `Something went wrong when hasing password ${error.stack}`
          )
        );
    }
  }
};
