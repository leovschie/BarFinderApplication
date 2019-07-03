const Result = require("../database/models/Result");

module.exports = {
  getResults: (req, res) => {
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
  }
};

//
