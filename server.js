const express = require("express");
const app = express();
const axios = require("axios");
const turf = require("@turf/turf");
const GeoJSON = require("geojson");
const yelp = require("yelp-fusion");
const client = yelp.client(
  "h9PwSdv_BZvvWSTFhTpDWMQO1vl96LxSgmnkwLmmdLQ4nwi_-wyoJky5u4QUUjld3v2L95iCCys8PYRpaUtKoEJwWq94KuMZQS1fs5BeK8lJYVqQuLxz_vhANdH4XHYx"
);

const port = process.env.PORT || 5000;

app.use(express.json());

app.post("/api/formdata", (req, res) => {
  const formData = req.body;
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
          console.log(parseInt(formData.priceRange, 10));

          client
            .search({
              latitude: centerCoords.geometry.coordinates[1],
              longitude: centerCoords.geometry.coordinates[0],
              categories: formData.venueType,
              //   price: parseInt(formData.priceRange, 10),
              sort_by: "rating",
              radius: 500,
              open_now: true,
              limit: 8
            })
            .then(response => {
              let randomNumba = Math.floor(Math.random() * 8);
              const bar = {
                barName: response.jsonBody.businesses[randomNumba].name,
                barImg: response.jsonBody.businesses[randomNumba].image_url,
                barUrl: response.jsonBody.businesses[randomNumba].url,
                barPrice: response.jsonBody.businesses[randomNumba].price,
                barAddress:
                  response.jsonBody.businesses[randomNumba].location
                    .display_address
              };
              console.log(bar);
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

app.listen(port, () => console.log(`Got ears on port: ${port}`));
