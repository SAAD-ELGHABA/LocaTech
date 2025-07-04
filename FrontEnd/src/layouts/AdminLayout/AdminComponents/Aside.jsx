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
  Star,
  BadgePercent,
} from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

function Aside({ isOpen = true }) {
  const location = useLocation();
  const recentCourtiers = useSelector((state) => state.RecentCourtiers);
  const [isCourtierOpen, setIsCourtierOpen] = useState(false);

  const links = [
    {
      to: "/admin/tableau-de-bord-admin",
      icon: <LayoutDashboard className="h-4" />,
      label: "Tableau de bord",
    },
    {
      label: "Courtiers",
      icon: <Handshake className="h-4" />,
      isDropdown: true,
      subLinks: [
        {
          to: "/admin/courtiers",
          label: "Tous les courtiers",
        },
        {
          to: "/admin/recent-courtiers",
          label: "Courtiers récents",
          badge: recentCourtiers?.length,
        },
        {
          to: "/admin/activate-courtier",
          label: "Courtiers activés",
        },
      ],
    },
    {
      to: "/admin/agences",
      icon: <Building2 className="h-4" />,
      label: "Agences",
    },
    {
      to: "/admin/Admins",
      icon: <ShieldCheck className="h-4" />,
      label: "Admins",
    },
    {
      to: "/admin/assistants-admin",
      icon: <ContactRound className="h-4" />,
      label: "Assistants",
    },
    {
      to: "/admin/utilisateurs",
      icon: <Users className="h-4" />,
      label: "Utilisateurs",
    },
    {
      to: "/admin/evaluations",
      icon: <Star className="h-4" />,
      label: "Evaluation",
    },
    {
      to: "/admin/affaires",
      icon: <BadgePercent className="h-4" />,
      label: "Affaires",
    },
  ];

  return (
    <aside className="h-screen w-1/6 top-20 left-0 bg-[#161a1d] fixed">
      <div className="my-4 text-center">
        <h1 className="text-lg font-semibold text-white">Bienvenue Admin</h1>
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
