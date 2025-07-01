import React, { useEffect } from "react";
import NavBar from "./AdminComponents/NavBar";
import Aside from "./AdminComponents/Aside";
import { Outlet } from "react-router";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { fetchCourtiers } from "../../functions/fetchCourtiers";
import { fetchAgence } from "../../functions/fetchAgence";
import { fetchAdmins } from "../../functions/fetchAdmins";
import { fetchUsers } from "../../functions/fetchUsers";

function IndexAdmin() {
  const dispatch = useDispatch();
  const LoadinfGlobal = useSelector((state) => state.loadingReducer);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const recentResponse = await axios.get("/api/recentCourtiers");
        if (recentResponse.status >= 200 && recentResponse.status <= 300) {
          dispatch({
            type: "GET_RECENT_COURTIERS",
            payload: recentResponse.data,
          });
        }
        const AssistantsResponse = await axios.get("/api/get-assistants");
        if (
          AssistantsResponse.status >= 200 &&
          AssistantsResponse.status <= 300
        ) {
          dispatch({
            type: "GET_ASSISTANTS",
            payload: AssistantsResponse.data.assistants,
          });
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Erreur lors du chargement des données.");
      } finally {
        dispatch({
          type: "SET_LOADING",
          payload: false,
        });
        setTimeout(() => {
          toast.dismiss();
        }, 2000);
      }
    };
    fetchData();
    fetchCourtiers(dispatch);
    fetchAgence(dispatch);
    fetchAdmins(dispatch);
    fetchUsers(dispatch);
  }, []);

  return (
    <div>
      <header className="sticky top-0 w-full bg-[#161a1d] z-50 text-white">
        <NavBar />
      </header>
      <div className="flex bg-white">
        <Aside />
        <div className="w-5/6 ms-[18%] m-2 p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default IndexAdmin;
