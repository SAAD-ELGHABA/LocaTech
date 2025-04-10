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
    <div className="mt-8">
      <form
        onSubmit={handleStep2}
        className="w-2/3 mx-auto flex justify-center flex-col  space-y-4"
      >
        <p className="text-center font-medium">Informations d'agence </p>

        <div className="flex items-center space-x-2 justify-center">
          <label htmlFor="" className="w-1/6">
            Agence :{" "}
          </label>
          <input
            placeholder="entrer votre nom d'agence"
            type="text"
            name="agence"
            id=""
            onChange={(e) => {
              dispatch({
                type: "STEP2",
                payload: {
                  ...step2.step2,
                  agence: e.target.value,
                },
              });
            }}
            value={step2.step2.agence && step2.step2.agence}
            className="w-3/6 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-400"
          />
        </div>
        <div className="flex items-center space-x-2 justify-center">
          <label htmlFor="" className="w-1/6">
            Numero ICE :{" "}
          </label>
          <input
            placeholder="entrer le ICE d'agence"
            type="text"
            name="ICE"
            id=""
            onChange={(e) => {
              dispatch({
                type: "STEP2",
                payload: {
                  ...step2.step2,
                  ICE: e.target.value,
                },
              });
            }}
            value={step2.step2.ICE && step2.step2.ICE}
            className="w-3/6 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-400"
          />
        </div>
        <div className="flex items-center space-x-2 justify-center">
          <label htmlFor="" className="w-1/6">
            Registre Commerce :{" "}
          </label>
          <input
            placeholder="entrer le Registre de Commerce"
            type="text"
            name="RC"
            id=""
            onChange={(e) => {
              dispatch({
                type: "STEP2",
                payload: {
                  ...step2.step2,
                  RC: e.target.value,
                },
              });
            }}
            value={step2.step2.RC && step2.step2.RC}
            className="w-3/6 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-400"
          />
        </div>
        <div className="flex justify-center my-4 w-1/2 mx-auto space-x-2 gap-2">
          <span
            className="w-1/2 mx-auto bg-[#ef233c] hover:bg-red-600 py-2 rounded text-white text-sm cursor-pointer text-center"
            onClick={() => setStep(1)}
          >
            Précédent
          </span>
          <button
            className={`w-1/2 mx-auto bg-[#d90429] hover:bg-red-600 py-2 rounded text-white text-sm cursor-pointer  ${
              loading ? "" : ""
            }`}
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
