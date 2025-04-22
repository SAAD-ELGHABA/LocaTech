import React from "react";
import { useSelector } from "react-redux";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function BarChartComponent() {
  const biens = useSelector((state) => state.BienReducer);
  const courtiers = useSelector((state) => state.AllCourtiersReducer);
  const data = courtiers.map((courtier) => {
    const count = biens.filter(
      (bien) => bien.courtier_id === courtier.id
    ).length;
    return {
      name: courtier.name,
      biens: count,
    };
  });

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="biens" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default BarChartComponent;
