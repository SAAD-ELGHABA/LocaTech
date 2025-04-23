import React, { useEffect } from "react";
import NavBar from "./AdminComponents/NavBar";
import Aside from "./AdminComponents/Aside";
import { Outlet } from "react-router";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

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


        const adminsResponse = await axios.get("/api/get-admins");
        if (adminsResponse.status >= 200 && adminsResponse.status <= 300) {
          dispatch({
            type: "GET_ADMINS",
            payload: adminsResponse.data.admins,
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

  }, []);

  return (
    <div>
      <header className="sticky top-0 w-full bg-[#161a1d] z-50 text-white">
        <NavBar />
      </header>
      <div className="flex bg-white">
        <Aside />
        <div className="w-5/6 m-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default IndexAdmin;
