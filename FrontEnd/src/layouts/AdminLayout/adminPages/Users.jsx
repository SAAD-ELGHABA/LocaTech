import { UserPlus, UserX } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";

function Users() {
  const usersReducer = useSelector((state) => state.usersReducer);
  const filteredUsers = usersReducer.filter((user) => user.role === "user");

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Get pagination range (3 pages max)
  const getPaginationRange = () => {
    const maxVisiblePages = 3;
    let start = Math.max(currentPage - 1, 1);
    let end = Math.min(start + maxVisiblePages - 1, totalPages);

    if (end - start < maxVisiblePages - 1) {
      start = Math.max(end - maxVisiblePages + 1, 1);
    }

    const range = [];
    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    return range;
  };

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex justify-between items-center text-xl font-bold mb-4">
        <h1>Tous les utilisateurs</h1>
        <UserPlus className="h-6 w-6 text-green-600 cursor-pointer" />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-center border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 py-2">#</th>
              <th className="border border-gray-300 py-2">Nom Complet</th>
              <th className="border border-gray-300 py-2">E-mail</th>
              <th className="border border-gray-300 py-2">Téléphone</th>
              <th className="border border-gray-300 py-2">Créé le</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-gray-100 transition cursor-pointer"
                >
                  <td className="border border-gray-300 py-2">{user.id}</td>
                  <td className="border border-gray-300 py-2">
                    {user.nom} {user.prenom}
                  </td>
                  <td className="border border-gray-300 py-2">{user.email}</td>
                  <td className="border border-gray-300 py-2">
                    {user.telephone}
                  </td>
                  <td className="border border-gray-300 py-2">
                    {new Date(user.created_at).toLocaleDateString("fr-FR")}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="border py-6 text-gray-500">
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <UserX className="h-10 w-10 text-red-500" />
                    <span>Aucun utilisateur trouvé</span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center items-center space-x-2 mt-6 text-xs">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-red-500 text-white rounded disabled:opacity-50"
        >
          Précédent
        </button>

        {getPaginationRange().map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-4 py-2 rounded ${
              currentPage === page
                ? "bg-red-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-red-500 text-white rounded disabled:opacity-50"
        >
          Suivant
        </button>
      </div>
    </div>
  );
}

export default Users;
