import axios from "axios";
import { Handshake, HousePlus, ShieldUser, UsersRound } from "lucide-react";
import React, { use, useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Statistiques() {
  const CourtierTotal = useSelector(
    (state) => state.AllCourtiersReducer
  ).length;
  const UsersTotal = useSelector((state) => state.usersReducer).filter(
    (user) => user.role === "user"
  ).length;
  const BiensTotal = useSelector((state) => state.BienReducer).length;
  const [accords, setAccords] = useState([]);

  useEffect(() => {
    const AccordRes = async () => {
      try {
        const res = await axios.get("/api/get-mes-accords", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setAccords(res.data.accords);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    AccordRes();
  }, []);
  return !CourtierTotal || !UsersTotal || !BiensTotal || !accords?.length ? (
    <div className="grid grid-cols-4 gap-4 my-4 animate-pulse">
      <div className="h-25 bg-gray-300 rounded"></div>
      <div className="h-25 bg-gray-300 rounded"></div>
      <div className="h-25 bg-gray-300 rounded"></div>
      <div className="h-25 bg-gray-300 rounded"></div>
    </div>
  ) : (
    <div className="grid grid-cols-4 gap-4 my-4">
      <div className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between">
        <ShieldUser />
        <h1 className="text-sm text-gray-600 ">Total des Courtiers</h1>
        <span className="text-2xl font-bold">{CourtierTotal}</span>
      </div>
      <div className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between">
        <UsersRound />
        <h1 className="text-sm text-gray-600 ">Total des Utilisateurs</h1>
        <span className="text-2xl font-bold">{UsersTotal}</span>
      </div>
      <div className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between">
        <HousePlus />
        <h1 className="text-sm text-gray-600 ">Total des Biens</h1>
        <span className="text-2xl font-bold">{BiensTotal}</span>
      </div>
      <div className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between">
        <Handshake />
        <h1 className="text-sm text-gray-600 ">Total des Accords</h1>
        <span className="text-2xl font-bold">{accords?.length}</span>
      </div>
    </div>
  );
}

export default Statistiques;
