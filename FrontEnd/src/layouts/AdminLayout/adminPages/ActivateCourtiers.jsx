import { UserPlus, UserX } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";

function AllCourtiers() {
  const usersReducer = useSelector((state) => state.usersReducer);
  const Courtiers = useSelector((state) => state.AllCourtiersReducer);
  const ActiveCourtier = Courtiers.filter(
    (courtier) => courtier.status_id === 5
  );
  const [currentPage, setCurrentPage] = useState(1);
  const courtiersPerPage = 10;

  const indexOfLastCourtier = currentPage * courtiersPerPage;
  const indexOfFirstCourtier = indexOfLastCourtier - courtiersPerPage;

  const currentCourtiers = ActiveCourtier.slice(
    indexOfFirstCourtier,
    indexOfLastCourtier
  );

  const totalPages = Math.ceil(ActiveCourtier.length / courtiersPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="">
      <div className="text-xl font-bold flex items-center justify-between">
        <h1>Tous les Courtiers Activés</h1>
      </div>
      <div className="">
        <table className="w-full mx-auto text-center text-sm border-collapse mt-2">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 py-2">#</th>
              <th className="border border-gray-300 py-2">Nom Complet</th>
              <th className="border border-gray-300 py-2">E-mail</th>
              <th className="border border-gray-300 py-2">Agence</th>
              <th className="border border-gray-300 py-2">Activé à</th>
              <th className="border border-gray-300 py-2">Créé à</th>
            </tr>
          </thead>
          <tbody>
            {currentCourtiers.length > 0 ? (
              currentCourtiers.map((courtier) => (
                <tr
                  className="hover:bg-gray-100 cursor-pointer"
                  key={courtier.id}
                >
                  <td className="border border-gray-300 py-2">{courtier.id}</td>
                  <td className="border border-gray-300 py-2">
                    {courtier?.user?.nom+" "+courtier?.user?.prenom}
                  </td>
                  <td className="border border-gray-300 py-2">
                    {courtier?.user?.email}
                  </td>
                  <td className="border border-gray-300 py-2">
                    {courtier?.agence?.agence}
                  </td>
                  <td className="border border-gray-300 py-2">
                    {usersReducer[courtier.user_id]?.email_verified_at
                      ? new Date(
                          usersReducer[courtier.user_id].email_verified_at
                        ).toLocaleDateString("fr-FR")
                      : "Non vérifié"}
                  </td>

                  <td className="border border-gray-300 py-2">
                    {new Date(courtier.created_at).toLocaleDateString("fr-FR")}
                  </td>
                </tr>
              ))
            ) : (
              <tr className="text-center text-gray-500">
                <td colSpan={5} className="border border-gray-300 py-6">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <UserX className="h-10 w-10 text-red-500" />
                    <span>Aucun courtier trouvé</span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center space-x-1 mt-8 text-xs">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-red-500 text-white rounded disabled:opacity-50 cursor-pointer"
        >
          Précédent
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`cursor-pointer px-4 py-2 ${
              currentPage === index + 1
                ? "bg-red-500 text-white"
                : "bg-gray-200"
            } rounded`}
          >
            {index + 1}
          </button>
        ))}

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

export default AllCourtiers;
