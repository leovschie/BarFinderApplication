const express = require("express");
const app = express();
const axios = require("axios");

const port = process.env.PORT || 5000;

app.use(express.json());

app.post("/api/formdata", (req, res) => {
  const formData = req.body;
  console.log(formData);
  axios
    .get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${
        req.body.addressOne
      }.json?bbox=4.72904,52.318396,5.068431,52.430717&types=address&access_token=pk.eyJ1IjoibGVvdnNjaGllIiwiYSI6ImNqd2hvZzVndjI1NXczeW1ncWZia2xmYnUifQ.N3ePKZlufagjG76E-tPQZQ`
    )
    .then(response => {
      const features = [];
      let coordinatesAddress1 = response.data.features[0].geometry.coordinates;
      let obj1 = {};
      obj1.lat = coordinatesAddress1[1];
      obj1.lng = coordinatesAddress1[0];
      features.push(obj1);

      // secondAddressFinder.findAddress2(req, features, res);
      axios
        .get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${
            req.body.addressTwo
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

          // var centerCoords = findCenterCoordinates(response, features);
          // barFinder.yelpBarFinder(centerCoords, res);
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

  // axios
  //   .get("/api/formdata")
  //   .then(results => console.log(results))
  //   .catch(error =>
  //     console.error(
  //       `Something went wrong with getting client data in server:${error.stack}`
  //     )
  //   );
});

// app.get("/addressOne", (req, res) => {
//   axios
//     .get(
//       `https://api.mapbox.com/geocoding/v5/mapbox.places/spuistraat.json?bbox=4.72904,52.318396,5.068431,52.430717&types=address&access_token=pk.eyJ1IjoibGVvdnNjaGllIiwiYSI6ImNqd2hvZzVndjI1NXczeW1ncWZia2xmYnUifQ.N3ePKZlufagjG76E-tPQZQ`
//     )
//     .then(results => {
//       console.log(results.data);
//       res.send(results.data);
//     })
//     .catch(error =>
//       console.error(
//         `Something went wrong with the first get request: ${error.stack}`
//       )
//     );
// });

app.listen(port, () => console.log(`Got ears on port: ${port}`));
