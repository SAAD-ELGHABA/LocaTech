import axios from "axios";
import { Flag, Loader2, LoaderCircle, ChevronLeft } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

const REASONS = [
  "Elle est inexacte ou incorrecte",
  "Ce n'est pas un véritable logement",
  "C'est une arnaque",
  "Le contenu est choquant",
  "Il s'agit d'autre chose",
];

function Signal({ setToggleSignalBien, toggleSignalBien, BienDetails }) {
  const [loading, setLoading] = useState(false);
  const [signalText, setSignalText] = useState("");
  const [selectedReason, setSelectedReason] = useState(null);
  const [step, setStep] = useState(1);

  const handleSignal = async () => {
    if (!selectedReason) {
      toast.error("Veuillez sélectionner une raison");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        `/api/bien-signal/${BienDetails?.id}`,
        {
          subject: selectedReason,
          precision: signalText,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage?.getItem("token")}`,
          },
        }
      );
      toast.success("Signalement envoyé avec succès");
      setToggleSignalBien(false);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-[#161a1d93] h-screen w-full top-0 left-0 flex items-center justify-center z-[1002]"
      onClick={() => {
        setToggleSignalBien(false);
      }}
    >
      <div
        className={`flex flex-col bg-white rounded-lg shadow-xl overflow-hidden custom-scrollbar ${
          toggleSignalBien === "waiting"
            ? "w-[20%] h-[30%]"
            : "w-full max-w-md h-auto max-h-[90vh]"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {toggleSignalBien === "waiting" ? (
          <div className="flex items-center justify-center h-full">
            <LoaderCircle className="animate-spin h-12 w-12 text-red-500" />
          </div>
        ) : (
          toggleSignalBien === true && (
            <>
              <div className="bg-red-500 px-6 py-4 flex items-center space-x-3">
                <Flag className="h-6 w-6 text-white" />
                <h1 className="text-lg font-semibold text-white">
                  Signaler cette annonce
                </h1>
              </div>

              <div className="p-6 space-y-6 overflow-y-auto">
                {step === 1 ? (
                  <>
                    <p className="text-gray-700 text-sm">
                      Si vous estimez que ce contenu est inapproprié, offensant
                      ou ne respecte pas nos règles d'utilisation, vous pouvez
                      le signaler afin que notre équipe puisse l'examiner.
                    </p>

                    <div className="space-y-3">
                      <h2 className="font-medium text-gray-900">
                        Sélectionnez une raison :
                      </h2>
                      <div className="space-y-2">
                        {REASONS.map((reason, index) => (
                          <label
                            key={index}
                            className={`flex items-start space-x-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                              selectedReason === reason
                                ? "border-red-500 bg-red-50"
                                : "border-gray-200 hover:bg-gray-50"
                            }`}
                          >
                            <input
                              type="radio"
                              name="signal-reason"
                              value={reason}
                              checked={selectedReason === reason}
                              onChange={() => setSelectedReason(reason)}
                              className="mt-0.5 h-4 w-4 accent-red-500 border-gray-300 focus:ring-red-500"
                            />

                            <span className="text-sm text-gray-800">
                              {reason}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-4 bg-red-50 border border-red-100 rounded-lg">
                      <p className="text-xs font-medium text-red-800">
                        RAISON DU SIGNALEMENT
                      </p>
                      <p className="text-red-600 text-xs">{selectedReason}</p>
                    </div>

                    <div className="space-y-2">
                      <label
                        htmlFor="details"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Ajoutez des détails (optionnel)
                      </label>
                      <textarea
                        id="details"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500 "
                        placeholder="Décrivez le problème plus en détail..."
                        rows={4}
                        value={signalText}
                        onChange={(e) => setSignalText(e.target.value)}
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="bg-gray-50 px-6 py-4 flex justify-between">
                {step === 1 ? (
                  <button
                    onClick={() => setToggleSignalBien(false)}
                    className="px-4 py-2 text-gray-700 hover:text-gray-900"
                  >
                    Annuler
                  </button>
                ) : (
                  <button
                    onClick={() => setStep(1)}
                    className="flex items-center space-x-1 px-4 py-2 text-gray-700 hover:text-gray-900"
                  >
                    <ChevronLeft className="h-5 w-5" />
                    <span>Retour</span>
                  </button>
                )}

                {step === 1 ? (
                  <button
                    onClick={() => selectedReason && setStep(2)}
                    disabled={!selectedReason}
                    className={`px-4 py-2 rounded-md font-medium ${
                      selectedReason
                        ? "bg-red-500 text-white hover:bg-red-600"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    Continuer
                  </button>
                ) : (
                  <button
                    onClick={handleSignal}
                    disabled={loading}
                    className="flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded-md font-medium hover:bg-red-600 min-w-[120px]"
                  >
                    {loading ? (
                      <Loader2 className="animate-spin h-5 w-5" />
                    ) : (
                      "Envoyer le signalement"
                    )}
                  </button>
                )}
              </div>
            </>
          )
        )}
      </div>
    </div>
  );
}

export default Signal;
