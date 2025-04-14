import { faArrowsRotate, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import dossierVide from "../../../assets/dossier-vide.png";

function Courtiers() {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const recentCourtiers = useSelector((state) => state.RecentCourtiers);
  const LoadinfGlobal = useSelector((state) => state.loadingReducer);

  const handleStatus = (e, id) => {
    e.preventDefault();

    const selectedStatus = e.target.value;

    toast("Est-ce que vous voulez changer le status de ce courtier ?", {
      action: {
        label: "Confirmer",
        onClick: async () => {
          setLoading(true);
          try {
            const response = await axios.post("/api/StatusCourtiers", {
              idCourtie: id,
              status: selectedStatus,
            });

            if (response.status >= 200 && response.status <= 300) {
              toast.success(response.data.message);
              dispatch({
                type: "SET_LOADING",
                payload: true,
              });
            }
          } catch (error) {
            toast.error(error?.response?.data?.message || "Erreur");
          } finally {
            setLoading(false);
          }
        },
      },
      cancel: {
        label: "Annuler",
      },
    });
  };
  return (
    <div className="w-full">
      <div className=" my-8 flex justify-between mx-8">
        <h1 className="text-xl font-bold">Les Recents Courtiers</h1>
        <button
          className="flex space-x-2 items-center cursor-pointer hover:bg-[#d3d3d3] px-2 py-1 rounded"
          onClick={() => {
            if (LoadinfGlobal) {
              toast.loading("Loading..");
            }
            dispatch({
              type: "SET_LOADING",
              payload: true,
            });
          }}
        >
          <FontAwesomeIcon icon={faArrowsRotate} />
          <span>rafraîchir</span>
        </button>
      </div>
      <div>
        <table className="w-[calc(100%-20px)] mx-auto text-center text-sm border-collapse ">
          <thead>
            <tr style={{ border: "1px solid #d3d3d3" }}>
              <th className="py-2" style={{ border: "1px solid #d3d3d3" }}>
                id
              </th>
              <th style={{ border: "1px solid #d3d3d3" }}>Nom Complet</th>
              <th style={{ border: "1px solid #d3d3d3" }}>E-mail</th>
              <th style={{ border: "1px solid #d3d3d3" }}>Nom Agence</th>
              <th style={{ border: "1px solid #d3d3d3" }}>Crée à</th>
              <th style={{ border: "1px solid #d3d3d3" }}>Status</th>
              <th style={{ border: "1px solid #d3d3d3" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {recentCourtiers &&
              recentCourtiers.map((courtier) => (
                <tr
                  key={courtier.id}
                  style={{ border: "1px solid #d3d3d3" }}
                  className="hover:bg-[#d3d3d3] cursor-pointer"
                >
                  <td className="py-2" style={{ border: "1px solid #d3d3d3" }}>
                    {courtier.id}
                  </td>
                  <td style={{ border: "1px solid #d3d3d3" }}>
                    {courtier.user.nom + " " + courtier.user.prenom}
                  </td>
                  <td style={{ border: "1px solid #d3d3d3" }}>
                    {courtier.user.email}
                  </td>
                  <td style={{ border: "1px solid #d3d3d3" }}>
                    {courtier.agence.agence}
                  </td>
                  <td style={{ border: "1px solid #d3d3d3" }}>
                    {new Date(courtier.created_at).toLocaleString()}
                  </td>
                  <td
                    style={{ border: "1px solid #d3d3d3" }}
                    className="flex justify-center items-center text-center"
                  >
                    {loading ? (
                      <div className="w-full h-full mx-auto flex justify-center items-center p-1">
                        <FontAwesomeIcon
                          icon={faSpinner}
                          className="animate-spin "
                        />
                      </div>
                    ) : (
                      <select
                        name=""
                        id=""
                        className="p-1"
                        onChange={(e) => {
                          handleStatus(e, courtier.id);
                        }}
                      >
                        <option value="pas activé">{courtier.status}</option>
                        <option value="activé">Activer</option>
                        <option value="Blocké">Blocker</option>
                      </select>
                    )}
                  </td>
                  <td style={{ border: "1px solid #d3d3d3" }}>
                    <span
                      className={` text-[#f5f3f4] rounded p-1 text-xs bg-[#ba181b]`}
                    >
                      {courtier.status}
                    </span>
                  </td>
                </tr>
              ))}
            {recentCourtiers.length === 0 && (
              <tr>
                <td colSpan={7} className="py-10">
                  <div className="w-full flex -justify-center items-center">
                    <img
                      src={dossierVide}
                      alt="vide"
                      className="h-20 mx-auto"
                    />
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Courtiers;
