import React, { useState } from "react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { ChartNoAxesCombined } from "lucide-react";

// Dummy data - replace with your real conversation array
// eslint-disable-next-line react-hooks/rules-of-hooks

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// Data aggregators
const groupByCourtier = (data) =>
  data.reduce((acc, curr) => {
    const existing = acc.find((item) => item.name === curr.courtierId);
    if (existing) existing.total += 1;
    else acc.push({ name: curr.courtierId, total: 1 });
    return acc;
  }, []);

const groupByDay = (data) =>
  data.reduce((acc, curr) => {
    const day = dayjs(curr.createdAt).format("YYYY-MM-DD");
    const existing = acc.find((item) => item.name === day);
    if (existing) existing.total += 1;
    else acc.push({ name: day, total: 1 });
    return acc;
  }, []);

const groupByBien = (data) =>
  data.reduce((acc, curr) => {
    const existing = acc.find((item) => item.name === curr.BienId);
    if (existing) existing.total += 1;
    else acc.push({ name: curr.BienId, total: 1 });
    return acc;
  }, []);

const groupByStatus = (data) =>
  data.reduce((acc, curr) => {
    const existing = acc.find((item) => item.name === curr.status);
    if (existing) existing.value += 1;
    else acc.push({ name: curr.status, value: 1 });
    return acc;
  }, []);

const ConversationDashboard = () => {
  const conversations = useSelector((state) => state.allConversationsReducer);

  const [view, setView] = useState("courtier");

  const chartData = {
    courtier: groupByCourtier(conversations),
    day: groupByDay(conversations),
    bien: groupByBien(conversations),
    status: groupByStatus(conversations),
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4 flex items-center space-x-2">
        <ChartNoAxesCombined className="h-6 w-6" />
        <span>Statistiques des Conversations entre Courtiers et Clients</span>
      </h2>

      <div className="flex space-x-2 mb-4 text-sm">
        <button
          onClick={() => setView("courtier")}
          className={`px-3 py-2 rounded ${
            view === "courtier" ? "bg-red-500 text-white" : "bg-gray-200"
          }`}
        >
          Par Courtier
        </button>
        <button
          onClick={() => setView("day")}
          className={`px-3 py-2 rounded ${
            view === "day" ? "bg-red-500 text-white" : "bg-gray-200"
          }`}
        >
          Par Jour
        </button>
        <button
          onClick={() => setView("bien")}
          className={`px-3 py-2 rounded ${
            view === "bien" ? "bg-red-500 text-white" : "bg-gray-200"
          }`}
        >
          Par Bien
        </button>
        <button
          onClick={() => setView("status")}
          className={`px-3 py-2 rounded ${
            view === "status" ? "bg-red-500 text-white" : "bg-gray-200"
          }`}
        >
          Par Statut
        </button>
      </div>

      <div className="w-full h-[400px] bg-white rounded shadow p-4">
        <ResponsiveContainer width="100%" height="100%">
          {view !== "status" ? (
            <BarChart data={chartData[view]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <ReferenceLine y={0} stroke="#000" />
              <Bar dataKey="total" fill="#8884d8" />
            </BarChart>
          ) : (
            <PieChart>
              <Pie
                data={chartData.status}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                label
              >
                {chartData.status.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          )}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ConversationDashboard;
