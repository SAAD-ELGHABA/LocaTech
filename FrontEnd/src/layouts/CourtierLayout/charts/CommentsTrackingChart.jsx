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

function CommentsTrackingChart({ comments }) {
  const chartData = comments.map((comment, index) => {
    const date = new Date(comment.created_at);
    return {
      name: date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      rating: comment?.rating,
      timestamp: comment.created_at,
    };
  });

  chartData.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

  return (
    <div className="w-[50%] h-[50%]">
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
            dataKey="rating"
            stroke="red"
            fill="#e5383b"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CommentsTrackingChart;
