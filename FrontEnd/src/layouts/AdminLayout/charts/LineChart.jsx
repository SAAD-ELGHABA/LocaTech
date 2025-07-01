import React, { use } from "react";
import { useSelector } from "react-redux";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function DashboardIndex() {
  const biens = useSelector((state) => state.BienReducer);
  const mois = [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ];

  const data = Array(12)
    .fill(0)
    .map((_, index) => {
      const biensInMonth = biens.filter((bien) => {
        const date = new Date(bien.created_at);
        return date.getMonth() === index;
      }).length;

      return {
        month: mois[index],
        biens: biensInMonth,
      };
    });

  return biens.length === 0 ? (
    <div className="animate-pulse h-full w-full bg-gray-300"></div>
  ) : (
    <ResponsiveContainer width="100%" height="100%" className={"text-xs"}>
      <div className="text-xl font-semibold flex items-center justify-between mb-4 mx-8">
        Les Biens Crées Par Mois
      </div>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="biens"
          stroke="#ef4444"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default DashboardIndex;
