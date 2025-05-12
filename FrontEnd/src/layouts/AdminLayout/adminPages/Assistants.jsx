import axios from "axios";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "sonner";

function Assistants() {
  const assistantsReducer = useSelector((state) => state.assistantsReducer);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFormData({
      nom: "",
      prenom: "",
      email: "",
      telephone: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const newAssistant = {
      ...formData,
      image: `https://picsum.photos/seed/${formData.email}/200/200`,
      role: "assistant",
    };

    try {
      const response = await axios.post("/api/store-assistant", newAssistant);
      if (response.status >= 200 && response.status <= 300) {
        toast.success(response.data.message);
        console.log(response);
        
        dispatch({
          type: "GET_ASSISTANTS",
          payload: response.data.assistants,
        });
        handleReset();
      }
    } catch (error) {
      toast.error("Une erreur s'est produite !");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 ">
      <h1 className="text-2xl font-semibold mb-4">Assistant</h1>

      <h2 className="text-lg font-medium mb-2">Ajouter un nouveau assistant</h2>
      <form
        className="max-w-full p-4 bg-white shadow-md rounded space-y-4"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["nom", "prenom", "email", "telephone"].map((field) => (
            <div key={field}>
              <label
                htmlFor={field}
                className="block text-sm font-medium text-gray-700 mb-1 capitalize"
              >
                {field}
              </label>
              <input
                type={field === "email" ? "email" : "text"}
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                placeholder={`Entrez le ${field}`}
                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-red-500"
              />
            </div>
          ))}
        </div>
        <div className="flex justify-end items-center space-x-2 text-sm">
          <button
            type="button"
            onClick={handleReset}
            className="border border-red-500 rounded-2xl text-red-500 px-6 py-2 cursor-pointer hover:bg-red-50"
            disabled={loading}
          >
            Réinitialiser
          </button>
          <button
            type="submit"
            className={`flex items-center justify-center rounded-2xl text-white px-6 py-2 transition ${
              loading
                ? "bg-red-400 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600 cursor-pointer"
            }`}
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                Traitement...
              </div>
            ) : (
              "Ajouter"
            )}
          </button>
        </div>
      </form>

      <div className="my-8">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse text-center text-sm">
            <thead className="border-b border-gray-300">
              <tr>
                <th className="px-4 py-2">Nom</th>
                <th className="px-4 py-2">Prénom</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Téléphone</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Image</th>
              </tr>
            </thead>
            <tbody className="text-gray-500">
              {assistantsReducer.map((assistant) => (
                <tr
                  key={assistant.id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="px-4 py-2">{assistant?.user?.nom}</td>
                  <td className="px-4 py-2">{assistant?.user?.prenom}</td>
                  <td className="px-4 py-2">{assistant?.user?.email}</td>
                  <td className="px-4 py-2">{assistant?.user?.telephone}</td>
                  <td className="px-4 py-2">{assistant?.status?.nom}</td>
                  <td className="px-4 py-2 flex justify-center">
                    <img
                      src={assistant?.user?.image}
                      alt="Assistant"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </td>
                </tr>
              ))}
              {assistantsReducer.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500">
                    Aucun assistant trouvé.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Assistants;
