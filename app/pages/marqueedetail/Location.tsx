import { GoogleMap, LoadScript, Marker,useJsApiLoader } from "@react-google-maps/api";
import React, { memo } from "react";

const Location = memo(({ center }:any) => {
  const containerStyle = {
    width: "100%",
    height: "400px",
  };
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyD0Fd3UOK6hm07omIUFRvQfH5_bXW8SJB4"
  })
  const [map, setMap] = React.useState(null)
  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])
  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={16}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <Marker position={center} />
    </GoogleMap>
) : <></>
});

export default Location;
