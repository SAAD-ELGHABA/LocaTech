import {
  BadgeCheck,
  Building2,
  ContactRound,
  Handshake,
  LayoutDashboard,
  MailPlus,
  ShieldCheck,
  Users,
  ChevronDown,
  ChevronRight,
  MessagesSquare,
  GitGraph,
} from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

function Aside({ isOpen = true }) {
  const location = useLocation();
  const recentCourtiers = useSelector((state) => state.RecentCourtiers);
  const [isCourtierOpen, setIsCourtierOpen] = useState(false);
    const user = useSelector((state) => state.userReducer.userInfo);
  
  const links = [
    {
      to: "/tableau-de-bord-assistant",
      icon: <LayoutDashboard className="h-4" />,
      label: "Tableau de bord",
    },
    {
      to: "/control-courtiers",
      icon: <GitGraph className="h-4" />,
      label: "Contrôle les courtiers",
    },
    {
      to: "/all-conversations",
      icon: <MessagesSquare className="h-4"/>,
      label: "Conversations",
    },
  ];

  return (
    <aside className="h-screen w-1/6 top-20 left-0 bg-[#161a1d] fixed text-white">
      <div className="my-4 text-center">
        <h1 className="text-xs font-semibold mx-1"><span className="font-light">Bienvenue</span> {user.nom+" "+user.prenom}</h1>
      </div>
      <div className="w-full text-sm flex flex-col">
        {links.map((link) => {
          const isActive = location.pathname === link.to;

          if (link.isDropdown) {
            return (
              <div key={link.label} className="w-full">
                <div
                  onClick={() => setIsCourtierOpen(!isCourtierOpen)}
                  className={`w-full px-4 py-2 flex justify-between items-center cursor-pointer transition-colors duration-150 ${
                    isCourtierOpen
                      ? "bg-[#2b2b2b] text-white"
                      : "hover:bg-[#2b2b2b] text-white"
                  }`}
                >
                  <div className="flex space-x-2 items-center">
                    {link.icon}
                    {isOpen && <span>{link.label}</span>}
                  </div>
                  {isOpen &&
                    (isCourtierOpen ? (
                      <ChevronDown className="h-4" />
                    ) : (
                      <ChevronRight className="h-4" />
                    ))}
                </div>
                {isCourtierOpen && (
                  <div className="ml-6 flex flex-col space-y-1 mt-1">
                    {link.subLinks.map((sub) => {
                      const isSubActive = location.pathname === sub.to;
                      return (
                        <Link
                          key={sub.to}
                          to={sub.to}
                          className={`flex justify-between items-center px-4 py-1.5 text-sm rounded transition-colors ${
                            isSubActive
                              ? "bg-white text-[#161a1d]"
                              : "text-white hover:bg-[#2b2b2b]"
                          }`}
                        >
                          <span>{sub.label}</span>
                          {sub.badge > 0 && (
                            <span className="text-[10px] bg-red-600 text-white px-2 py-0.5 rounded-full ml-2">
                              {sub.badge}
                            </span>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          }

          return (
            <Link
              key={link.to}
              to={link.to}
              className={`w-full px-4 py-2 flex items-center space-x-2 cursor-pointer transition-colors duration-150 ${
                isActive
                  ? "bg-white text-[#161a1d]"
                  : "hover:bg-[#2b2b2b] text-white"
              }`}
            >
              <div className="flex space-x-2 items-center">
                {link.icon}
                {isOpen && <span>{link.label}</span>}
              </div>
            </Link>
          );
        })}
      </div>
    </aside>
  );
}

export default Aside;
