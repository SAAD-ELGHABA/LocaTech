import React from "react";
import writtenNumber from "written-number";

function Louer({ setValideAffaireData, valideAffaireData }) {
  return (
    <form action="" className="w-[90%] grid gap-3">
      <div className="grid grid-cols-2 gap-2">
        <div className="flex-1 mb-4 md:mb-0 ">
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Budget final en nombre par mois
          </label>
          <input
            type="number"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-red-500"
            value={Number(valideAffaireData?.budget_Numbre)}
            onChange={(e) => {
              const newNumber = Number(e.target.value) || 0;

              let newLetter = writtenNumber(newNumber);
              newLetter =
                newLetter.charAt(0).toUpperCase() + newLetter.slice(1);

              setValideAffaireData({
                ...valideAffaireData,
                budget_Numbre: newNumber,
                budget_Lettre: newLetter,
              });
            }}
          />

          <div className="mt-2">
            <span>Le prix final en nombre : </span>
            <span className="text-[#f56565] font-bold text-xs">
              {new Intl.NumberFormat("de-DE", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }).format(valideAffaireData?.budget_Numbre*valideAffaireData?.nombre_mois)}{" "}
              MAD
            </span>
          </div>
        </div>
        <div className="flex-1 mb-4 md:mb-0 ">
          <label
            htmlFor=""
            className="block text-sm font-medium mb-1 text-gray-700"
          >
            Nombre du mois
          </label>
          <input
            type="number"
            name=""
            id=""
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-red-500"
            value={valideAffaireData?.nombre_mois}
            onChange={(e) => {
              setValideAffaireData({
                ...valideAffaireData,
                nombre_mois: e?.target?.value,
              });
            }}
          />
        </div>
      </div>
      <div className="flex-1 mb-4 md:mb-0 ">
        <label className="block text-sm font-medium mb-1 text-gray-700">
          Budget final en lettres
        </label>
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-red-500"
          placeholder="Entrez le budget final en lettres"
          readOnly
          value={valideAffaireData?.budget_Lettre}
          onChange={(e) => {
            setValideAffaireData({
              ...valideAffaireData,
              budget_Lettre: e?.target?.value,
            });
          }}
        />
        <div className="mt-2">
          <span>Le prix final en lettre : </span>
          <span className="text-[#f56565] font-bold text-xs">
            {valideAffaireData?.budget_Lettre} Dirhams
          </span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-1 items-center">
        <div className="flex-1 mb-4 md:mb-0 ">
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Commission %
          </label>
          <input
            type="number"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-red-500"
            placeholder="Entrez le budget final en lettres"
            value={valideAffaireData?.commission_locatech}
            onChange={(e) => {
              setValideAffaireData({
                ...valideAffaireData,
                commission_locatech: e?.target?.value,
              });
            }}
          />
          <div className="mt-2">
            <span>La commission en % : </span>
            <span className="text-[#f56565] font-bold text-xs">
              {valideAffaireData?.commission_locatech} %
            </span>
          </div>
        </div>
        <div className="flex-1 mb-4 md:mb-0 ">
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Impôts %
          </label>
          <input
            type="number"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-red-500"
            placeholder="Entrez le budget final en lettres"
            value={valideAffaireData?.impôts}
            onChange={(e) => {
              setValideAffaireData({
                ...valideAffaireData,
                impôts: e?.target?.value,
              });
            }}
          />
          <div className="mt-2">
            <span>Impôts % : </span>
            <span className="text-[#f56565] font-bold text-xs">
              {valideAffaireData?.impôts} %
            </span>
          </div>
        </div>
        <div className="flex-1 mb-4 md:mb-0 ">
          <label className="block text-sm font-medium mb-1 text-gray-700">
            Frais de dossier %
          </label>
          <input
            type="number"
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-red-500"
            placeholder="Entrez le budget final en lettres"
            value={valideAffaireData?.frauis_dossier}
            onChange={(e) => {
              setValideAffaireData({
                ...valideAffaireData,
                frauis_dossier: e?.target?.value,
              });
            }}
          />
          <div className="mt-2">
            <span>Frais de dossier % : </span>
            <span className="text-[#f56565] font-bold text-xs">
              {valideAffaireData?.frauis_dossier} %
            </span>
          </div>
        </div>
      </div>
      <div className="flex-1 mb-4 md:mb-0 ">
        <label className="block text-sm font-medium mb-1 text-gray-700">
          Commentaire de l'administrateur
        </label>
        <textarea
          type="number"
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:border-red-500"
          placeholder="Commentaire de l'administrateur"
          rows={10}
          value={valideAffaireData?.Commentaire}
          onChange={(e) => {
            setValideAffaireData({
              ...valideAffaireData,
              Commentaire: e.target.value,
            });
          }}
        ></textarea>
      </div>
    </form>
  );
}

export default Louer;
