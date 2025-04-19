import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Location.png";
import { useDispatch, useSelector } from "react-redux";

const BlockedPage = () => {
  const user = useSelector(
    (state) =>
      (state.userReducer.userInfo && state.userReducer.userInfo.user) ||
      state.userReducer.userInfo
  );
  const dispatch = useDispatch();
  useEffect(() => {
    console.log(user);

    user &&
      user.role === "courtier" &&
      dispatch({
        type: "SHOW_CREATEBIENTOGGLE",
        payload: true,
      });
  });
  return (
    <div className="min-h-screen flex flex-col justify-center items-center space-y-2 bg-white">
      {/* Logo + Titre */}
      <div className="flex flex-col items-center space-y-2 ">
        <Link to="/">
          <div className="flex items-center space-x-2">
            <img src={logo} alt="LocaTech Logo" className="w-12 h-20" />
            <h1 className="text-4xl font-bold">
              <span className="text-red-500">LocaTech</span>
            </h1>
          </div>
        </Link>
      </div>
      {!user ||
        (!user.role === "courtier" ? (
          <div>
            <p className="text-xl text-black font-medium">
              Vous avez été bloqué(e).
            </p>

            {/* Lien Créer un compte  */}
            <Link
              to="/register"
              className="text-xs font-semibold hover:underline mt-6"
            >
              Créer un compte
            </Link>
          </div>
        ) : (
          <div>
            <Link to={"/courtier-index"} className="hover:underline">
              Aller à votre tableau de bord pour crée une nouvelle annonce
            </Link>
          </div>
        ))}
      {/* Message */}
    </div>
  );
};

export default BlockedPage;
