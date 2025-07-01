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
    <div className="h-[50vh] flex justify-center items-center">
      <LoaderCircle className="text-red-500 h-8 w-8 animate-spin" />
    </div>
  ) : signals?.length > 0 ? (
    <div className="mx-8 my-4">
      <div>
        <div className="flex items-center space-x-2 mb-6">
          <h1 className="text-xl font-bold">Nombre de signaux</h1>
          <FlagTriangleLeft className="h-6" />
        </div>
        <table className="w-full text-center text-sm text-gray-600">
          <thead>
            <tr>
              <th>#</th>
              <th>Signaler à</th>
              <th>Par</th>
              <th>Pour</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {signals?.map((s) => (
              <tr key={s?.id}>
                <td className="py-2">{s?.id}</td>
                <td>{new Date(s?.created_at).toLocaleString()}</td>
                <td className="flex items-center space-x-2 justify-center">
                  <img
                    src={s?.user?.image}
                    alt="user-image"
                    className="h-6 w-6 rounded-full"
                  />
                  <span>{s?.user?.nom}</span>
                  <span>{s?.user?.prenom}</span>
                </td>
                <td>
                  <Link
                    to={`/bien/${s?.bien?.ville}/${s?.bien?.slag}`}
                    className="hover:text-red-500 hover:underline line-clamp-1"
                  >
                    {s?.bien?.title}
                  </Link>
                </td>
                <td className="flex justify-center items-center">
                  <button
                    className="flex items-center space-x-1 cursor-pointer hover:bg-gray-200 px-2 py-1"
                    onClick={() => {
                      setIdSignal(s?.id);
                    }}
                  >
                    <WalletCards className="h-4 w-4" />
                    <span>voir detail</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {idSignal && (
        <div
          className="fixed inset-0 bg-[#161a1d93] h-screen w-full top-0 left-0 flex items-center justify-center "
          style={{ zIndex: 1006 }}
          onClick={() => {
            setIdSignal(null);
          }}
        >
          <div className="w-[30%] h-[70%] bg-white overflow-scroll custom-scrollbar flex flex-col justify-between">
            <div className="flex flex-col justify-center items-center">
              <div className="border-b border-gray-400 p-2 ">
                <div className="flex items-center space-x-2">
                  <img
                    src={signals?.find((s) => s?.id === idSignal)?.user?.image}
                    alt="user-image"
                    className="h-16 w-16 rounded-full"
                  />
                  <div className="text-sm text-gray-600">
                    <h3 className="font-medium">
                      {signals?.find((s) => s?.id === idSignal)?.user?.nom}{" "}
                      {signals?.find((s) => s?.id === idSignal)?.user?.prenom}
                    </h3>
                    <p className="text-xs">
                      {signals?.find((s) => s?.id === idSignal)?.user?.email}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col space-y-4 mt-4 w-[90%]">
                <h1 className="border p-2 rounded border-gray-300 w-full">
                  Sujet :{" "}
                  <span className="text-lg font-medium">
                    {signals?.find((s) => s?.id === idSignal)?.subject}
                  </span>
                </h1>
                <p className="border p-2 rounded border-gray-300 min-h-[100px] w-full">
                  precision :{" "}
                  {signals?.find((s) => s?.id === idSignal)?.precision}
                </p>
                <Link
                  to={`/bien/${
                    signals?.find((s) => s?.id === idSignal)?.bien?.ville
                  }/${signals?.find((s) => s?.id === idSignal)?.bien?.slag}`}
                  className="hover:text-red-500 hover:underline line-clamp-1 flex items-center space-x-2"
                >
                  <Telescope />
                  <span>Voir le bien</span>
                </Link>
              </div>
            </div>
            <div className="text-xs text-gray-400 w-full text-end">
              {new Date(
                signals?.find((s) => s?.id === idSignal)?.created_at
              ).toLocaleString()}
            </div>
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
