import axios from "axios";
import { Handshake, HousePlus, ShieldUser, UsersRound } from "lucide-react";
import React, { useEffect, useState } from "react";
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
  const [lastMonthStats, setLastMonthStats] = useState({
    courtier: 0,
    users: 0,
    biens: 0,
    accords: 0,
  });

  const calculateGrowth = (current, previous) => {
    if (!previous || previous === 0) return "+0%";

    const safePrevious = previous < 5 ? 5 : previous;

    const diff = ((current - safePrevious) / safePrevious) * 100;
    const sign = diff >= 0 ? "+" : "-";
    return `${sign}${Math.abs(diff).toFixed(1)}%`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resAccords = await axios.get("/api/get-mes-accords", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setAccords(resAccords.data.accords);

        const resStats = await axios.get("/api/get-stats-last-month", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setLastMonthStats({
          courtier: resStats.data.courtiers,
          users: resStats.data.users,
          biens: resStats.data.biens,
          accords: resStats.data.accords,
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  const getGrowthValue = (current, previous) => {
    if (!previous || previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };

  const formatGrowth = (value) => {
    const sign = value >= 0 ? "+" : "-";
    return `${sign}${Math.abs(value).toFixed(1)}%`;
  };

  return !CourtierTotal || !UsersTotal || !BiensTotal || !accords?.length ? (
    <div className="grid grid-cols-4 gap-4 my-4 animate-pulse">
      <div className="h-30 bg-gray-300 rounded"></div>
      <div className="h-30 bg-gray-300 rounded"></div>
      <div className="h-30 bg-gray-300 rounded"></div>
      <div className="h-30 bg-gray-300 rounded"></div>
    </div>
  ) : (
    <div className="grid grid-cols-4 gap-4 my-4">
      <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-start">
        <div className="flex items-center justify-between w-full">
          <ShieldUser />
          <span className="text-2xl font-bold">{CourtierTotal}</span>
        </div>
        <h1 className="text-sm text-gray-600">Total des Courtiers</h1>
        {(() => {
          const growth = getGrowthValue(CourtierTotal, lastMonthStats.courtier);
          return (
            <span
              className={`text-sm ${
                growth >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {formatGrowth(growth)}
            </span>
          );
        })()}
      </div>

      <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-start">
        <div className="flex items-center justify-between w-full">
          <UsersRound />
          <span className="text-2xl font-bold">{UsersTotal}</span>
        </div>
        <h1 className="text-sm text-gray-600">Total des Utilisateurs</h1>
        {(() => {
          const growth = getGrowthValue(UsersTotal, lastMonthStats.users);
          return (
            <span
              className={`text-sm ${
                growth >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {formatGrowth(growth)}
            </span>
          );
        })()}
      </div>

      <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-start">
        <div className="flex items-center justify-between w-full">
          <HousePlus />
          <span className="text-2xl font-bold">{BiensTotal}</span>
        </div>
        <h1 className="text-sm text-gray-600">Total des Biens</h1>
        {(() => {
          const growth = getGrowthValue(BiensTotal, lastMonthStats.biens);
          return (
            <span
              className={`text-sm ${
                growth >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {formatGrowth(growth)}
            </span>
          );
        })()}
      </div>

      <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-start">
        <div className="flex items-center justify-between w-full">
          <Handshake />
          <span className="text-2xl font-bold">{accords?.length}</span>
        </div>
        <h1 className="text-sm text-gray-600">Total des Accords</h1>
        {(() => {
          const growth = getGrowthValue(accords.length, lastMonthStats.accords);
          return (
            <span
              className={`text-sm ${
                growth >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {formatGrowth(growth)}
            </span>
          );
        })()}
      </div>
    </div>
  );
}

export default Statistiques;
