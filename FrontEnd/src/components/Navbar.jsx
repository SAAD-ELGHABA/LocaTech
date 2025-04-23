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
import Notifications from "./Notifications";
import logoUser from "../assets/logo-user.png";
import { fetchInitialData } from "../functions/fetchInitialData";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../components/firebase/firebase";



const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showFavoris, setShowFavoris] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false); 

  const [notifications, setNotifications] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);
  const user = useSelector((state) => state.userReducer.userInfo);
  const FavorisReducer = useSelector((state) => state.FavorisReducer);

  const MySwal = withReactContent(Swal);
  const isHomepage = location.pathname === "/";


  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "notifications"), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setNotifications(data);
    });
  
    return () => unsubscribe();
  }, []);

  // Gérer le scroll et le clic hors du dropdown
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 500);
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

  // Déconnexion
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
      const loadingToast = toast.loading("Se déconnecter...");
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
          navigate("/login");
        } catch (error) {
          toast.error("Échec de la déconnexion.");
          console.error(error);
        } finally {
          toast.dismiss(loadingToast);
        }
      } else {
        toast.dismiss(loadingToast);
      }
    });
  };

  return (
    <div className="relative">
      {/* Navbar */}
      <nav className="bg-white shadow-md px-4 md:px-6 fixed w-full top-0 left-0 z-50">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <Logo />

          {/* Navigation links */}
          <div className="flex items-center gap-5 text-sm font-medium overflow-x-auto whitespace-nowrap">
            <Link to="/acheter" className="text-black">Acheter</Link>
            <Link to="/louer" className="text-black">Louer</Link>
            <Link to="/Apropos" className="text-black">A propos</Link>
            <Link to="/blog" className="text-black">Blog</Link>
            <Link to="/contactUs" className="text-black">Contactez-nous</Link>

            {/* Rechercher button (home vs. autres pages) */}
            {isHomepage && isScrolled ? (
              <button
                onClick={() =>
                  document.getElementById("hero-section")?.scrollIntoView({ behavior: "smooth" })
                }
                className="bg-[#F44336] text-white px-4 py-2 rounded-full flex items-center space-x-2 hover:bg-red-600 transition"
              >
                <FaSearch />
                <span>Rechercher</span>
              </button>
            ) : !isHomepage && (
              <Link
                to="/"
                className="bg-[#F44336] text-white px-4 py-2 rounded-full flex items-center space-x-2 hover:bg-red-600 transition"
              >
                <FaSearch />
                <span>Rechercher</span>
              </Link>
            )}

            {/* Bouton déposer une annonce */}
            <Link
              to="/block"
              className="bg-[#F44336] text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-red-600 transition"
            >
              <FaPlusCircle />
              <span>Déposer une annonce</span>
            </Link>

            {/* Espace utilisateur */}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown((prev) => !prev)}
                  className="border border-red-500 text-red-500 px-4 py-2 rounded-full flex items-center gap-2 hover:bg-red-100 transition cursor-pointer"
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
                className="border border-red-500 text-red-500 px-4 py-2 rounded-full flex items-center gap-2 hover:bg-red-100 transition"
              >
                <FaUserCircle />
                <span>Mon Espace</span>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Dropdown utilisateur */}
      {showDropdown && user && (
        <ul
          ref={dropdownRef}
          className="fixed top-16 right-6 text-sm text-[#161a1d] bg-white border rounded shadow-lg w-48 z-[1000] flex flex-col space-y-1"
        >
          <li className="ps-4 pe-6 py-3 hover:bg-gray-100 cursor-pointer">Profile</li>
          <li className="ps-4 pe-6 py-3 hover:bg-gray-100 cursor-pointer">Paramètres</li>
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
          <li className="ps-4 pe-6 py-3 hover:bg-gray-100 cursor-pointer">Messages</li>
          <li
  onClick={() => setShowNotifications(true)}
  className="ps-4 pe-6 py-3 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
>
  <span>Notifications</span>
  {notifications.length > 0 && (
    <span className="bg-red-500 text-white rounded-full px-1.5 text-xs ml-2">
      {notifications.length}
    </span>
  )}
</li>

          <Link to='/contactUs'>
          <li className="ps-4 pe-6 py-3 hover:bg-gray-100 cursor-pointer">Centre d'aide</li>
          </Link>
          <li
            className="ps-4 pe-6 py-3 hover:bg-gray-100 cursor-pointer"
            onClick={handleLogOut}
          >
            Déconnexion
          </li>
        </ul>
      )}

      {/* Fenêtre des favoris */}
      {showFavoris && <Favoris setShowFavoris={setShowFavoris} />}
      {showNotifications && (
  <Notifications onClose={() => setShowNotifications(false)} />
)}
    </div>
  );
};

export default Navbar;
