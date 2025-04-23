import React, { useState } from "react";
import { Maximize2, X, ZoomIn, ZoomOut } from "lucide-react";

const ImageZoomViewer = ({ imageUrl }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zoom, setZoom] = useState(1);

  const handleWheel = (e) => {
    e.preventDefault();
    const direction = e.deltaY > 0 ? -0.1 : 0.1;
    setZoom((prevZoom) => Math.max(0.1, prevZoom + direction));
  };

  const handleZoomIn = () => setZoom((z) => z + 0.1);
  const handleZoomOut = () => setZoom((z) => Math.max(0.1, z - 0.1));

  return (
    <>
      <div className=" w-fit " >
        <img
          src={imageUrl}
          alt="indice"
          className="indice-image rounded shadow object-cover w-full"
        />
        <button
          onClick={() => setIsModalOpen(true)}
          className="absolute cursor-pointer top-2 right-2 bg-white p-1 rounded-full shadow hover:bg-gray-200"
        >
          <Maximize2 size={18} />
        </button>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center " style={{zIndex: 1004}}
          onWheel={handleWheel}
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
              onClick={() => setIsModalOpen(false)}
              className="bg-white p-2 rounded shadow hover:bg-gray-100"
            >
              <X size={18} />
            </button>
          </div>

          {/* Zoomed Image */}
          <div className="overflow-auto w-full max-h-full">
            <img
              src={imageUrl}
              alt="zoomed"
              style={{
                transform: `scale(${zoom})`,
                transition: "transform 0.2s",
              }}
              className="mx-auto object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ImageZoomViewer;
