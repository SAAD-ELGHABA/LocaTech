import React from "react";
import { useSelector } from "react-redux";
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from "recharts";

export default function StraightAnglePieChart() {
  const biens = useSelector((state) => state.BienReducer);

  const BienAcheter = biens.filter(
    (bien) => bien.typeAffaire === "acheter" || bien.typeAffaire === "Acheter"
  ).length;
  const BienLouer = biens.filter((bien) => bien.typeAffaire === "louer" || bien.typeAffaire === "Louer").length;

  const data = [
    { name: "Acheter", value: BienAcheter },
    { name: "Louer", value: BienLouer },
  ];

  const renderCustomLabel = ({ percent, name }) =>
    `${name}: ${(percent * 100).toFixed(1)}%`;

  return (
    <ResponsiveContainer width="100%" height={300} className={"text-sm"}>
        <div className="text-sm font-semibold flex items-center justify-between mb-4 mx-8">
            Le pourcentage des biens par type d'affaire %
        </div>
      <PieChart>
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#ef4444"
          labelLine={false}
          label={renderCustomLabel}
        />
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
