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
import { Link } from "react-router-dom";
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
  const statusReducer = useSelector((state) => state.statusReducer);

  return (
    <div className="flex justify-center">
      <div className="h-[400px] w-2/3 overflow-y-auto overflow-x-scroll">
        <table className="w-[1000px] text-center text-sm">
          <thead>
            <tr className="border-b border-gray-300 py-2">
              <th className="py-2">image</th>
              <th className="py-2">#</th>
              <th>Nom Complet</th>
              <th>E-mail</th>
              <th>Status</th>
              <th>SEO</th>
              <th>Numéro biens</th>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            {courtiers.length > 0 &&
              courtiers.map((c,index) => (
                <tr>
                  <td className="py-2 flex items-center justify-center">
                    <img
                      src={c?.user?.image}
                      alt="image"
                      className="h-6 w-6 rounded-full"
                    />
                  </td>
                  <td>{c.id}</td>
                  <td>{c?.user?.nom+" "+c?.user?.prenom}</td>
                  <td>{c?.user?.email}</td>
                  <td>
                    {
                      statusReducer.find((s)=>
                        s.id === c.status_id  
                      ).nom
                    }
                  </td>
                  <td>{c.SEO}</td>
                  <td>{data[index].biens}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="w-1/3">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="biens" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default BarChartComponent;
