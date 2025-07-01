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
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Courtiers</h1>
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
          onClick={() => setToggleCourtierModal(true)}
        >
          <span>Ajouter un courtier</span>
          <Plus className="h-5 w-5" />
        </button>
      </div>

      <div className="mb-4">
        <table className="w-full mx-auto text-center text-sm border-collapse">
          <thead>
            <tr className="bg-gray-200" style={{ border: "1px solid #d3d3d3" }}>
              <th className="py-2" style={{ border: "1px solid #d3d3d3" }}>
                #
              </th>
              <th style={{ border: "1px solid #d3d3d3" }}>Nom Complet</th>
              <th style={{ border: "1px solid #d3d3d3" }}>E-mail</th>
              <th style={{ border: "1px solid #d3d3d3" }}>Nom Agence</th>
              <th style={{ border: "1px solid #d3d3d3" }}>Crée à</th>
              <th style={{ border: "1px solid #d3d3d3" }}>Status</th>
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
                  onClick={() => {
                    setToggleCourtierModal(true);
                    setSelectedRow(courtier.id);
                  }}
                  key={courtier.id}
                  style={{ border: "1px solid #d3d3d3" }}
                  className="hover:bg-gray-100 cursor-pointer"
                >
                  <td className="py-2" style={{ border: "1px solid #d3d3d3" }}>
                    {courtier.id}
                  </td>
                  <td style={{ border: "1px solid #d3d3d3" }}>
                    {courtier?.user?.nom + " " + courtier?.user?.prenom}
                  </td>
                  <td style={{ border: "1px solid #d3d3d3" }}>
                    {courtier?.user?.email}
                  </td>
                  <td style={{ border: "1px solid #d3d3d3" }}>
                    {courtier?.agence?.agence}
                  </td>
                  <td style={{ border: "1px solid #d3d3d3" }}>
                    {new Date(courtier.created_at).toLocaleString()}
                  </td>
                  <td style={{ border: "1px solid #d3d3d3" }}>
                    <span className="text-[#f5f3f4] rounded text-xs">
                      {status
                        .filter((s) => s.id === courtier.status_id)
                        .map((st) => (
                          <div key={st.id}>
                            <span
                              style={{ backgroundColor: st["coleur-code"] }}
                              className="text-white px-2 py-1 rounded"
                            >
                              {st.nom}
                            </span>
                          </div>
                        ))}
                    </span>
                  </td>
                </tr>
              ))}

            {courtiers.length === 0 && (
              <tr>
                <td colSpan={7} className="py-10">
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
