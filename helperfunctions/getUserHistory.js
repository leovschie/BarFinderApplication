const Result = require("../database/models/Result");

getUserHistory = (req, res) => {
  req.session.user;
  const session = req.session.user;
  if (session) {
    Result.findAll({
      where: {
        userId: session.id
      }
    })
      .then(results => {
        const dbResults = results;
        console.log("results from findAll", dbResults);
        res.send(dbResults);
      })
      .catch(error => console.error(`Couldn't login: ${error.stack}`));
  } else {
    console.log(
      `User is not logged in so nothing is displayed in resulthistory!`
    );
  }
};

exports.getUserHistory = getUserHistory;
