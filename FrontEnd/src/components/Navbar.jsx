import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaPlusCircle, FaSearch, FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import { toast } from "sonner";
import Logo from "./Logo";
import Favoris from "./Favoris";
import logoUser from "../assets/logo-user.png";
import { fetchInitialData } from "../functions/fetchInitialData";
import { socketListener } from "../functions/socketListener";
import { fetchConversations } from "../functions/fetchConversations";
import Notifications from "./Notifications";
import { motion } from "framer-motion";
import LogoutModal from "./LogoutModal";
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showFavoris, setShowFavoris] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = useSelector((state) => state.notificationsReducer);
  const currentCourtier = useSelector((state) => state.ActuelCourtierReducer);
  const conversations = useSelector((state) => state.conversationsReducer);
  const user = useSelector((state) => state.userReducer.userInfo);

  const userId =
    user?.role === "user"
      ? user?.id
      : user?.role === "courtier"
      ? currentCourtier?.id
      : 0;
  const unreadConversations =
    conversations?.length > 0 &&
    conversations?.filter(
      (cnv) =>
        cnv.isRead === false &&
        Number(cnv.messages?.slice(-1)[0]?.senderId) !== userId
    );
  useEffect(() => {
    const getConversations = async () => {
      await fetchConversations(userId, dispatch);
    };

    getConversations();
  }, []);

  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = socketListener(dispatch, userId);
    return () => {
      unsubscribe();
    };
  }, [userId]);
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const FavorisReducer = useSelector((state) => state.FavorisReducer);

  const MySwal = withReactContent(Swal);
  const isHomepage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const [isLoggingOut, setIsLoggingOut] = useState(false);


  const loc = useLocation();
  return (
    <div className="relative">
      <nav
        className={`fixed w-full top-0 left-0 z-50 px-4 md:px-6 transition-all duration-300 ${
          !(isHomepage && !isScrolled)
            ? "bg-white shadow-md"
            : "bg-transparent "
        }`}
        style={{ zIndex: 1000 }}
      >
        <div className="flex md:flex-row justify-between items-center ">
          <Logo />

          <div className="lg:flex items-center gap-5 text-sm font-medium overflow-x-auto whitespace-nowrap hidden ">
            <Link
              to="/acheter"
              className={`${
                loc.pathname === "/acheter" ? "text-red-500" : "text-black"
              }
              hover:text-red-500
              `}
            >
              Acheter
            </Link>
            <Link
              to="/louer"
              className={`${
                loc.pathname === "/louer" ? "text-red-500" : "text-black"
              }
              hover:text-red-500
              `}
            >
              Louer
            </Link>
            <Link
              to="/Apropos"
              className={`${
                loc.pathname === "/Apropos" ? "text-red-500" : "text-black"
              }
              hover:text-red-500
              `}
            >
              A propos
            </Link>
            <Link
              to="/blog"
              className={`${
                loc.pathname === "/blog" ? "text-red-500" : "text-black"
              }
              hover:text-red-500
              `}
            >
              Blog
            </Link>
            <Link
              to="/contactUs"
              className={`${
                loc.pathname === "/contactUs" ? "text-red-500" : "text-black"
              }
              hover:text-red-500
              `}
            >
              Contactez-nous
            </Link>

            {user?.role === "courtier" && (
              <Link
                to="/block"
                className="bg-[#F44336] text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-red-600 transition"
              >
                <FaPlusCircle />
                <span>Déposer une annonce</span>
              </Link>
            )}
          </div>

          {user ? (
            <div className="relative text-sm" ref={dropdownRef}>
              <button
                onClick={() => setShowDropdown((prev) => !prev)}
                className={`border border-red-500 text-red-500 px-4 py-2 rounded-full flex items-center gap-2 hover:bg-red-100 transition cursor-pointer ${
                  showDropdown && user && "bg-white"
                }`}
              >
                <img
                  src={user.image || logoUser}
                  alt="Utilisateur"
                  className="h-5 w-5 rounded-full"
                />
                <span>Mon Espace</span>
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="border border-red-500 text-red-500 px-4 py-2 rounded-full flex items-center gap-2 text-sm hover:bg-red-100 transition"
            >
              <FaUserCircle />
              <span>Mon Espace</span>
            </Link>
          )}
        </div>
      </nav>

      {showDropdown && user && (
        <ul
          ref={dropdownRef}
          className="fixed top-14 lg:top-16 right-6 text-sm text-[#161a1d] bg-white border border-gray-300 rounded shadow-lg w-48 z-[1000] flex flex-col space-y-1"
        >
          <Link
            to={
              user?.role === "assistant"
                ? "/assistant-index"
                : user.role === "courtier"
                ? "/courtier-index"
                : user.role === "admin"
                ? "/admin/tableau-de-bord-admin"
                : "/profile-client"
            }
            className="ps-4 pe-6 py-3 hover:bg-gray-100 cursor-pointer"
          >
            {user.role === "courtier" ||
            user.role === "assistant" ||
            user.role === "admin" ? (
              "Mon espace"
            ) : (
              <Link to={"/profile-client"}>Profile</Link>
            )}
          </Link>
          <li
            className="ps-4 pe-6 py-3 hover:bg-gray-100 cursor-pointer"
            onClick={() => setShowFavoris(true)}
          >
            {FavorisReducer.length > 0 ? (
              <div className="flex justify-between items-center">
                <span>Favoris</span>
                <span className="bg-red-500 text-white rounded-full px-1 text-[10px]">
                  {FavorisReducer.length}
                </span>
              </div>
            ) : (
              "Favoris"
            )}
          </li>
          {(user?.role === "user" || user?.role === "courtier") && (
            <Link
              to={"/chat/negocier"}
              className="ps-4 pe-6 py-3 hover:bg-gray-100 cursor-pointer"
            >
              <div className="flex justify-between items-center">
                <span>Messages</span>
                <span className="bg-red-500 text-white rounded-full px-1 text-[10px]">
                  {unreadConversations.length > 0 && unreadConversations.length}
                </span>
              </div>
            </Link>
          )}
          {(user?.role === "user" || user?.role === "courtier") && (
            <li
              onClick={() => setShowNotifications(true)}
              className="ps-4 pe-6 py-3 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
            >
              <span>Notifications</span>
              {notifications.some((notif) => !notif.isRead) && (
                <span className="bg-red-500 text-white rounded-full px-1 text-[10px] ml-2">
                  {notifications.filter((notif) => !notif.isRead).length}
                </span>
              )}
            </li>
          )}
          {(user?.role === "user" || user?.role === "courtier") && (
            <Link to="/contactUs">
              <li className="ps-4 pe-6 py-3 hover:bg-gray-100 cursor-pointer">
                Centre d'aide
              </li>
            </Link>
          )}
          <li
            className="ps-4 pe-6 py-3 hover:bg-gray-100 cursor-pointer"
            onClick={() => {
              setIsLoggingOut(true);
            }}
          >
            Déconnexion
          </li>
          {isLoggingOut && (
            <LogoutModal
              isOpen={isLoggingOut}
              // onConfirm={handleLogOut}
              onCancel={() => setIsLoggingOut(false)}
            />
          )}
        </ul>
      )}

      {showFavoris && <Favoris setShowFavoris={setShowFavoris} />}
      {showNotifications && (
        <Notifications
          onClose={() => setShowNotifications(false)}
          // onClear={clearNotifications}
        />
      )}
    </div>
  );
};

export default Navbar;
