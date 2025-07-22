import axios from "axios";
import {
  Handshake,
  HousePlus,
  ShieldUser,
  UsersRound,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function Statistiques() {
  const [accords, setAccords] = useState(null);
  const [lastMonthStats, setLastMonthStats] = useState(null);

  const CourtierTotal = useSelector(
    (state) => state.AllCourtiersReducer
  )?.length;

  const UsersTotal = useSelector((state) => state.usersReducer)?.filter(
    (user) => user.role === "user"
  )?.length;

  const BiensTotal = useSelector((state) => state.BienReducer)?.length;

  const calculateGrowth = (current, previous) => {
    if (!previous || previous === 0) return "+0%";
    const safePrevious = previous < 5 ? 5 : previous;
    const diff = ((current - safePrevious) / safePrevious) * 100;
    const sign = diff >= 0 ? "+" : "-";
    return `${sign}${Math.abs(diff).toFixed(1)}%`;
  };

  const getGrowthValue = (current, previous) => {
    if (!previous || previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };

  const formatGrowth = (value) => {
    const sign = value >= 0 ? "+" : "-";
    return `${sign}${Math.abs(value).toFixed(1)}%`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resAccords = await axios.get("/api/get-accords", {
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

  const renderCard = (icon, label, value, lastMonthValue) => {
    const loading = value === undefined || lastMonthStats === null;

    if (loading) {
      return (
        <div className="bg-gray-200 animate-pulse rounded-lg p-4 h-32"></div>
      );
    }

    const growth = getGrowthValue(value, lastMonthValue);

    return (
      <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-start">
        <div className="flex items-center justify-between w-full">
          {icon}
          <span className="text-2xl font-bold">{value}</span>
        </div>
        <h1 className="text-sm text-gray-600">{label}</h1>
        <span
          className={`text-sm ${
            growth >= 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {formatGrowth(growth)}
        </span>
      </div>
    );
  };

  return (
    <div className="grid lg:grid-cols-4 gap-4 my-4">
      {renderCard(
        <ShieldUser />,
        "Total des Courtiers",
        CourtierTotal,
        lastMonthStats?.courtier
      )}
      {renderCard(
        <UsersRound />,
        "Total des Utilisateurs",
        UsersTotal,
        lastMonthStats?.users
      )}
      {renderCard(
        <HousePlus />,
        "Total des Biens",
        BiensTotal,
        lastMonthStats?.biens
      )}
      {renderCard(
        <Handshake />,
        "Total des Accords",
        accords?.length,
        lastMonthStats?.accords
      )}
    </div>
  );
}

export default Statistiques;
