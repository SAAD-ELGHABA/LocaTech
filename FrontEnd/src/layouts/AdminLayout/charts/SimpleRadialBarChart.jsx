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
    <div
      style={{ width: "100%", height: 300 }}
      className="flex justify-center flex-col relative"
    >
      <div>
        <div className="text-xl font-semibold flex items-center justify-between mt-20 mx-8">
          Le pourcentage des biens type maison  / villa / appartement (%)
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-4 mx-8">
        {data.map((item, index) => (
          <div key={index} className="relative">
            <ResponsiveContainer width="100%" height={300}>
              <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="40%"
                outerRadius="90%"
                barSize={15}
                data={item}
              >
                <RadialBar minAngle={15} background clockWise dataKey="uv" />
              </RadialBarChart>
            </ResponsiveContainer>
            <div
              className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center text-sm font-semibold"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <span>
                {index === 0
                  ? `${maisonPercentage}%`
                  : index === 1
                  ? `${villaPercentage}%`
                  : `${appartementPercentage}%`}
              </span>
            </div>
            <div className="absolute top-50 left-0 right-0 bottom-0 flex items-center justify-center text-sm font-semibold">
              {index === 0 ? "Maison" : index === 1 ? "Villa" : "Appartement"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
