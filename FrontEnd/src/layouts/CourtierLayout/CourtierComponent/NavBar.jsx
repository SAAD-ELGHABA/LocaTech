import React from "react";
import logoUser from "../../../assets/logo-user.png";
import { useDispatch, useSelector } from "react-redux";
import { FaPlusCircle } from "react-icons/fa";
import CreateBien from "./CreateBien";
import logo from "../../../assets/Location.png";
import { Link } from "react-router-dom";
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

  return (
    <nav className="container mx-auto">
      <div className="flex justify-between items-center">
        <div className="flex items-center justify-center">
          <Link to={"/"} className="flex items-center space-x-2">
            <img src={logo} alt="LocaTech Logo" className="w-6 h-10" />
            <h1 className="text-xl font-bold">
              <span className="text-red-500">LocaTech</span>
            </h1>
          </Link>
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
          {user.image ? (
            <img src={user.image || logoUser} alt="image courtier" />
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
