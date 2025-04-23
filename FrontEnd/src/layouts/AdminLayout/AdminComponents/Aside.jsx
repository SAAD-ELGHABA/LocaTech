import {
  BadgeCheck,
  Building2,
  ContactRound,
  Handshake,
  LayoutDashboard,
  MailPlus,
  ShieldCheck,
  Users,
} from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

function Aside({ isOpen = true }) {
  const location = useLocation();
  const recentCourtiers = useSelector((state) => state.RecentCourtiers);

  const links = [
    {
      to: "/tableau-de-bord-admin",
      icon: <LayoutDashboard className="h-4" />,
      label: "Tableau de bord",
    },
    {
      to: "/courtiers",
      icon: <Handshake className="h-4" />,
      label: "Courtiers",
    },
    {
      to: "/agences",
      icon: <Building2  className="h-4" />,
      label: "Agences",
    },
    {
      to: "/Admins",
      icon: <ShieldCheck   className="h-4" />,
      label: "Admins",
    },
    {
      to: "/assistants-admin",
      icon: <ContactRound  className="h-4" />,
      label: "Assistants",
    },
    {
      to: "/all-users",
      icon: <Users className="h-4" />,
      label: "Utilisateurs",
    },
    {
      to: "/recent-courtiers",
      icon: <MailPlus className="h-4" />,
      label: "Recent courtiers",
    },
    {
      to: "/activate-courtier",
      icon: <BadgeCheck className="h-4" />,
      label: "Activé courtiers",
    },
  ];

  return (
    <aside className="sticky h-screen w-1/6 top-0 left-0 bg-[#161a1d] text-white">
      <div className="my-4 text-center">
        <h1 className="text-lg font-semibold">Bienvenue Admin</h1>
      </div>
      <div className="w-full text-sm flex flex-col">
        {links.map((link) => {
          const isActive = location.pathname === link.to;
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
              {link.to === "/recent-courtiers" && recentCourtiers?.length > 0 && (
                <div className="rounded-full px-1 py-0.5 text-[10px] bg-red-600 text-white ml-auto">
                  {recentCourtiers.length}
                </div>
              )}
            </Link>
          );
        })}
      </div>
    </aside>
  );
}

export default Aside;
