import React from "react";
import logoUser from "../../../assets/logo-user.png";
import { useDispatch, useSelector } from "react-redux";
import { FaPlusCircle } from "react-icons/fa";
import CreateBien from "./CreateBien";
function NavBar() {
  const user = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch()
  const CreateBienToggleReducer = useSelector(
    (state) => state.CreateBienToggleReducer
  );
  return (
    <nav className="container mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">Dashboard Courtier</h1>
        </div>
        <div className="text-[#ba181b] flex items-center space-x-4">
          <div>
            <button
              onClick={() => {
                dispatch({
                  type:"SHOW_CREATEBIENTOGGLE",
                  payload:true
                })
              }}
              to="/block"
              className="bg-[#ba181b] text-white px-4 py-2 rounded-full hover:bg-red-600 transition text-xs flex items-center gap-2 cursor-pointer"
            >
              <FaPlusCircle />
              <span>Déposer une annonce</span>
            </button>
          </div>
          {user.user.image ? (
            <img src={user.user.image} alt="image courtier" />
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
