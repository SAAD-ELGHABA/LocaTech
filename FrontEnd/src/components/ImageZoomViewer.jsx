import React, { useState } from "react";
import { Maximize2, X, ZoomIn, ZoomOut } from "lucide-react";

const ImageZoomViewer = ({ imageUrl }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [transformOrigin, setTransformOrigin] = useState("center center");

  const handleWheel = (e) => {
    e.preventDefault();
    const direction = e.deltaY > 0 ? -0.1 : 0.1;
    setZoom((prevZoom) => Math.max(0.1, prevZoom + direction));

    const rect = e.target.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;

    const percentX = (offsetX / rect.width) * 100;
    const percentY = (offsetY / rect.height) * 100;

    setTransformOrigin(`${percentX}% ${percentY}%`);
  };

  const handleZoomIn = () => setZoom((z) => z + 0.1);
  const handleZoomOut = () => setZoom((z) => Math.max(0.1, z - 0.1));

  return (
    <>
      <div className="w-fit relative">
        <img
          src={imageUrl}
          alt="indice"
          className="rounded shadow object-cover w-full"
        />
        <button
          onClick={() => setIsModalOpen(true)}
          className="absolute cursor-pointer top-8 right-2 bg-white p-1 rounded-full shadow hover:bg-gray-200"
        >
          <Maximize2 size={18} />
        </button>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center"
          style={{ zIndex: 1004 }}
        >
          <div className="absolute top-4 right-6 flex gap-3 z-50">
            <button
              onClick={handleZoomIn}
              className="bg-white p-2 rounded shadow hover:bg-gray-100"
            >
              <ZoomIn size={18} />
            </button>
            <button
              onClick={handleZoomOut}
              className="bg-white p-2 rounded shadow hover:bg-gray-100"
            >
              <ZoomOut size={18} />
            </button>
            <button
              onClick={() => {
                setIsModalOpen(false);
                setZoom(1); 
                setTransformOrigin("center center");
              }}
              className="bg-white p-2 rounded shadow hover:bg-gray-100"
            >
              <X size={18} />
            </button>
          </div>

          <div
            className="overflow-auto w-full max-h-full flex items-center justify-center"
            onWheel={handleWheel}
          >
            <img
              src={imageUrl}
              alt="zoomed"
              style={{
                transform: `scale(${zoom})`,
                transformOrigin: transformOrigin,
                transition: "transform 0.5s, transform-origin 0.2s",
              }}
              className="object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ImageZoomViewer;
