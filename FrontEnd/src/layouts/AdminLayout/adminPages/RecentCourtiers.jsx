import { faArrowsRotate, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import dossierVide from "../../../assets/dossier-vide.png";
import { fetchCourtiers } from "../../../functions/fetchCourtiers";
import { Search } from "lucide-react";

function RecentCourtiers() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const recentCourtiers = useSelector((state) => state.RecentCourtiers);
  const LoadinfGlobal = useSelector((state) => state.loadingReducer);
  useEffect(() => {
    fetchCourtiers(dispatch);
  }, []);
  const [selectedRow, setSelectedRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const statusReducer = useSelector((state) => state.statusReducer);

  const totalPages = Math.ceil(recentCourtiers.length / usersPerPage);
  const maxVisiblePages = 3;
  const half = Math.floor(maxVisiblePages / 2);

  let startPage = Math.max(currentPage - half, 1);
  let endPage = startPage + maxVisiblePages - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(endPage - maxVisiblePages + 1, 1);
  }
  const [itemSearch, setItemSearch] = useState(null);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentRecenteCourtiers = recentCourtiers.slice(
    indexOfFirstUser,
    indexOfLastUser
  );

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleStatus = (e, id) => {
    e.preventDefault();
    const selectedStatus_id = e.target.value;

    toast("Est-ce que vous voulez changer le status de ce courtier ?", {
      action: {
        label: "Confirmer",
        onClick: async () => {
          setLoading(true);
          try {
            const response = await axios.post("/api/StatusCourtiers", {
              idCourtie: id,
              status_id: selectedStatus_id,
            });

            if (response.status >= 200 && response.status <= 300) {
              toast.success(response.data.message);
              dispatch({
                type: "SET_LOADING",
                payload: true,
              });
            }
          } catch (error) {
            toast.error(error?.response?.data?.message || "Erreur");
          } finally {
            setLoading(false);
          }
        },
      },
      cancel: {
        label: "Annuler",
      },
    });
  };

  const refreshCourtiers = async (courtierId) => {
    setSelectedRow(courtierId);
    setLoading(true);
    try {
      const response = await axios.get("/api/courtiers");
      dispatch({
        type: "SET_RECENT_COURTIERS",
        payload: response.data,
      });
      toast.success("Les courtiers ont été rafraîchis !");
    } catch (error) {
      toast.error("Erreur lors du rafraîchissement des courtiers");
    } finally {
      setLoading(false);
      setSelectedRow(null);
    }
  };

  return (
    <div className="w-full p-4">
      <div className="mb-2 flex flex-col lg:flex-row justify-between gap-4">
        <h1 className="text-xl font-bold">Les Recents Courtiers</h1>
        <div className="border rounded px-4 py-1.5 flex lg:w-1/3 border-gray-400 text-sm">
          <input
            type="text"
            className="w-[95%] h-full focus:outline-none"
            placeholder="chercher des conversations .. "
            value={itemSearch}
            onChange={(e) => setItemSearch(e.target.value.toLowerCase())}
          />
          <div className="flex justify-end w-[5%] text-gray-400">
            <Search className="h-5 w-5" />
          </div>
        </div>
      </div>
      <div className="overflow-auto custom-scrollbar">
        <table className="lg:w-full min-w-[1000px] mx-auto text-center text-sm border-collapse">
          <thead>
            <tr style={{ border: "1px solid #d3d3d3" }} className="bg-gray-200">
              <th className="py-2" style={{ border: "1px solid #d3d3d3" }}>
                id
              </th>
              <th style={{ border: "1px solid #d3d3d3" }}>Nom Complet</th>
              <th style={{ border: "1px solid #d3d3d3" }}>E-mail</th>
              <th style={{ border: "1px solid #d3d3d3" }}>Nom Agence</th>
              <th style={{ border: "1px solid #d3d3d3" }}>Crée à</th>
              <th style={{ border: "1px solid #d3d3d3" }}>Status</th>
              <th style={{ border: "1px solid #d3d3d3" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentRecenteCourtiers.length > 0 &&
              currentRecenteCourtiers
                .filter((courtier) => {
                  if (!itemSearch || itemSearch.trim() === "") return true; 

                  const search = itemSearch.toLowerCase();
                  return (
                    courtier?.user?.nom?.toLowerCase().includes(search) ||
                    courtier?.user?.prenom?.toLowerCase().includes(search) ||
                    courtier?.user?.email?.toLowerCase().includes(search) ||
                    courtier?.agence?.agence?.toLowerCase().includes(search) ||
                    courtier?.status?.nom?.toLowerCase().includes(search)
                  );
                })
                .map((courtier) => (
                  <tr
                    key={courtier.id}
                    style={{ border: "1px solid #d3d3d3" }}
                    className="hover:bg-gray-100 cursor-pointer"
                  >
                    <td
                      className="py-2"
                      style={{ border: "1px solid #d3d3d3" }}
                    >
                      {courtier.id}
                    </td>
                    <td style={{ border: "1px solid #d3d3d3" }}>
                      {courtier?.user?.nom + " " + courtier?.user?.prenom}
                    </td>
                    <td style={{ border: "1px solid #d3d3d3" }}>
                      {courtier.user?.email}
                    </td>
                    <td style={{ border: "1px solid #d3d3d3" }}>
                      {courtier.agence.agence}
                    </td>
                    <td style={{ border: "1px solid #d3d3d3" }}>
                      {new Date(courtier.created_at).toLocaleString()}
                    </td>
                    <td className="flex justify-center items-center text-center">
                      <div className="w-full">
                        {loading && selectedRow === courtier.id ? (
                          <div className="w-full h-full mx-auto flex justify-center items-center p-1">
                            <FontAwesomeIcon
                              icon={faSpinner}
                              className="animate-spin"
                            />
                          </div>
                        ) : (
                          <select
                            className="p-1 border-none outline-none "
                            onChange={(e) => handleStatus(e, courtier.id)}
                          >
                            <option value="">Modifier le status</option>
                            {statusReducer
                              .filter(
                                (s) =>
                                  s?.id === 2 ||
                                  s?.id === 3 ||
                                  s?.id === 8 ||
                                  s.id === 5
                              )
                              .map((s) => (
                                <option key={s.id} value={s.id}>
                                  {s.id === 2
                                    ? "supprimer"
                                    : s.id === 3
                                    ? "blocker"
                                    : s.id === 8
                                    ? "brouiller"
                                    : "activer"}
                                </option>
                              ))}
                          </select>
                        )}
                      </div>
                    </td>
                    <td style={{ border: "1px solid #d3d3d3" }}>
                      <span className="text-[#f5f3f4] rounded text-xs">
                        {statusReducer
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
                      {selectedRow === courtier.id && (
                        <button
                          className="flex space-x-2 items-center cursor-pointer hover:bg-[#d3d3d3] px-2 py-1 rounded mt-2"
                          onClick={() => refreshCourtiers(courtier.id)}
                        >
                          <FontAwesomeIcon icon={faArrowsRotate} />
                          <span>rafraîchir</span>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
            {recentCourtiers.length === 0 && (
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
      </div>

      {/* Pagination */}
      <div className="flex justify-center space-x-1 mt-8 text-xs">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-red-500 text-white rounded disabled:opacity-50 cursor-pointer"
        >
          Précédent
        </button>

        {Array.from({ length: endPage - startPage + 1 }, (_, i) => {
          const pageNumber = startPage + i;
          return (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`cursor-pointer px-4 py-2 ${
                currentPage === pageNumber
                  ? "bg-red-500 text-white"
                  : "bg-gray-200"
              } rounded`}
            >
              {pageNumber}
            </button>
          );
        })}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="cursor-pointer px-4 py-2 bg-red-500 text-white rounded disabled:opacity-50"
        >
          Suivant
        </button>
      </div>
    </div>
  );
}

export default RecentCourtiers;
