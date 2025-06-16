import React from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaPlusCircle, FaSearch } from "react-icons/fa";
import {
  BookOpenCheck,
  CircleFadingPlus,
  HandCoins,
  Info,
  Wallet,
} from "lucide-react";

function PhoneNav() {
  const loc = useLocation();

  return (
    <div
      className="lg:hidden py-2 fixed bottom-0 right-0 justify-around left-0 w-full bg-white  flex "
      style={{ zIndex: 1005 }}
    >
      <Link
        to="/acheter"
        className={`${
          loc.pathname === "/acheter" ? "text-red-500" : "text-black"
        }
              hover:text-red-500
              flex flex-col items-center justify-center
              `}
      >
        <HandCoins />
        <span className="text-xs">Acheter</span>
      </Link>
      <Link
        to="/louer"
        className={`${loc.pathname === "/louer" ? "text-red-500" : "text-black"}
              flex flex-col items-center justify-center
              hover:text-red-500
              `}
      >
        <Wallet />
        <span className="text-xs">Louer</span>
      </Link>
      <Link
        to="/Apropos"
        className={`${
          loc.pathname === "/Apropos" ? "text-red-500" : "text-black"
        }
              hover:text-red-500
              flex flex-col items-center justify-center

              `}
      >
        <Info />
        <span className="text-xs">A propos</span>
      </Link>
      <Link
        to="/blog"
        className={`${loc.pathname === "/blog" ? "text-red-500" : "text-black"}
              hover:text-red-500
              flex flex-col items-center justify-center

              `}
      >
        <BookOpenCheck />
        <span className="text-xs">Blog</span>
      </Link>
      <Link
        to="/contactUs"
        className={`${
          loc.pathname === "/contactUs" ? "text-red-500" : "text-black"
        }
              flex flex-col items-center justify-center
              hover:text-red-500
              `}
      >
        <CircleFadingPlus />
        <span className="text-xs">Contacter-nous</span>
      </Link>

      {/* <Link
        to="/block"
        className="bg-[#F44336] text-white px-4 py-2 rounded-full flex items-center hover:bg-red-600 transition"
      >
        <FaPlusCircle />
      </Link> */}
    </div>
  );
}

export default PhoneNav;
