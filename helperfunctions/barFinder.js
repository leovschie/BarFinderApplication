const axios = require("axios");
const turf = require("@turf/turf");
const GeoJSON = require("geojson");
const yelp = require("yelp-fusion");
const client = yelp.client(
  "h9PwSdv_BZvvWSTFhTpDWMQO1vl96LxSgmnkwLmmdLQ4nwi_-wyoJky5u4QUUjld3v2L95iCCys8PYRpaUtKoEJwWq94KuMZQS1fs5BeK8lJYVqQuLxz_vhANdH4XHYx"
);
const Result = require("../database/models/Result");

barFinder = (formData, session, res) => {
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
                Result.findOrCreate({
                  where: {
                    barname: bar.barName,
                    address: bar.barAddress,
                    userId: session.id
                  }
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
};
exports.barFinder = barFinder;
