import React, { useEffect } from "react";
import { Outlet } from "react-router";
import NavBar from "./AssistantComponents/NavBar";
import Aside from "./AssistantComponents/Aside";
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
  FlagTriangleLeft,
  HandshakeIcon,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { socketListener } from "../../functions/socketListener.js";
import { promiseConversation } from "./functions/promiseConversation.js";
import AsidePhoneDevice from "../AdminLayout/AdminComponents/AsidePhoneDevice.jsx";
function AssistantIndex() {
  const dispatch = useDispatch();
  useEffect(() => {
    const promise = async () => {
      await promiseConversation(dispatch);
    };
    promise();
  }, []);

  const links = [
    {
      to: "/assistant-index",
      icon: <LayoutDashboard className="h-4" />,
      label: "Tableau de bord",
    },
    {
      to: "/control-courtiers",
      icon: <GitGraph className="h-4" />,
      label: "Contrôle les biens",
    },
    {
      to: "/all-conversations",
      icon: <MessagesSquare className="h-4" />,
      label: "Conversations",
    },
    {
      to: "/signal-control",
      icon: <FlagTriangleLeft className="h-4" />,
      label: "Signalements",
    },
    {
      to: "/accord-control",
      icon: <HandshakeIcon className="h-4" />,
      label: "Accords",
    },
  ];
  return (
    <div>
      <header className="sticky top-0 w-full bg-[#161a1d] z-50 text-white">
        <NavBar />
      </header>
      <div className="flex bg-white">
        <Aside links={links}/>
        <AsidePhoneDevice links={links} />
        <div className="w-full lg:ms-[18%] lg:w-5/6 lg:m-8 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AssistantIndex;
