import {
  MapContainer,
  TileLayer,
  Circle,
  useMap,
  ZoomControl,
} from "react-leaflet";
import { useEffect, useState } from "react";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import "./styles/CustomMapControls.css"; // Custom styles for zoom buttons

const VITE_OPENCAGEDATA_KEY = import.meta.env.VITE_OPENCAGEDATA_KEY;

const ZoomToCenter = ({ center }) => {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.setView(center);
    }
  }, [center, map]);

  return null;
};

const BienMap = ({ ville, quartier }) => {
  const [center, setCenter] = useState(null);
  const apiKey = VITE_OPENCAGEDATA_KEY;

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const locationQuery = quartier
          ? `${quartier}, ${ville}, Morocco`
          : `${ville}, Morocco`;

        const response = await axios.get(
          `https://api.opencagedata.com/geocode/v1/json`,
          {
            params: {
              key: apiKey,
              q: locationQuery,
              countrycode: "ma",
              limit: 1,
              language: "fr",
            },
          }
        );

        if (response.data.results.length > 0) {
          const { lat, lng } = response.data.results[0].geometry;
          setCenter([lat, lng]);
        }
      } catch (error) {
        console.error("Geocoding error:", error);
      }
    };

    if (ville) {
      fetchCoordinates();
    }
  }, [ville, quartier]);

  return center ? (
    <div className="w-[calc(100vw-150px)] h-[550px] mx-auto rounded my-20">
      <h1 className="my-4 text-xl font-semibold">Où se situe le logement</h1>
      <MapContainer
        center={center}
        zoom={quartier ? 15 : 10}
        style={{ width: "100%", height: "500px" }}
        zoomControl={false}
        attributionControl={false} // Disable attribution control
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          noWrap={true} // Prevent wrapping
        />
        <ZoomToCenter center={center} />
        <Circle
          center={center}
          radius={500} // Smaller radius, takes up a smaller area
          pathOptions={{
            color: "#f44336",
            fillColor: "red",
            fillOpacity: 0.3,
          }}
        />
        <ZoomControl position="topright" />
      </MapContainer>
    </div>
  ) : (
    <p>Chargement de la carte...</p>
  );
};

export default BienMap;
