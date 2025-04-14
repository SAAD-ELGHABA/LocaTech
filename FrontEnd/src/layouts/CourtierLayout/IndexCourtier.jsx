import React from "react";
import NavBar from "./CourtierComponent/NavBar";
import Aside from "./CourtierComponent/Aside";
import { Outlet } from "react-router";

function IndexCourtier() {
  return (
    <div className="relative">
      <header className="sticky top-0 w-full bg-[#d3d3d3] py-4 z-50 text-[#0b090a]">
        <NavBar />
      </header>
      <div className="flex">
        <Aside />
        <div className="w-5/6 m-2">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default IndexCourtier;
