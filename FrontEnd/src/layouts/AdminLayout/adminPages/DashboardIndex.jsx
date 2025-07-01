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
      <div className="grid grid-cols-4 gap-4 my-4 animate-pulse">
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
    <div className="flex flex-col space-y-1 ">
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
      <hr className="border border-gray-300" />
      <div className="h-80 my-12">
        <BarChartComponent />
      </div>
    </div>
  );
}

export default DashboardIndex;
