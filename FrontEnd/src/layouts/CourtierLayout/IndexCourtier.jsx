import React from "react";
import NavBar from "./CourtierComponent/NavBar";
import Aside from "./CourtierComponent/Aside";
import { Outlet } from "react-router";
import { useSelector } from "react-redux";
import AsidePhoneDevice from "../AdminLayout/AdminComponents/AsidePhoneDevice";
import { House, LogOut, ScrollText } from "lucide-react";
function IndexCourtier() {
  const currentcourtier = useSelector((state) => state.ActuelCourtierReducer);
  const links = [
    { to: "/courtier-index", icon: <House />, label: "Home" },
    { to: "/MesBiens", icon: <ScrollText />, label: "Mes Biens" },
  ];
  return (
    <div className="relative">
      <header className="sticky top-0 w-full bg-[#161a1d] z-50 ">
        <NavBar />
      </header>
      <div className="flex ">
        <Aside links={links} />
        <AsidePhoneDevice links={links} />

        <div className="lg:ms-[18%] lg:w-5/6  lg:m-2 w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default IndexCourtier;
