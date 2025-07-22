import React, { use, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminModal from "../AdminComponents/Modals/AdminModal";
import { Plus } from "lucide-react";
import { fetchAdmins } from "../../../functions/fetchAdmins";

function Admins() {
  const admins = useSelector((state) => state.AdminsReducer);
  const [toggleModal, setToggleModal] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchAdmins(dispatch);
  }, []);
  const [selectedAdminId, setSelectedAdminId] = useState(null);
  return (
    <div className="p-4">
      {toggleModal && (
        <AdminModal
          setToggleModal={setToggleModal}
          selectedAdminId={selectedAdminId}
          setSelectedAdminId={setSelectedAdminId}
        />
      )}
      <div className=" flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">Tous les Admins</h1>
        <button
          className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors text-sm"
          onClick={() => setToggleModal(true)}
        >
          <span>Ajouter un courtier</span>
          <Plus className="h-5 w-5" />
        </button>
      </div>
      <div className="w-full overflow-auto custom-scrollbar">
        <table className="text-sm lg:w-full min-w-[1000px] text-center border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="py-2">ID</th>
              <th>Nom</th>
              <th>Email</th>
              <th>Telephone</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr
                key={admin.id}
                className="hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  setSelectedAdminId(admin?.id);
                  setToggleModal(true);
                }}
              >
                <td className="py-2">{admin.id}</td>
                <td>{admin?.user?.nom + " " + admin?.user?.prenom}</td>
                <td>{admin?.user?.email}</td>
                <td>{admin?.user?.telephone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Admins;
