import React from "react";
import logoUser from "../../../assets/logo-user.png";
import { useDispatch, useSelector } from "react-redux";
import { FaPlusCircle } from "react-icons/fa";
import CreateBien from "./CreateBien";
import Logo from "../../../components/Logo";
import { Link } from "react-router-dom";
import { Bell, MessageSquareText } from "lucide-react";
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
  const conversations = useSelector((state) => state.conversationsReducer);

  const unreadConversations =
    conversations?.length > 0 &&
    conversations?.filter(
      (cnv) =>
        cnv.isRead === false &&
        Number(cnv.messages?.slice(-1)[0]?.senderId) !== user?.id
    );
  return (
    <nav className="container w-[90%] mx-auto lg:w-full">
      <div className="flex justify-between items-center">
        <div className="flex items-center justify-center">
          <Logo />
        </div>
        <div className="text-[#ba181b] flex items-center space-x-2 lg:space-x-4">
          <div>
            <button
              onClick={() => {
                dispatch({
                  type: "SHOW_CREATEBIENTOGGLE",
                  payload: true,
                });
              }}
              to="/block"
              className="bg-[#ba181b] text-white lg:px-4 px-2 py-2 rounded-full hover:bg-red-600 transition text-xs flex items-center gap-2 cursor-pointer"
            >
              <FaPlusCircle />
              <span className="lg:block hidden">Déposer une annonce</span>
            </button>
          </div>
          <NotificationBell />
          <Link
            to={"/chat/negocier"}
            className="cursor-pointer flex justify-between items-center   hover:bg-gray-800 p-2.5 relative rounded-full"
          >
            <MessageSquareText className="text-white h-5 w-5" />
            <span className="bg-red-500 text-white rounded-full px-1 text-[8px] absolute top-1 right-1">
              {unreadConversations.length > 0 && unreadConversations.length}
            </span>
          </Link>
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
