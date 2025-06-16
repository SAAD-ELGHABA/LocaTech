import axios from "axios";
import { ChartCandlestick, Telescope, TrendingUp } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

function MesProcessAccord({ isAssistant = false }) {
  const dispatch = useDispatch();
  const [accords, setAccords] = useState([]);

  useEffect(() => {
    const AccordRes = async () => {
      try {
        const res = await axios.get("/api/get-mes-accords", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setAccords(res.data.accords);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    AccordRes();
  }, []);

  return (
    <div>
      <div>
        {!isAssistant && (
          <div className="mx-8 my-4 flex space-x-2 items-center">
            <ChartCandlestick className="h-6 w-6" />
            <h1 className="text-xl font-semibold ">Mes processus</h1>
          </div>
        )}

        {accords.length > 0 ? (
          <div className="overflow-x-auto mx-8">
            <table className="w-full text-center border border-purple-200 shadow-md rounded-lg">
              <thead>
                <tr className="">
                  <th className="py-2 px-4">#</th>
                  <th className="py-2 px-4">Client</th>
                  <th className="py-2 px-4">Statut</th>
                  <th className="py-2 px-4">Bien</th>
                  <th className="py-2 px-4">Date</th>
                </tr>
              </thead>
              <tbody>
                {accords.map((accord, index) => (
                  <tr
                    key={index}
                    className="border-t border-gray-200 hover:bg-purple-50"
                  >
                    <td className="py-2 px-4">{index + 1}</td>
                    <td className="py-2 px-4">
                      <div className="flex items-center space-x-2 justify-center">
                        <img
                          src={accord?.user?.image}
                          alt="client-image"
                          className="h-7 w-7 rounded-full"
                        />
                        <span>
                          {accord?.user?.nom + " " + accord?.user?.prenom ||
                            "N/A"}
                        </span>
                      </div>
                    </td>
                    <td
                      className={`py-2 px-4 flex items-center justify-center space-x-2
                      ${
                        accord?.status === "accepted"
                          ? "text-green-500"
                          : accord?.status === "rejected"
                          ? "text-red-500"
                          : "text-yellow-500"
                      }
                      `}
                    >
                      <TrendingUp
                        className={`${
                          accord?.status === "accepted"
                            ? "rotate-0"
                            : accord?.status === "rejected"
                            ? "rotate-180"
                            : "none"
                        }`}
                      />
                      <span>{accord?.status || "En attente"}</span>
                    </td>
                    <td>
                      <Link
                        className="flex items-center space-x-2 justify-center hover:text-red-500 hover:underline"
                        to={`/bien/${accord?.bien?.ville}/${accord?.bien?.slag}`}
                      >
                        <Telescope className="h-4 w-4" />
                        <span>{accord?.bien?.title}</span>
                      </Link>
                    </td>
                    <td className="py-2 px-4">
                      {new Date(accord?.created_at).toLocaleDateString("fr-FR")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center my-8 text-gray-500">
            Aucun accord trouvé.
          </div>
        )}
      </div>
    </div>
  );
}

export default MesProcessAccord;
