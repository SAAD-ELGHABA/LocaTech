import React from "react";
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

function ViewTrackingChart({ views }) {
  // Transform your views data into the format Recharts expects
  const chartData = views.map((view, index) => {
    // Extract the date part from the timestamp
    const date = new Date(view.created_at);
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });

    return {
      name: formattedDate,
      views: index + 1, // This assumes each view increments the count
      // If you have actual view counts per day, you should group by date first
      timestamp: view.created_at,
    };
  });

  // If you want to group views by day (more realistic for a time series)
  const viewsByDate = views.reduce((acc, view) => {
    const date = new Date(view.created_at).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = 0;
    }
    acc[date]++;
    return acc;
  }, {});

  const groupedChartData = Object.entries(viewsByDate).map(([date, count]) => {
    const formattedDate = new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
    return {
      name: formattedDate,
      views: count,
      date: date,
    };
  });

  // Sort by date (oldest first)
  groupedChartData.sort((a, b) => new Date(a.date) - new Date(b.date));

  return (
    <div className="w-full h-full border-s border-b border-gray-400">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={300}
          height={100}
          data={groupedChartData} // Use the transformed data
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="views"
            stroke="#8884d8"
            strokeWidth={2}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ViewTrackingChart;
