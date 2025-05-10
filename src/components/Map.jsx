import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet'; // Import Leaflet

const Map = () => {
  // Coordinates for Jayden's Mall
  const mallLocation: LatLngExpression = [-1.2611160961558991, 36.80193374106406];

  // Define the custom icon
  const customIcon = new L.Icon({
    iconUrl: '/images/marker.png', // Make sure the icon is in the public folder
    iconSize: [40, 40], // Adjust the size of the icon
    iconAnchor: [20, 40], // Anchor the icon to the center-bottom
    popupAnchor: [0, -40], // Position the popup correctly
  });

  return (
    <div>
      <h1>Welcome to Jayden's Mall</h1>
      <div style={{ height: '500px', width: '100%' }}>
        <MapContainer center={mallLocation} zoom={15} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {/* Use the custom icon here */}
          <Marker position={mallLocation} icon={customIcon}>
            <Popup>
              Welcome to Jayden's Mall!
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;
