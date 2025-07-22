import axios from "axios";
import {
  Ban,
  FlagTriangleLeft,
  LoaderCircle,
  Telescope,
  WalletCards,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function SignalControl() {
  const [signals, setSignals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [idSignal, setIdSignal] = useState(null);
  const fetchSignals = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`/api/get-signals`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setSignals(res?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchSignals();
  }, []);
  return isLoading ? (
    <div className="min-h-screen flex justify-center items-center">
      <LoaderCircle className="text-red-500 h-8 w-8 animate-spin" />
    </div>
  ) : signals?.length > 0 ? (
    <div className="px-2 lg:mx-8 my-4 w-[95vw] lg:w-full overflow-hidden min-h-screen">
      <div>
        <div className="flex items-center space-x-2 mb-6">
          <h1 className="text-lg md:text-xl font-bold">Nombre de signaux</h1>
          <FlagTriangleLeft className="h-5 md:h-6" />
        </div>

        <div className="overflow-x-auto ">
          <table className="w-full text-center text-sm text-gray-600 min-w-[600px]">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-2 px-1">#</th>
                <th className="py-2 px-1">Signaler à</th>
                <th className="py-2 px-1">Par</th>
                <th className="py-2 px-1">Pour</th>
                <th className="py-2 px-1">Détails</th>
              </tr>
            </thead>
            <tbody>
              {signals?.map((s) => (
                <tr key={s?.id} className="border-b border-gray-300">
                  <td className="py-2 px-1">{s?.id}</td>
                  <td className="px-1">
                    {new Date(s?.created_at).toLocaleString()}
                  </td>
                  <td className="px-1">
                    <div className="flex items-center space-x-2 justify-center">
                      <img
                        src={s?.user?.image}
                        alt="user"
                        className="h-6 w-6 rounded-full object-cover"
                      />
                      <span className="whitespace-nowrap">{s?.user?.nom}</span>
                      <span className="whitespace-nowrap">
                        {s?.user?.prenom}
                      </span>
                    </div>
                  </td>
                  <td className="px-1 max-w-[150px] truncate">
                    <Link
                      to={`/bien/${s?.bien?.ville}/${s?.bien?.slag}`}
                      className="hover:text-red-500 hover:underline"
                    >
                      {s?.bien?.title}
                    </Link>
                  </td>
                  <td className="px-1">
                    <button
                      className="flex items-center space-x-1 hover:bg-gray-200 px-2 py-1 rounded mx-auto"
                      onClick={() => setIdSignal(s?.id)}
                    >
                      <WalletCards className="h-4 w-4" />
                      <span className="text-xs">Voir détail</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {idSignal && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center px-4 z-[1006] animate-fade-in"
          onClick={() => setIdSignal(null)}
        >
          <div
            className="bg-white rounded-xl shadow-lg w-full max-w-xl md:max-w-2xl max-h-[80vh] overflow-y-auto p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-4 border-b pb-4 mb-4">
              <img
                src={signals?.find((s) => s?.id === idSignal)?.user?.image}
                alt="user"
                className="h-16 w-16 rounded-full object-cover border border-gray-300"
              />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {signals?.find((s) => s?.id === idSignal)?.user?.nom}{" "}
                  {signals?.find((s) => s?.id === idSignal)?.user?.prenom}
                </h3>
                <p className="text-sm text-gray-500">
                  {signals?.find((s) => s?.id === idSignal)?.user?.email}
                </p>
              </div>
            </div>

            <div className="space-y-5 text-gray-700">
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <span className="font-medium block text-sm text-gray-500 mb-1">
                  Sujet :
                </span>
                <p className="text-base font-semibold text-gray-800">
                  {signals?.find((s) => s?.id === idSignal)?.subject}
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 min-h-[120px]">
                <span className="font-medium block text-sm text-gray-500 mb-1">
                  Précision :
                </span>
                <p className="text-sm leading-relaxed">
                  {signals?.find((s) => s?.id === idSignal)?.precision}
                </p>
              </div>

              <Link
                to={`/bien/${
                  signals?.find((s) => s?.id === idSignal)?.bien?.ville
                }/${signals?.find((s) => s?.id === idSignal)?.bien?.slag}`}
                className="inline-flex items-center gap-2 text-red-600 hover:text-red-500 text-sm font-medium transition-colors"
              >
                <Telescope className="h-4 w-4" />
                <span>Voir le bien associé</span>
              </Link>
            </div>

            <div className="text-end text-xs text-gray-400 mt-6 border-t pt-3">
              {new Date(
                signals?.find((s) => s?.id === idSignal)?.created_at
              ).toLocaleString()}
            </div>

            <button
              onClick={() => setIdSignal(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
              title="Fermer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  ) : (
    <div className="h-[50vh] flex justify-center items-center">
      <Ban />
    </div>
  );
}

export default SignalControl;
