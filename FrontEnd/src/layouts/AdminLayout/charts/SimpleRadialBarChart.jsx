import React from "react";
import { useSelector } from "react-redux";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";

export default function MaisonRadialChart() {
  const biens = useSelector((state) => state.BienReducer);

  const maisonCount = biens.filter((bien) => bien.type === "maison").length;
  const villaCount = biens.filter((bien) => bien.type === "villa").length;
  const appartementCount = biens.filter(
    (bien) => bien.type === "appartement"
  ).length;
  const total = biens.length;
  const maisonPercentage =
    total > 0 ? parseFloat(((maisonCount / total) * 100).toFixed(2)) : 0;
  const villaPercentage =
    total > 0 ? parseFloat(((villaCount / total) * 100).toFixed(2)) : 0;
  const appartementPercentage =
    total > 0 ? parseFloat(((appartementCount / total) * 100).toFixed(2)) : 0;

  const data = [
    [
      {
        name: "Maison",
        uv: maisonPercentage,
        fill: "#ef4444",
      },
      {
        name: "Autres",
        uv: 100 - maisonPercentage,
        fill: "white",
      },
    ],
    [
      {
        name: "Villa",
        uv: villaPercentage,
        fill: "#ef4444",
      },
      {
        name: "Autres",
        uv: 100 - villaPercentage,
        fill: "white",
      },
    ],
    [
      {
        name: "Appartement",
        uv: appartementPercentage,
        fill: "#ef4444",
      },
      {
        name: "Autres",
        uv: 100 - appartementPercentage,
        fill: "white",
      },
    ],
  ];

  return (
    <div className="w-full my-10 px-4">
      <h2 className="text-lg md:text-xl font-semibold text-center mb-6">
        Le pourcentage des biens : Maison / Villa / Appartement (%)
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {data.map((item, index) => {
          const percentage =
            index === 0
              ? maisonPercentage
              : index === 1
              ? villaPercentage
              : appartementPercentage;

          const label =
            index === 0 ? "Maison" : index === 1 ? "Villa" : "Appartement";

          return (
            <div key={index} className="flex flex-col items-center">
              <div className="relative w-full h-[200px] sm:h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadialBarChart
                    cx="50%"
                    cy="50%"
                    innerRadius="40%"
                    outerRadius="90%"
                    barSize={15}
                    data={item}
                  >
                    <RadialBar
                      minAngle={15}
                      background
                      clockWise
                      dataKey="uv"
                    />
                  </RadialBarChart>
                </ResponsiveContainer>

                <div className="absolute inset-0 flex items-center justify-center text-base font-bold text-gray-800">
                  {percentage}%
                </div>
              </div>

              <p className=" text-sm font-medium text-gray-600">{label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
