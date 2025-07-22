import { Pencil, UserRoundPen } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadToCloudinary } from "../../../lib/cloudinary";
import axios from "axios";
import { toast } from "sonner";
import { login } from "../../../redux/actions";
import Aside from "../usercompoenents/aside";

function Profile() {
  const user = useSelector((state) => state.userReducer.userInfo);

  const [formData, setFormData] = React.useState({
    nom: user?.nom || "",
    prenom: user?.prenom || "",
    email: user?.email || "",
    age: user?.age || "",
    telephone: user?.telephone || "",
    sexe: user?.sexe || "",
    ville: user?.ville || "",
    code_postal: user?.code_postal || "",
    CIN: user?.CIN || "",
    adresse: user?.adresse || "",
  });

  const [selectedImage, setSelectedImage] = React.useState(null);
  const [selectedFile, setSelectedFile] = React.useState(null);
  const fileInputRef = React.useRef(null);
  const [isLoadaing, setIsLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    try {
      setIsLoading(true);
      Object.entries(formData).forEach(([key, value]) => {
        form.append(key, value);
      });

      if (selectedFile) {
        const uploadedUrls = await uploadToCloudinary([selectedFile]);
        form.append("image", uploadedUrls[0]);
      }

      const responseUpdateProfile = await axios.post(
        "/api/updateProfile",
        form,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (
        responseUpdateProfile.status >= 200 &&
        responseUpdateProfile.status < 300
      ) {
        toast.success("Le profil a été mis à jour avec succès");
        dispatch(
          login(localStorage.getItem("token"), responseUpdateProfile.data.user)
        );
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="bg-gray-100 py-5 lg:py-10">
      <div className="lg:flex mt-10 bg-white rounded-lg overflow-hidden">
        <Aside />

        <div className="w-full lg:w-[80%] p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold flex items-center space-x-2 text-gray-800">
              <span>Mon Profile</span>
              <UserRoundPen className="h-6 w-6 text-gray-600" />
            </h1>
          </div>

          <div className="lg:flex space-y-6 lg:space-y-0 lg:space-x-6 relative">
            <div className="lg:w-1/3 flex justify-center sticky top-10">
              <span className="inline-block relative">
                <img
                  src={selectedImage || user?.image || "/profile-icon.png"}
                  alt="image profile"
                  className="rounded-full w-56 h-56 object-cover border border-gray-300"
                />
                <button
                  type="button"
                  className="bg-gray-100 opacity-75 hover:opacity-100 cursor-pointer rounded-full p-3 absolute top-5 right-2 shadow"
                  onClick={handleImageClick}
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="hidden"
                />
              </span>
            </div>

            <div className="w-4/5 lg:w-2/3 mx-auto">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {[
                    ["nom", "Nom"],
                    ["prenom", "Prénom"],
                    ["email", "Email", "email"],
                    ["age", "Âge", "number"],
                    ["telephone", "Téléphone"],
                    ["ville", "Ville"],
                    ["code_postal", "Code Postale"],
                    ["CIN", "CIN"],
                  ].map(([name, label, type = "text"]) => (
                    <div key={name} className="flex flex-col">
                      <label
                        htmlFor={name}
                        className="mb-1 text-sm font-medium text-gray-700"
                      >
                        {label}
                      </label>
                      <input
                        placeholder={label}
                        type={type}
                        name={name}
                        id={name}
                        disabled={name === "email" && true}
                        className="border rounded-lg border-gray-300 focus:ring-1 focus:ring-red-500 focus:outline-none px-4 py-2"
                        value={formData[name]}
                        onChange={handleChange}
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label
                    htmlFor="adresse"
                    className="mb-1 text-sm font-medium text-gray-700"
                  >
                    Adresse
                  </label>
                  <textarea
                    name="adresse"
                    id="adresse"
                    className="border rounded-lg border-gray-300 focus:ring-1 focus:ring-red-500 focus:outline-none px-4 py-2 w-full"
                    placeholder="Adresse"
                    value={formData.adresse}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className={`w-1/2 lg:w-1/3 mt-4 px-6 py-2.5 rounded-lg text-white text-sm font-medium ${
                      isLoadaing
                        ? "bg-red-400"
                        : "bg-red-600 hover:bg-red-700 cursor-pointer"
                    }`}
                  >
                    {isLoadaing ? "..." : "Enregistrer"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
