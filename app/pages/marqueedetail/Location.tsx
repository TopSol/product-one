import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import React from "react";

function Location({containerStyle,center}) {
  console.log(center,"location")
  return (
    <div>
      <LoadScript googleMapsApiKey="AIzaSyD0Fd3UOK6hm07omIUFRvQfH5_bXW8SJB4">
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
          <Marker position={center} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default Location;
