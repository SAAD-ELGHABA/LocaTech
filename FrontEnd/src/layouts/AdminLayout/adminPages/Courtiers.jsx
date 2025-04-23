import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import dossierVide from "../../../assets/dossier-vide.png";

function Courtiers() {
  const courtiers = useSelector((state) => state.AllCourtiersReducer);
  const status = useSelector((state) => state.statusReducer);

  const [selectedRow, setSelectedRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const totalPages = Math.ceil(courtiers.length / usersPerPage);
  const maxVisiblePages = 3;
  const half = Math.floor(maxVisiblePages / 2);

  let startPage = Math.max(currentPage - half, 1);
  let endPage = startPage + maxVisiblePages - 1;

  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(endPage - maxVisiblePages + 1, 1);
  }

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentCourtiers = courtiers.slice(indexOfFirstUser, indexOfLastUser);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };
  return (
    <div className="p-4">
      <div>
        <h1 className="text-xl font-semibold">Courtiers</h1>
      </div>
      <div className="mb-4">
        <table className="w-full mx-auto text-center text-sm border-collapse">
          <thead>
            <tr style={{ border: "1px solid #d3d3d3" }} className="bg-gray-200">
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
            {currentCourtiers.length > 0 &&
              currentCourtiers.map((courtier) => (
                <tr
                  key={courtier.id}
                  style={{ border: "1px solid #d3d3d3" }}
                  className="hover:bg-gray-100 cursor-pointer"
                >
                  <td className="py-2" style={{ border: "1px solid #d3d3d3" }}>
                    {courtier.id}
                  </td>
                  <td style={{ border: "1px solid #d3d3d3" }}>
                    {courtier.Nom_complet}
                  </td>
                  <td style={{ border: "1px solid #d3d3d3" }}>
                    {courtier.user_email}
                  </td>
                  <td style={{ border: "1px solid #d3d3d3" }}>
                    {courtier.agence_nom}
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
    </div>
  );
}

export default Courtiers;
