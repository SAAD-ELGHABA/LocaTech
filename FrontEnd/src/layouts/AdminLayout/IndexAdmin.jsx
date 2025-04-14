import React, { useEffect, useState } from "react";
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
    const fetchRecentCourtiers = async () => {
      try {
        const response = await axios.get("/api/recentCourtiers");
        if (response.status >= 200 && response.status <= 300) {
          dispatch({
            type: "GET_RECENT_COURTIERS",
            payload: response.data,
          });
        }
      } catch (error) {
        console.error("Error:", error);
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

    if (LoadinfGlobal) {
      fetchRecentCourtiers();
    }
  }, [LoadinfGlobal, dispatch]);
  return (
    <div>
      <header className="sticky top-0 w-full bg-[#d3d3d3] py-4 z-50 text-[#0b090a]">
        <NavBar />
      </header>
      <div className="flex">
        <Aside />
        <Outlet />
      </div>
    </div>
  );
}

export default IndexAdmin;
