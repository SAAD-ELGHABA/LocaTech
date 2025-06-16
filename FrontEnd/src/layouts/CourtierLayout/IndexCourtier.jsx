import React from "react";
import NavBar from "./CourtierComponent/NavBar";
import Aside from "./CourtierComponent/Aside";
import { Outlet } from "react-router";
import { useSelector } from "react-redux";

function IndexCourtier() {
  const currentcourtier = useSelector((state) => state.ActuelCourtierReducer);
  
  return (
    <div className="relative">
      <header className="sticky top-0 w-full bg-[#161a1d] z-50 ">
        <NavBar />
      </header>
      <div className="flex ">
        <Aside />
        <div className="ms-[18%] w-5/6 m-2">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default IndexCourtier;
