import { useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const MapOverlay = ({ center, children }) => {
  const map = useMap();
  const [position, setPosition] = useState({ left: 0, top: 0 });

  useEffect(() => {
    if (!center) return;

    const updatePosition = () => {
      const point = map.latLngToContainerPoint(center);
      setPosition({
        left: point.x,
        top: point.y,
      });
    };

    updatePosition();
    map.on("move", updatePosition);
    map.on("zoom", updatePosition);

    return () => {
      map.off("move", updatePosition);
      map.off("zoom", updatePosition);
    };
  }, [center, map]);

  return ReactDOM.createPortal(
    <div
      style={{
        position: "absolute",
        left: position.left,
        top: position.top,
        transform: "translate(-50%, -50%)",
        zIndex: 900,
      }}
      className="bg-white rounded-full"
    >
      {children}
    </div>,
    document.querySelector(".leaflet-container")
  );
};

export default MapOverlay;
