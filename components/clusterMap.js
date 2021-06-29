import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

function ClusterMap({ properties }) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  });

  const containerStyle = {
    width: "100%",
    height: "100%"
  };

  const center = {
    lat: properties[0].location.lat,
    lng: properties[0].location.lng
  };

  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
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
      {properties.map((property, index) => (
        <Marker
          position={{
            lat: property?.location?.lat,
            lng: property?.location?.lng
          }}
        />
      ))}
      <></>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(ClusterMap);
