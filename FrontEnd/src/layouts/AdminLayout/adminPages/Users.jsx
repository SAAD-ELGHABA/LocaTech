import { Plus, Search } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UsersModal from "../AdminComponents/Modals/UsersModal";
import { fetchUsers } from "../../../functions/fetchUsers";

function Users() {
  const usersReducer = useSelector((state) => state.usersReducer);
  const filteredUsers = usersReducer.filter((user) => user.role === "user");

  const dispatch = useDispatch();
  useEffect(() => {
    fetchUsers(dispatch);
  },[]);

  const [visibleCount, setVisibleCount] = useState(10);
  const observerRef = useRef(null);

  const visibleUsers = filteredUsers.slice(0, visibleCount);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setVisibleCount((prev) => {
            const next = prev + 10;
            return next <= filteredUsers.length ? next : prev;
          });
        }
      },
      {
        threshold: 1,
      }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [filteredUsers.length, visibleCount]);
  const [toggleModal, setToggleModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  return (
    <div className="p-4">
      {toggleModal && (
        <UsersModal
          setToggleModal={setToggleModal}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
      )}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold mb-4">Utilisateurs {usersReducer?.length}</h1>
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
          <span>Ajouter un utilisateur</span>
          <Plus className="h-5 w-5" />
        </button>
      </div>
      <table className="w-full text-sm border-collapse text-center">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 border border-gray-300">#</th>
            <th className="py-2 border border-gray-300">Nom</th>
            <th className="py-2 border border-gray-300">Email</th>
            <th className="py-2 border border-gray-300">Telephone</th>
            <th className="py-2 border border-gray-300">Crée à</th>
          </tr>
        </thead>
        <tbody>
          {visibleUsers
            .filter(
              (user) =>
                user?.nom.toLowerCase().includes(searchTerm) ||
                user?.prenom.toLowerCase().includes(searchTerm) ||
                user?.email.toLowerCase().includes(searchTerm) ||
                user?.telephone.toLowerCase().includes(searchTerm)
            )
            .map((user, index) => (
              <tr
                key={user.id}
                className="hover:bg-gray-100 cursor-pointer py-2"
                onClick={() => {
                  setToggleModal(true);
                  setSelectedUser(user?.id);
                }}
              >
                <td className="py-2 border border-gray-300">{index + 1}</td>
                <td className="py-2 border border-gray-300">
                  {user?.nom} {user?.prenom}
                </td>
                <td className="py-2 border border-gray-300">{user?.email}</td>
                <td className="py-2 border border-gray-300">
                  {user?.telephone}
                </td>
                <td className="py-2 border border-gray-300">
                  {new Date(user?.created_at).toLocaleDateString()}
                </td>
                <td className="py-2 border border-gray-300">
                  {user?.role}
                </td>
              </tr>
            ))}

          {visibleUsers.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center py-8 text-gray-400">
                Aucun utilisateur trouvé.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div ref={observerRef} className="h-10"></div>
    </div>
  );
}

export default Users;
