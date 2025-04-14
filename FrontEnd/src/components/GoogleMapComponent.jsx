import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const GoogleMapComponent = ({ lat, lng, bounds }) => {
  const [map, setMap] = useState(null);

  // Use effect hook to apply bounds to the map
  useEffect(() => {
    if (map && bounds) {
      // Setting max bounds to restrict the map area
      map.setMaxBounds(bounds);
      // Optionally, you can zoom the map to fit the bounds
      map.fitBounds(L.latLngBounds(bounds));
    }
  }, [map, bounds]);

  return (
    <div className="w-[90%] mx-auto h-60">
      <MapContainer
        center={[lat, lng]} // Set the initial position of the map
        zoom={14} // Zoom level of the map
        style={{ width: '100%', height: '100%' }}
        whenCreated={setMap} // when the map is created, store it in state
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        />
        <Marker position={[lat, lng]}>
          <Popup>A pretty CSS3 popup.</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default GoogleMapComponent;
