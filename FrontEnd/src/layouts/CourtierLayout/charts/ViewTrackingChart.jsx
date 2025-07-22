import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function ViewTrackingChart({ views }) {
  const chartData = views.map((view, index) => {
    const date = new Date(view.created_at);
    return {
      name: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      views: index + 1,
      timestamp: view.created_at,
    };
  });

  chartData.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

  return (
    <div className="lg:w-[50%] w-full h-[50%]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="views"
            stroke="red"
            fill="#e5383b"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ViewTrackingChart;
