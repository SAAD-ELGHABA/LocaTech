import React from "react";
import Statistiques from "../AdminComponents/Statistiques";
import TinyAreaChart from "../charts/TinyAreaChart.jsx";
import LineChart from "../charts/LineChart.jsx";
import BarChartComponent from "../charts/BarChart.jsx";
import StraightAnglePieChart from "../charts/StraightAnglePieChart.jsx";
import SimpleRadialBarChart from "../charts/SimpleRadialBarChart.jsx";
function DashboardIndex() {
  return (
    <div className="flex flex-col space-y-4 ">
      <div>
        <h1 className="text-xl font-semibold">Tableau de bord</h1>
      </div>
      <div>
        <Statistiques />
      </div>
      <div className=" h-80 my-8 flex gap-2 ">
        <div className="w-2/3 h-full">
          <LineChart />
        </div>
        <div className="w-1/3 h-full">
          <div>
            <h1></h1>
          </div>
          <StraightAnglePieChart />
        </div>
      </div>
      <div className="h-80 my-12 flex gap-2 ">
        <SimpleRadialBarChart />
      </div>
    </div>
  );
}

export default DashboardIndex;
