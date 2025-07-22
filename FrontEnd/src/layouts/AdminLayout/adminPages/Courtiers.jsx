import React, { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import dossierVide from "../../../assets/dossier-vide.png";
import { LoaderCircle, Plus, Search } from "lucide-react";
import CourtierModal from "../AdminComponents/Modals/CourtierModal";
import { fetchCourtiers } from "../../../functions/fetchCourtiers";

function Courtiers() {
  const courtiers = useSelector((state) => state.AllCourtiersReducer);
  const status = useSelector((state) => state.statusReducer);
  const dispatch = useDispatch();
  const loader = useRef(null);

  useEffect(() => {
    fetchCourtiers(dispatch);
  }, []);

  const [selectedRow, setSelectedRow] = useState(null);
  const [visibleCount, setVisibleCount] = useState(10);
  const [toggleCourtierModal, setToggleCourtierModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const loadMore = () => {
    setVisibleCount((prev) => prev + 10);
  };

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting) {
      loadMore();
    }
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);

  return (
    <div className="p-4">
      {toggleCourtierModal && (
        <CourtierModal
          setToggleCourtierModal={setToggleCourtierModal}
          selectedRow={selectedRow}
          setSelectedRow={setSelectedRow}
        />
      )}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between mb-4">
        <h1 className="text-xl font-bold">Courtiers</h1>

        <div className="flex items-center border border-gray-400 rounded px-4 py-1.5 text-sm w-full lg:w-1/3">
          <input
            type="text"
            className="flex-1 h-full focus:outline-none"
            placeholder="Chercher des conversations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <button  className="flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors text-sm w-full lg:w-auto"
          onClick={() => setToggleCourtierModal(true)}
        >
          <span>Ajouter un courtier</span>
          <Plus className="h-5 w-5" />
        </button>
      </div>

      <div className="mb-4 overflow-x-auto custom-scrollbar">
        <table className="lg:w-full min-w-[1000px] text-center text-sm border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2 px-2 border border-gray-300">#</th>
              <th className="px-2 border border-gray-300">Nom Complet</th>
              <th className="px-2 border border-gray-300">E-mail</th>
              <th className="px-2 border border-gray-300">Nom Agence</th>
              <th className="px-2 border border-gray-300">Créé à</th>
              <th className="px-2 border border-gray-300">Status</th>
            </tr>
          </thead>
          <tbody>
            {courtiers
              .filter(
                (courtier) =>
                  courtier?.user?.nom.toLowerCase().includes(searchTerm) ||
                  courtier?.user?.prenom.toLowerCase().includes(searchTerm) ||
                  courtier?.user?.email.toLowerCase().includes(searchTerm) ||
                  courtier?.agence?.agence.toLowerCase().includes(searchTerm) ||
                  courtier?.status?.nom.toLowerCase().includes(searchTerm)
              )
              .slice(0, visibleCount)
              .map((courtier) => (
                <tr
                  key={courtier.id}
                  onClick={() => {
                    setToggleCourtierModal(true);
                    setSelectedRow(courtier.id);
                  }}
                  className="hover:bg-gray-100 cursor-pointer border border-gray-200"
                >
                  <td className="py-2 px-2 border border-gray-200">
                    {courtier.id}
                  </td>
                  <td className="px-2 border border-gray-200">
                    {courtier?.user?.nom + " " + courtier?.user?.prenom}
                  </td>
                  <td className="px-2 border border-gray-200">
                    {courtier?.user?.email}
                  </td>
                  <td className="px-2 border border-gray-200">
                    {courtier?.agence?.agence}
                  </td>
                  <td className="px-2 border border-gray-200">
                    {new Date(courtier.created_at).toLocaleString()}
                  </td>
                  <td className="px-2 border border-gray-200">
                    {status
                      .filter((s) => s.id === courtier.status_id)
                      .map((st) => (
                        <span
                          key={st.id}
                          className="text-white text-xs px-2 py-1 rounded"
                          style={{ backgroundColor: st["coleur-code"] }}
                        >
                          {st.nom}
                        </span>
                      ))}
                  </td>
                </tr>
              ))}

            {courtiers.length === 0 && (
              <tr>
                <td colSpan={6} className="py-10">
                  <div className="w-full flex justify-center items-center">
                    <img
                      src={dossierVide}
                      alt="vide"
                      className="h-20 mx-auto"
                    />
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Loader */}
        <div ref={loader} className="flex justify-center mt-4">
          {visibleCount < courtiers.length && (
            <LoaderCircle className="text-red-500 animate-spin" />
          )}
        </div>
      </div>
    </div>
  );
}

export default Courtiers;
