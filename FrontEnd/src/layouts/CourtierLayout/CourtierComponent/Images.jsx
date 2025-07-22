import {
  faCircleInfo,
  faCloudArrowUp,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import carrousel from "../../../assets/carrousel.gif";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

function Images() {
  const createBien = useSelector((state) => state.CreateBienReducer);
  const files = useSelector((state) => state.filesReducer);
  const dispatch = useDispatch();
  const fileInputs = useRef([]);

  const allImages = [...(createBien.images || []), ...files];
  const [selectedImage, setSelectedImage] = useState(null);
  
  const onDrop = useCallback(
    (acceptedFiles) => {
      const totalImages = allImages.length + acceptedFiles.length;
      if (totalImages > 20) {
        toast.error("Vous avez dépassé la limite de 20 images.");
        return;
      }

      dispatch({
        type: "SET_FILES",
        payload: [...files, ...acceptedFiles],
      });
    },
    [files, allImages.length, dispatch]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
    maxSize: 10 * 1024 * 1024,
  });

  const handleDivClick = (index) => {
    fileInputs.current[index]?.click();
    setSelectedImage(index);
  };

  const handleFileChange = (event, index) => {
    const file = event.target.files[0];
    const totalImages = allImages.length + 1;
    if (totalImages > 20) {
      toast.error("Vous avez dépassé la limite de 20 images.");
      return;
    }

    dispatch({
      type: "SET_FILES",
      payload: [...files, file],
    });
  };

  const handleRemoveImage = (index) => {
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
  };

  const handleCoverSelect = (index) => {
    if (index === 0) return;

    const isFile = index >= (createBien.images?.length || 0);
    const imagesLength = createBien.images?.length || 0;

    if (isFile) {
      const fileIndex = index - imagesLength;
      const updatedFiles = [...files];
      const [selectedFile] = updatedFiles.splice(fileIndex, 1);
      updatedFiles.unshift(selectedFile);
      dispatch({ type: "SET_FILES", payload: updatedFiles });
    } else {
      const updatedImages = [...createBien.images];
      const [selectedImage] = updatedImages.splice(index, 1);
      updatedImages.unshift(selectedImage);
      dispatch({
        type: "SET_CREATE_BIEN",
        payload: { ...createBien, images: updatedImages },
      });
    }
  };

  return (
    <div>
      <div className="lg:mx-8 mx-4 my-2 bg-[#f5f3f4] p-1">
        <h1 className="flex space-x-1 text-xs text-gray-700 items-center">
          <FontAwesomeIcon icon={faCircleInfo} />
          <p>
            Vous avez le droit à 20 images, la première image sera l'image de
            couverture par défaut.
          </p>
        </h1>
      </div>

      <div
        {...getRootProps()}
        className="lg:w-1/2 w-[95%] mx-auto border-2 border-dashed border-[#a4161a] p-6 my-4 rounded cursor-pointer text-center hover:bg-[#a4161a11] transition"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-[#a4161a]">Déposez les images ici ...</p>
        ) : (
          <p>
            Glissez-déposez des images ici ou cliquez pour en sélectionner (max
            20)
          </p>
        )}
      </div>
      {allImages.length > 0 && (
        <div className="w-full flex justify-center ">
          <h1 className="text-center flex space-x-2">
            <span className="font-semibold">
              {allImages.length}
              <span className="font-normal">/20</span>
            </span>
            <span>images</span>
          </h1>
        </div>
      )}
      <div>
        {allImages.length > 0 ? (
          <div className="flex justify-start items-center overflow-x-auto overflow-y-hidden space-x-2 mt-5 px-4">
            {allImages.map((imageSrc, index) => (
              <div
                key={index}
                onClick={() => !imageSrc && handleDivClick(index)}
                className={`relative min-w-[20rem] h-56 border rounded border-[#b1a7a6] hover:bg-[#b1a7a623] flex items-center justify-center text-[#161a1d] text-xl font-bold`}
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
                  <div className="text-sm absolute top-1 right-2 flex items-center space-x-2">
                    <FontAwesomeIcon
                      icon={faTrash}
                      onClick={() => handleRemoveImage(index)}
                      className="text-[#a4161a] hover:text-gray-800 cursor-pointer"
                    />

                    <input
                      type="checkbox"
                      checked={index === 0}
                      onChange={() => handleCoverSelect(index)}
                      title="Définir comme image de couverture"
                      className="form-checkbox text-[#a4161a] w-4 h-4 cursor-pointer"
                    />
                  </div>
                )}
              </div>
            ))}
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
