const express = require("express");
const app = express();
const axios = require("axios");
const turf = require("@turf/turf");
const GeoJSON = require("geojson");
const yelp = require("yelp-fusion");
const client = yelp.client(
  "h9PwSdv_BZvvWSTFhTpDWMQO1vl96LxSgmnkwLmmdLQ4nwi_-wyoJky5u4QUUjld3v2L95iCCys8PYRpaUtKoEJwWq94KuMZQS1fs5BeK8lJYVqQuLxz_vhANdH4XHYx"
);
const { postUserRegistration } = require("./controllers/registerController");
const { postUserLogin } = require("./controllers/loginController");
const Result = require("./database/models/Result");
const logOut = require("./controllers/logOutController");
const { getResults } = require("./controllers/resultController");
const cookieParser = require("cookie-parser");
const { connector } = require("./database/configuration/dbConfig");
const session = require("express-session");
const port = process.env.PORT || 5001;
// const checkCookies = require("./helperfunctions/checkCookies");

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

function checkCookies(req, res) {
  if (!req.cookies.authCookie) {
    res.send(false);
  } else {
    res.send(true);
  }
}

app.post("/api/formdata", (req, res) => {
  const formData = req.body;
  const session = req.session.user;
  console.log("THIS IS THE SESSION !!!!!!!!!!!!!!!!!!", session);
  console.log(formData);
  axios
    .get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${
        formData.addressOne
      }.json?bbox=4.72904,52.318396,5.068431,52.430717&types=address&access_token=pk.eyJ1IjoibGVvdnNjaGllIiwiYSI6ImNqd2hvZzVndjI1NXczeW1ncWZia2xmYnUifQ.N3ePKZlufagjG76E-tPQZQ`
    )
    .then(response => {
      const features = [];
      let coordinatesAddress1 = response.data.features[0].geometry.coordinates;
      let obj1 = {};
      obj1.lat = coordinatesAddress1[1];
      obj1.lng = coordinatesAddress1[0];
      features.push(obj1);

      axios
        .get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${
            formData.addressTwo
          }.json?bbox=4.72904,52.318396,5.068431,52.430717&types=address&access_token=pk.eyJ1IjoibGVvdnNjaGllIiwiYSI6ImNqd2hvZzVndjI1NXczeW1ncWZia2xmYnUifQ.N3ePKZlufagjG76E-tPQZQ`
        )
        .then(response => {
          let coordinatesAddress2 =
            response.data.features[0].geometry.coordinates;
          let obj2 = {};
          obj2.lat = coordinatesAddress2[1];
          obj2.lng = coordinatesAddress2[0];
          features.push(obj2);
          console.log(features);
          var featureCollection = GeoJSON.parse(features, {
            Point: ["lat", "lng"]
          });
          var centerCoords = turf.center(featureCollection);
          console.log(centerCoords);
          //   return centerCoords;

          client
            .search({
              latitude: centerCoords.geometry.coordinates[1],
              longitude: centerCoords.geometry.coordinates[0],
              categories: String(formData.venueType),
              // price: parseInt(formData.priceRange, 10),
              sort_by: "rating",
              radius: 450,
              open_now: true,
              limit: 1
            })
            .then(response => {
              console.log("this is response:", response);
              const bar = {
                barName: response.jsonBody.businesses[0].name,
                barImg: response.jsonBody.businesses[0].image_url,
                barUrl: response.jsonBody.businesses[0].url,
                barPrice: response.jsonBody.businesses[0].price,
                barAddress: response.jsonBody.businesses[0].location.address1
              };
              console.log(bar);
              if (session) {
                Result.create({
                  barname: bar.barName,
                  address: bar.barAddress,
                  userId: session.id
                });
              }
              res.send(bar);
            })
            .catch(error =>
              console.error(
                `Problem either getting coordinates address2 or turf: ${
                  error.stack
                }`
              )
            );
        })
        .catch(error =>
          console.error(`Could not get location from MapBox: ${error.stack}`)
        );
    });
});

app.post("/register", postUserRegistration); //Method that listens for incoming data from the client (React)
app.post("/login", postUserLogin);
app.post("/resulthistory", (req, res) => {
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
});
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
