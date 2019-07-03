import React, { Component } from "react";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoibGVvdnNjaGllIiwiYSI6ImNqd2hvZzVndjI1NXczeW1ncWZia2xmYnUifQ.N3ePKZlufagjG76E-tPQZQ"
});

class RenderMap extends Component {
  state = {};
  render() {
    return (
      <Map
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
          height: "100vh",
          width: "100vw"
        }}
        center={[4.895168, 52.370216]}
      >
        <Layer type="symbol" id="marker" layout={{ "icon-image": "marker-15" }}>
          <Feature coordinates={[4.895168, 51.518250335096376]} />
        </Layer>
      </Map>
    );
  }
}

export default RenderMap;
