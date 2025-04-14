import {
  faCircleInfo,
  faCloudArrowUp,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState } from "react";
import carrousel from "../../../assets/carrousel.gif";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

function Images() {
  const createBien = useSelector((state) => state.CreateBienReducer);
  const files = useSelector((state) => state.filesReducer);
  const dispatch = useDispatch();
  const addFile = useRef();
  const fileInputs = useRef([]);

  const initialLength = Math.max(
    createBien.images?.length || 0,
    files?.length || 0
  );

  const [numImages, setNumImages] = useState(initialLength);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSetNumImages = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    const number = parseInt(data.numImages);
    if (number > 20) {
      toast.error("Vous avez dépassé la limite de 20 images.");
    } else {
      setNumImages(number);
    }
  };

  const handleDivClick = (index) => {
    fileInputs.current[index]?.click();
    setSelectedImage(index);
  };

  const handleFileChange = (event, index) => {
    const file = event.target.files[0];
    dispatch({
      type: "SET_FILES",
      payload: [...files, file],
    });
    setNumImages((prev) => Math.max(prev, index + 1));
  };

  const handleRemoveImage = (index) => {
    const allImages = [...(createBien.images || []), ...files];
    const isFile = index >= (createBien.images?.length || 0);

    if (isFile) {
      const fileIndex = index - (createBien.images?.length || 0);
      const updatedFiles = files.filter((_, i) => i !== fileIndex);
      dispatch({ type: "SET_FILES", payload: updatedFiles });
    } else {
      const updatedImages = createBien.images.filter((_, i) => i !== index);
      dispatch({
        type: "SET_CREATE_BIEN",
        payload: { ...createBien, images: updatedImages },
      });
    }

    setNumImages((prev) => prev - 1);
  };

  const allImages = [...(createBien.images || []), ...files];

  return (
    <div>
      <div className="mx-8 my-2 bg-[#f5f3f4] p-1">
        <h1 className="flex space-x-1 text-xs text-gray-700 items-center">
          <FontAwesomeIcon icon={faCircleInfo} />
          <p>
            Vous avez le droit à 20 images, la première image sera l'image de
            couverture par défaut
          </p>
        </h1>
      </div>

      <div className="flex justify-center items-center text-sm">
        <form
          onSubmit={handleSetNumImages}
          className="border border-[#a4161a] rounded w-1/3 flex justify-between"
        >
          <input
            type="number"
            name="numImages"
            max={20}
            min={0}
            className="px-2 w-3/4 focus:outline-none"
            placeholder="Entrer le nombre d'images.."
          />
          <button className="bg-[#a4161a] hover:bg-[#161a1def] h-full text-white px-4 py-1.5 w-1/4 cursor-pointer">
            Générer
          </button>
        </form>
      </div>

      <div>
        {numImages > 0 ? (
          <div className="flex justify-start items-center overflow-x-auto overflow-y-hidden space-x-2 mt-20 px-4">
            {Array.from({ length: numImages }, (_, index) => {
              const imageSrc = allImages[index];

              return (
                <div
                  key={index}
                  onClick={() => !imageSrc && handleDivClick(index)}
                  className={`relative ${
                    !imageSrc && "cursor-pointer"
                  } min-w-[20rem] h-56 border rounded border-[#b1a7a6] hover:bg-[#b1a7a623] flex items-center justify-center text-[#161a1d] text-xl font-bold`}
                >
                  {imageSrc ? (
                    <img
                      src={
                        imageSrc instanceof File
                          ? URL.createObjectURL(imageSrc)
                          : imageSrc
                      }
                      alt={`Image ${index}`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col w-full h-full justify-center text-center">
                      <span className="text-sm absolute top-1 left-2 font-light">
                        {index + 1}
                      </span>
                      <FontAwesomeIcon
                        icon={faCloudArrowUp}
                        className="text-[#161a1d]"
                      />
                    </div>
                  )}

                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    ref={(el) => (fileInputs.current[index] = el)}
                    onChange={(e) => handleFileChange(e, index)}
                  />

                  {imageSrc && (
                    <div className="text-sm absolute top-1 right-2">
                      <FontAwesomeIcon
                        icon={faTrash}
                        onClick={() => handleRemoveImage(index)}
                        className="text-[#a4161a] hover:text-gray-800 cursor-pointer"
                      />
                    </div>
                  )}
                </div>
              );
            })}

            <div
              className="cursor-pointer min-w-[20rem] h-56 bg-[#b1a7a6] hover:bg-[#b1a7a688] flex items-center justify-center text-white text-3xl font-bold"
              onClick={() => {
                numImages >= 20
                  ? toast.error("Vous avez dépassé le maximum des images !!")
                  : setNumImages(numImages + 1);
              }}
            >
              +
            </div>
          </div>
        ) : (
          <div className="w-full flex justify-center mt-10">
            <img src={carrousel} alt="carrousel" className="w-40" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Images;
