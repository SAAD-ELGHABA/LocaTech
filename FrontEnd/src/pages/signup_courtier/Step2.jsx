import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "sonner";

function Step2({ setStep }) {
  const step2 = useSelector((state) => state.CourtierSignUpReducer);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const handleStep2 = (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const handleRegister = async () => {
      setLoading(true);
      try {
        const response = await axios.post("/api/courtier", step2);
        if (response.status >= 200 && response.status < 300) {
          toast.success(response.data.message);
          setTimeout(() => {
            nav("/courtier");
          }, 2000);
        }
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Erreur lors de l'inscription"
        );
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    if (!data.agence || !data.ICE || !data.RC) {
      toast.error("tous les champs sont obligatoires dans cette étape ");
      setLoading(false);
      return;
    } else {
      dispatch({
        type: "STEP2",
        payload: {
          agence: data.agence,
          ICE: data.ICE,
          RC: data.RC,
        },
      });
      handleRegister();
    }
  };

  return (
    <div className="mt-8 px-4">
      <form
        onSubmit={handleStep2}
        className="w-full max-w-2xl mx-auto flex flex-col space-y-4"
      >
        <p className="text-center font-medium text-lg mb-2">
          Informations d'agence
        </p>

        <div className="flex flex-col md:flex-row md:items-center gap-2">
          <label htmlFor="agence" className="md:w-1/4 font-medium">
            Agence :
          </label>
          <input
            id="agence"
            placeholder="Entrer votre nom d'agence"
            type="text"
            name="agence"
            value={step2.step2.agence || ""}
            onChange={(e) =>
              dispatch({
                type: "STEP2",
                payload: {
                  ...step2.step2,
                  agence: e.target.value,
                },
              })
            }
            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-400"
          />
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-2">
          <label htmlFor="ice" className="md:w-1/4 font-medium">
            Numéro ICE :
          </label>
          <input
            id="ice"
            placeholder="Entrer le numéro ICE"
            type="text"
            name="ICE"
            value={step2.step2.ICE || ""}
            onChange={(e) =>
              dispatch({
                type: "STEP2",
                payload: {
                  ...step2.step2,
                  ICE: e.target.value,
                },
              })
            }
            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-400"
          />
        </div>

        <div className="flex flex-col md:flex-row md:items-center gap-2">
          <label htmlFor="rc" className="md:w-1/4 font-medium">
            Registre Commerce :
          </label>
          <input
            id="rc"
            placeholder="Entrer le registre de commerce"
            type="text"
            name="RC"
            value={step2.step2.RC || ""}
            onChange={(e) =>
              dispatch({
                type: "STEP2",
                payload: {
                  ...step2.step2,
                  RC: e.target.value,
                },
              })
            }
            className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-400"
          />
        </div>

        <div className="flex flex-col md:flex-row justify-center gap-4 mt-6">
          <button
            type="button"
            onClick={() => setStep(1)}
            className="w-full md:w-1/2 bg-[#ef233c] hover:bg-red-600 py-2 rounded text-white text-sm text-center"
          >
            Précédent
          </button>

          <button
            type="submit"
            className="w-full md:w-1/2 bg-[#d90429] hover:bg-red-600 py-2 rounded text-white text-sm text-center flex items-center justify-center"
          >
            {loading ? (
              <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
            ) : (
              "Suivant"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Step2;
