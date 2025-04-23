import React from "react";
import { Outlet } from "react-router";
import NavBar from "./AssistantComponents/NavBar";
import Aside from "./AssistantComponents/Aside";

function AssistantIndex() {
  return (
    <div>
      <header className="sticky top-0 w-full bg-[#161a1d] py-4 z-50 text-white">
        <NavBar />
      </header>
      <div className="flex bg-white">
        <Aside />
        <div className="w-5/6 m-8 h-screen">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AssistantIndex;
