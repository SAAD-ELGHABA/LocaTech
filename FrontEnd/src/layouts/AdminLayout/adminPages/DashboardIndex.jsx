import React from "react";
import Statistiques from "../AdminComponents/Statistiques";
import TinyAreaChart from "../charts/TinyAreaChart.jsx";
import LineChart from "../charts/LineChart.jsx";
import BarChartComponent from "../charts/BarChart.jsx";
import StraightAnglePieChart from "../charts/StraightAnglePieChart.jsx";
import SimpleRadialBarChart from "../charts/SimpleRadialBarChart.jsx";
import { useSelector } from "react-redux";
function DashboardIndex() {
  const biens = useSelector((state) => state.BienReducer);

  return biens.length === 0 ? (
    <div className="animate-pulse h-full w-full ">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 my-4 animate-pulse">
        <div className="h-25 bg-gray-300 rounded"></div>
        <div className="h-25 bg-gray-300 rounded"></div>
        <div className="h-25 bg-gray-300 rounded"></div>
        <div className="h-25 bg-gray-300 rounded"></div>
      </div>
      <div className="flex h-96 my-8 gap-2">
        <div className="w-4/6 bg-gray-300 rounded"></div>
        <div className="w-2/6 bg-gray-300 rounded"></div>
      </div>
    </div>
  ) : (
    <div className="min-h-screen w-full flex flex-col space-y-1 ">
      <div>
        <h1 className="text-xl font-semibold">Tableau de bord</h1>
      </div>
      <div>
        <Statistiques />
      </div>
      <div className="h-[80vh] lg:h-80 my-8 flex lg:flex-row flex-col lg:gap-2 gap-12">
        <div className="w-full lg:w-2/3 lg:h-full h-1/2">
          <LineChart />
        </div>
        <div className="w-full lg:w-1/3 lg:h-full h-1/2 ">
          <StraightAnglePieChart />
        </div>
      </div>
      <div className="lg:h-80 h-[100vh] my-12 flex gap-2 ">
        <SimpleRadialBarChart />
      </div>
      <hr className="border border-gray-300" />
      <div className="lg:h-80 h-auto my-12">
        <BarChartComponent />
      </div>
    </div>
  );
}

export default DashboardIndex;
