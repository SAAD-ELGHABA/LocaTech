import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaPlusCircle, FaSearch, FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import logoUser from "../assets/logo-user.png";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Favoris from "./Favoris";
import axios from "axios";
import { toast } from "sonner";
import { fetchInitialData } from "../functions/fetchInitialData";
import Logo from "./Logo";

const Navbar = () => {
  const MySwal = withReactContent(Swal);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const location = useLocation();
  const user = useSelector((state) => state.userReducer.userInfo);
  const dropdownRef = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const nav = useNavigate();

  const handleLogOut = () => {
    MySwal.fire({
      title: "Se déconnecter?",
      text: "Êtes-vous sûr de se déconnecter?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Oui, se déconnecter",
      cancelButtonText: "Annuler",
    }).then(async (result) => {
      const deconnecter = toast.loading("se déconnecter..");
      if (result.isConfirmed) {
        try {
          await axios.post(
            "/api/logout",
            {},
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          dispatch({ type: "LOGOUT" });
          localStorage.removeItem("token");
          await fetchInitialData(dispatch, null);
          toast.success("Déconnexion réussie !");
          MySwal.fire({
            title: "Déconnecté",
            text: "Vous avez été déconnecté avec succès.",
            icon: "success",
            confirmButtonColor: "#3b82f6",
          });
          nav("/login");
        } catch (error) {
          toast.error("Échec de la déconnexion.");
          console.error(error);
        } finally {
          toast.dismiss(deconnecter);
        }
      }else {
        toast.dismiss(deconnecter);
      }
    });
  };

  const isHomepage = location.pathname === "/";
  const FavorisReducer = useSelector((state) => state.FavorisReducer);
  const [showFavoris, setShowFavoris] = useState(false);

  return (
    <div className="relative">
      <nav
        className="bg-white shadow-md px-4 md:px-6 fixed w-full top-0 left-0 z-50"
        style={{ zIndex: 1000 }}
      >
        <div className="w-full flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <Logo />

          <div className="flex items-center gap-5 text-sm font-medium overflow-x-auto whitespace-nowrap">
            <Link to="/acheter" className="text-black">
              Acheter
            </Link>
            <Link to="/louer" className="text-black">
              Louer
            </Link>
            <Link to="/Apropos" className="text-black">
              A propos
            </Link>
            <Link to="/blog" className="text-black">
              Blog
            </Link>
            <Link to="/contactUs" className="text-black">
              Contactez-nous
            </Link>

            {isHomepage && isScrolled && (
              <button
                onClick={() =>
                  document
                    .getElementById("hero-section")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="bg-[#F44336] text-white px-4 py-2 rounded-full cursor-pointer hover:bg-red-600 transition flex items-center space-x-2"
              >
                <FaSearch />
                <span>Rechercher</span>
              </button>
            )}

            {!isHomepage && (
              <Link
                to="/"
                className="bg-[#F44336] text-white px-4 py-2 rounded-full cursor-pointer hover:bg-red-600 transition flex items-center space-x-2"
              >
                <FaSearch />
                <span>Rechercher</span>
              </Link>
            )}

            <Link
              to="/block"
              className="bg-[#F44336] text-white px-4 py-2 rounded-full hover:bg-red-600 transition flex items-center gap-2"
            >
              <FaPlusCircle />
              <span>Déposer une annonce</span>
            </Link>
            {user && user.image ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown((prev) => !prev)}
                  className="border border-red-500 text-red-500 px-4 py-2 rounded-full hover:bg-red-100 transition flex items-center gap-2 cursor-pointer"
                >
                  <img
                    src={user.image || logoUser}
                    alt="image user"
                    className="h-5 w-5 rounded-full"
                  />
                  <span>Mon Espace</span>
                </button>
              </div>
            ) : user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown((prev) => !prev)}
                  className="border border-red-500 text-red-500 px-4 py-2 rounded-full hover:bg-red-100 transition flex items-center gap-2 cursor-pointer"
                >
                  <img
                    src={logoUser}
                    alt="image user"
                    className="h-5 w-5 rounded-full"
                  />
                  <span>Mon Espace</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="border border-red-500 text-red-500 px-4 py-2 rounded-full hover:bg-red-100 transition flex items-center gap-2"
              >
                <FaUserCircle />
                <span>Mon Espace</span>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {showDropdown && user && (
        <ul
          style={{ zIndex: 1000 }}
          ref={dropdownRef}
          className="fixed flex space-y-1 flex-col right-6 top-16 text-sm text-[#161a1d] bg-white border rounded border-gray-300 shadow-lg w-48 z-50"
        >
          <li className="ps-4 pe-6 py-3 hover:bg-gray-100 cursor-pointer ">
            Profile
          </li>
          <li className="ps-4 pe-6 py-3 hover:bg-gray-100 cursor-pointer">
            Parametres
          </li>
          <li
            className="ps-4 pe-6 py-3 hover:bg-gray-100 cursor-pointer"
            onClick={() => setShowFavoris(true)}
          >
            {FavorisReducer.length > 0 ? (
              <div className="flex justify-between items-center">
                <span>Favoris</span>
                <span className=" bg-red-500 rounded-full px-1 text-[10px] text-white">
                  {FavorisReducer.length}
                </span>
              </div>
            ) : (
              "Favoris"
            )}
          </li>
          <Link to={'/chat/negocier'} className="ps-4 pe-6 py-3 hover:bg-gray-100 cursor-pointer">
            Messages
          </Link>
          <li className="ps-4 pe-6 py-3 hover:bg-gray-100 cursor-pointer">
            Notifications
          </li>
          <li className="ps-4 pe-6 py-3 hover:bg-gray-100 cursor-pointer">
            Centre d'aide
          </li>
          <li
            className="ps-4 pe-6 py-3 hover:bg-gray-100 cursor-pointer"
            onClick={handleLogOut}
          >
            Déconnexion
          </li>
        </ul>
      )}
      {showFavoris && <Favoris setShowFavoris={setShowFavoris} />}
    </div>
  );
};

export default Navbar;
