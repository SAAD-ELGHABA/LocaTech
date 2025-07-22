import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AgenceModal from "../AdminComponents/Modals/AgenceModal";
import { Plus, Search } from "lucide-react";
import { fetchAgence } from "../../../functions/fetchAgence";

function Agences() {
  const agences = useSelector((state) => state.AgencesReducer);
  const [toggleModal, setToggleModal] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchAgence(dispatch);
  }, []);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAgenceId, setSelectedAgenceId] = useState(null);
  return (
    <div>
      {toggleModal && (
        <AgenceModal
          setToggleModal={setToggleModal}
          selectedAgenceId={selectedAgenceId}
          setSelectedAgenceId={setSelectedAgenceId}
        />
      )}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4 gap-4">
        <h1 className="text-xl font-bold">Tous les Agences</h1>

        <div className="flex items-center border border-gray-400 rounded px-4 py-1.5 text-sm w-full lg:w-1/3">
          <input
            type="text"
            className="flex-1 h-full focus:outline-none"
            placeholder="Chercher des conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
          <div className="flex justify-end w-6 text-gray-400">
            <Search className="h-5 w-5" />
          </div>
        </div>

        <button
          className="flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors text-sm w-full lg:w-auto"
          onClick={() => setToggleModal(true)}
        >
          <span>Ajouter une aganec</span>
          <Plus className="h-5 w-5" />
        </button>
      </div>

      <div className="min-w-full mb-4 overflow-x-auto custom-scrollbar">
        <table className="lg:w-full min-w-[1000px] mx-auto text-center text-sm border-collapse mt-2">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 py-2">#</th>
              <th className="border border-gray-300 py-2">Nom Agence</th>
              <th className="border border-gray-300 py-2">E-mail</th>
              <th className="border border-gray-300 py-2">Téléphone</th>
              <th className="border border-gray-300 py-2">Numero ICE</th>
              <th className="border border-gray-300 py-2">Evaluation</th>
            </tr>
          </thead>
          <tbody>
            {agences
              .filter(
                (agence) =>
                  agence?.agence.toLowerCase().includes(searchTerm) ||
                  agence?.evaluation?.evaluation
                    .toLowerCase()
                    .includes(searchTerm)
              )
              .map((agence) => (
                <tr
                  key={agence.id}
                  className="hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSelectedAgenceId(agence?.id);
                    setToggleModal(true);
                  }}
                >
                  <td className="border border-gray-300 py-2">{agence.id}</td>
                  <td className="border border-gray-300 py-2">
                    {agence.agence}
                  </td>
                  <td className="border border-gray-300 py-2">
                    {agence.email}
                  </td>
                  <td className="border border-gray-300 py-2">
                    {agence.telephone}
                  </td>
                  <td className="border border-gray-300 py-2">
                    {agence.Numéro_ICE}
                  </td>
                  <td className="border border-gray-300 py-2">
                    {agence.evaluation?.evaluation}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Agences;
