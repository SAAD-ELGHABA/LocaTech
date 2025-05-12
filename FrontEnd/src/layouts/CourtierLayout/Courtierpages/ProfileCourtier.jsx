import { ScanQrCode, Pencil, CircleAlert } from "lucide-react";
import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadToCloudinary } from "../../../lib/cloudinary";
import axios from "axios";
import { toast } from "sonner";
import { login } from "../../../redux/actions";

function ProfileCourtier() {
  const currentCourtier = useSelector((state) => state.ActuelCourtierReducer);
  const fileInputRef = useRef(null);
  console.log(currentCourtier);
  const [formData, setFormData] = useState({
    nom: currentCourtier?.user?.nom || "",
    prenom: currentCourtier?.user?.prenom || "",
    email: currentCourtier?.user?.email || "",
    telephone: currentCourtier?.user?.telephone || "",
    Type_activité: currentCourtier?.Type_activité || "",
    Années_expérience: currentCourtier?.Années_expérience || "",
    SEO: currentCourtier?.SEO || "",
    Zone_activité: currentCourtier?.Zone_activité || "",
    Licence_professionnelle: currentCourtier?.Licence_professionnelle || "",
    Brève_présentation: currentCourtier?.Brève_présentation || "",
  });
  const [isLoadaing, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const [imagePreview, setImagePreview] = useState(
    currentCourtier?.user?.image || ""
  );

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files[0];
      setFormData((prev) => ({
        ...prev,
        [name]: file,
      }));

      if (name === "image" && file) {
        setImagePreview(URL.createObjectURL(file));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const form = new FormData();

    try {
      setIsLoading(true);
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== "image" && key !== "Licence_professionnelle") {
          form.append(key, value);
        }
      });
      if (imagePreview && formData.image) {
        const uploadedUrls = await uploadToCloudinary([formData.image]);
        form.append("image", uploadedUrls[0]);
        setImagePreview(uploadedUrls[0]);
      }

      const responseUpdateProfile = await axios.post(
        "/api/updateProfileCourtier",
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
        console.log(responseUpdateProfile);

        toast.success("Le profil a été mis à jour avec succès");
        dispatch(
          login(localStorage.getItem("token"), responseUpdateProfile.data.user)
        );
        dispatch({
          type: "ActuelCourtier",
          payload: responseUpdateProfile.data.currentCourtier,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const fields = [
    { name: "nom", placeholder: "Nom" },
    { name: "prenom", placeholder: "Prénom" },
    { name: "email", placeholder: "Email", type: "email" },
    { name: "telephone", placeholder: "Téléphone" },
    { name: "Type_activité", placeholder: "Type d'activité" },
    {
      name: "Années_expérience",
      placeholder: "Années d'expérience",
      type: "Number",
    },
    { name: "SEO", placeholder: "SEO" },
    { name: "Zone_activité", placeholder: "Zone d'activité" },
  ];

  return (
    <div>
      <div className="mx-8 my-4 flex items-center space-x-2">
        <ScanQrCode className="h-8 w-8" />
        <h1 className="text-xl font-semibold">Mes données</h1>
      </div>

      <form onSubmit={handleSubmit} className="max-w-5xl mx-auto p-4 text-sm">
        {
          <div className="bg-red-100 text-red-950 mb-3 flex items-center space-x-2 p-2 rounded">
            <CircleAlert />
            <p>
              veuillez compléter votre profil pour rendre votre compte et vos
              annonces plus accessibles par les clients
            </p>
          </div>
        }
        <div className="lg:flex gap-6 items-start">
          <div className="relative w-48 h-48">
            <img
              src={imagePreview}
              alt="Profil"
              className="w-full h-full object-cover rounded-full border border-gray-300"
            />
            <button
              type="button"
              onClick={handleImageClick}
              className="absolute top-3 right-3 bg-gray-100 p-2 cursor-pointer opacity-50 hover:opacity-100 rounded-full shadow"
            >
              <Pencil className="w-5 h-5 text-gray-600" />
            </button>
            <input
              type="file"
              name="image"
              ref={fileInputRef}
              onChange={handleChange}
              className="hidden"
              accept="image/*"
            />
          </div>

          <div className=" w-2/3 mx-auto">
            <table className="w-full table-auto">
              <tbody>
                {fields.map((field) => (
                  <tr key={field.name}>
                    <td className="pr-4 py-2.5 font-medium w-40">
                      {field.placeholder}
                    </td>
                    <td className="py-2">
                      <input
                        type={field.type || "text"}
                        name={field.name}
                        placeholder={field.placeholder}
                        value={formData[field.name] || ""}
                        onChange={handleChange}
                        className={`w-full border border-gray-400 focus:outline-none rounded p-2 ${
                          !formData[field.name] && "border-red-500"
                        }`}
                      />
                    </td>
                  </tr>
                ))}
                <tr>
                  <td className="pr-4 py-2 font-medium">
                    Licence professionnelle
                  </td>
                  <td className="py-2">
                    <div className="py-2">
                      <div
                        className={`flex items-center rounded space-x-4 ${
                          !formData.Licence_professionnelle &&
                          "border border-red-500"
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() =>
                            document.getElementById("licence-upload").click()
                          }
                          className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded cursor-pointer"
                        >
                          Choisir un fichier
                        </button>
                        <span className="text-sm text-gray-600 truncate max-w-xs">
                          {formData.Licence_professionnelle?.name ||
                            "Aucun fichier sélectionné"}
                        </span>
                      </div>
                      <input
                        id="licence-upload"
                        type="file"
                        name="Licence_professionnelle"
                        onChange={handleChange}
                        className="hidden"
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="pr-4 py-2 font-medium align-top">
                    Brève présentation
                  </td>
                  <td className="py-2">
                    <textarea
                      name="Brève_présentation"
                      rows="4"
                      placeholder="Brève présentation"
                      onChange={handleChange}
                      className={`w-full border border-gray-400 focus:outline-none rounded p-2 ${
                        !formData?.Brève_présentation &&
                        "border border-red-500 rounded"
                      }`}
                      value={formData?.Brève_présentation}
                    />
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="text-right mt-4">
              <button
                type="submit"
                className={`w-1/3 mt-4 px-6 py-2.5 rounded-lg text-white text-sm font-medium ${
                  isLoadaing
                    ? "bg-red-400"
                    : "bg-red-600 hover:bg-red-700 cursor-pointer"
                }`}
              >
                {isLoadaing ? "..." : "Enregistrer"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ProfileCourtier;
