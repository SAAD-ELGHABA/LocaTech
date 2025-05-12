import React from "react";
import logoUser from "../../../assets/logo-user.png";
import { useDispatch, useSelector } from "react-redux";
import { FaPlusCircle } from "react-icons/fa";
import CreateBien from "./CreateBien";
import Logo from "../../../components/Logo";
import { Link } from "react-router-dom";
import { Bell } from "lucide-react";
import NotificationBell from "../../../components/NotificationBell";
function NavBar() {
  const user = useSelector(
    (state) =>
      (state.userReducer.userInfo && state.userReducer.userInfo.user) ||
      state.userReducer.userInfo
  );
  const dispatch = useDispatch();
  const CreateBienToggleReducer = useSelector(
    (state) => state.CreateBienToggleReducer
  );
  const currentCourtier = useSelector((state) => state.ActuelCourtierReducer);

  return (
    <nav className="container mx-auto">
      <div className="flex justify-between items-center">
        <div className="flex items-center justify-center">
          <Logo />
        </div>
        <div className="text-[#ba181b] flex items-center space-x-4">
          <div>
            <button
              onClick={() => {
                dispatch({
                  type: "SHOW_CREATEBIENTOGGLE",
                  payload: true,
                });
              }}
              to="/block"
              className="bg-[#ba181b] text-white px-4 py-2 rounded-full hover:bg-red-600 transition text-xs flex items-center gap-2 cursor-pointer"
            >
              <FaPlusCircle />
              <span>Déposer une annonce</span>
            </button>
          </div>
          <NotificationBell />

          {user.image ? (
            <Link
              to={"/profile-courtier"}
              className="relative bg-white rounded-full"
            >
              <img
                src={user.image || logoUser}
                alt="image courtier"
                className="h-7 w-7 rounded-full"
              />
              {!currentCourtier?.courtier?.Brève_présentation ||
                (!currentCourtier?.courtier?.Licence_professionnelle && (
                  <div className="w-2 h-2 rounded-full bg-red-500 absolute top-0 right-0"></div>
                ))}
            </Link>
          ) : (
            <img
              src={logoUser}
              alt="user-avatar"
              className="rounded-full h-7 cursor-pointer"
            />
          )}
        </div>
      </div>
      {CreateBienToggleReducer && <CreateBien />}
    </nav>
  );
}

export default NavBar;
