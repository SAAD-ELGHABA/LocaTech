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
      <div className=" flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Tous les Agences</h1>
        <div className="border rounded px-4 py-1.5 flex w-1/3 border-gray-400 text-sm">
          <input
            type="text"
            className="w-[95%] h-full focus:outline-none"
            placeholder="chercher des conversations .. "
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
          <div className="flex justify-end w-[5%] text-gray-400">
            <Search className="h-5 w-5" />
          </div>
        </div>
        <button
          className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors text-sm"
          onClick={() => setToggleModal(true)}
        >
          <span>Ajouter un courtier</span>
          <Plus className="h-5 w-5" />
        </button>
      </div>
      <div className="min-w-full">
        <table className="w-full mx-auto text-center text-sm border-collapse mt-2">
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
