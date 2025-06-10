import { faHouse, faScroll } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Aside({ isOpen = true }) {
  const links = [
    { to: "/courtier-index", icon: faHouse, label: "Home" },
    { to: "/MesBiens", icon: faScroll, label: "Mes Biens" },
    //   { to: "/courtiers", icon: faHandshake, label: "Recent Courtiers" },
  ];
  const recentCourtiers = useSelector((state) => state.RecentCourtiers);
  const location = useLocation();
  const currentCourtier = useSelector((state) => state.ActuelCourtierReducer);

  return (
    <aside className="h-screen w-1/6 top-20 left-0 bg-[#161a1d] fixed">
      <div className="my-4 text-center">
        <h1 className="text-sm font-medium text-white">
          Bienvenue{" "}
          <span className="text-red-500">
            {currentCourtier?.user?.nom + " " + currentCourtier?.user?.prenom}
          </span>
        </h1>
      </div>
      <div className="w-full text-sm flex flex-col">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`w-full px-4 py-2  flex items-center space-x-2 cursor-pointer ${
              location.pathname === link.to
                ? "bg-white text-[#0b090a]"
                : "hover:bg-white hover:text-[#0b090a] text-white"
            }`}
            style={{ width: "100%" }}
          >
            {recentCourtiers && link.to === "/courtiers" ? (
              <div className="flex space-x-2 items-center">
                <div className="flex space-x-2 items-center">
                  <FontAwesomeIcon
                    icon={link.icon}
                    className="text-[#0b090a]"
                  />
                  {isOpen && (
                    <span className="text-[#0b090a]">{link.label}</span>
                  )}
                </div>
                <div className="rounded-full px-1 text-xs text-[#f5f3f4] bg-[#ba181b]">
                  {recentCourtiers.length}
                </div>
              </div>
            ) : (
              <div className="flex space-x-2 items-center">
                <FontAwesomeIcon icon={link.icon} />
                {isOpen && <span>{link.label}</span>}
              </div>
            )}
          </Link>
        ))}
      </div>
    </aside>
  );
}

export default Aside;
