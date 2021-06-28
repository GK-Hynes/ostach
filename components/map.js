import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

function Map({ location }) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  });

  const containerStyle = {
    width: "100%",
    height: "400px"
  };

  const center = {
    lat: location.lat,
    lng: location.lng
  };

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <Marker position={{ lat: location.lat, lng: location.lng }} />
      <></>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(Map);
