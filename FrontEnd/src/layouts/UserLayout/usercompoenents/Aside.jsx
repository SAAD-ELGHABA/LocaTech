import { HelpCircle, Settings, User } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";


function Aside() {
  const user = useSelector((state) => state.userReducer.userInfo);

  const Links = [
    {
      icon: <User className="w-5 h-5" />,
      to: "/profile-client",
      label: "Profile",
    },
    {
      icon: <Settings className="w-5 h-5" />,
      to: "/parametre-client",
      label: "Parametre",
    },
    {
      icon: <HelpCircle className="w-5 h-5" />,
      to: "/centre-aide",
      label: "Centre d'aide",
    },
  ];
  const location = useLocation();

  return (
    <div className="w-full lg:w-[20%] hidden lg:block border-r border-gray-300 bg-gray-50">
      <div className="mx-4 my-4 flex flex-col space-y-4">
        <div className="flex flex-col justify-center items-center">
          <img
            src={user?.image || "/profile-icon.png"}
            alt="profile"
            className="rounded-full w-20 h-20 object-cover border border-gray-300"
          />
          <div>
            <h3>{user?.nom + " " + user?.prenom}</h3>
          </div>
          <span className="text-gray-500 text-xs font-medium">
            {user?.email}
          </span>
        </div>
      </div>
      <ul className="space-y-4 p-4 ps-12 mt-4">
        {Links.map((l, index) => (
          <li key={index}>
            <Link
              to={l.to}
              className={`flex items-center gap-2 hover:text-red-600 ${
                location.pathname === l.to && "text-red-500"
              }`}
            >
              {l.icon}
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Aside;
