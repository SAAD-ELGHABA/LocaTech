import React, { useEffect } from "react";
import NavBar from "./AdminComponents/NavBar";
import Aside from "./AdminComponents/Aside";
import { Outlet } from "react-router";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { fetchCourtiers } from "../../functions/fetchCourtiers";
import { fetchAgence } from "../../functions/fetchAgence";
import { fetchAdmins } from "../../functions/fetchAdmins";
import { fetchUsers } from "../../functions/fetchUsers";
import { LoaderCircle } from "lucide-react";
import AsidePhoneDevice from "./AdminComponents/AsidePhoneDevice";
import {
  PanelRightClose,
  LayoutDashboard,
  Handshake,
  Building2,
  ShieldCheck,
  ContactRound,
  Users,
  Star,
  BadgePercent,
  PanelRightOpen,
  Newspaper,
} from "lucide-react";
function IndexAdmin({recentCourtiers = []}) {
  const dispatch = useDispatch();
  const LoadinfGlobal = useSelector((state) => state.loadingReducer);
  const user = useSelector((state) => state.userReducer.userInfo);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const recentResponse = await axios.get("/api/recentCourtiers");
        if (recentResponse.status >= 200 && recentResponse.status <= 300) {
          dispatch({
            type: "GET_RECENT_COURTIERS",
            payload: recentResponse.data,
          });
        }
        const AssistantsResponse = await axios.get("/api/get-assistants");
        if (
          AssistantsResponse.status >= 200 &&
          AssistantsResponse.status <= 300
        ) {
          dispatch({
            type: "GET_ASSISTANTS",
            payload: AssistantsResponse.data.assistants,
          });
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Erreur lors du chargement des données.");
      } finally {
        dispatch({
          type: "SET_LOADING",
          payload: false,
        });
        setTimeout(() => {
          toast.dismiss();
        }, 2000);
      }
    };
    fetchData();
    fetchCourtiers(dispatch);
    fetchAgence(dispatch);
    fetchAdmins(dispatch);
    fetchUsers(dispatch);
  }, []);

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
      key: "courtiers",
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
      label: "Évaluation",
    },
    {
      to: "/admin/affaires",
      icon: <BadgePercent className="h-4" />,
      label: "Affaires",
    },
    {
      to: "/admin/blog-posts",
      icon: <Newspaper className="h-4" />,
      label: "Articles de blog",
    },
  ];

  return !user?.id ? (
    <div className="min-h-screen flex items-center justify-center">
      <LoaderCircle className="h-8 w-8 animate-spin" />
    </div>
  ) : (
    <div>
      <header className="sticky top-0 w-full bg-[#161a1d] z-50 text-white lg:pt-0 pt-2">
        <NavBar />
      </header>
      <div className="flex bg-white">
        <Aside />
        <AsidePhoneDevice links={links}/>
        <div className="w-full lg:w-5/6 lg:ms-[18%] lg:m-2 p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default IndexAdmin;
