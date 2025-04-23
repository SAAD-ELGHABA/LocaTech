import React from "react";
import Logo from "../../../components/Logo";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BadgeCheck } from "lucide-react";
import { toast } from "sonner";

function Aside() {
  const currentConversation = useSelector(
    (state) => state.currentConversationReducer
  );
  const conversations = useSelector((state) => state.conversationsReducer);
  const agences = useSelector((state) => state.AgencesReducer);
  const biens = useSelector((state) => state.BienReducer);
  const courtiers = useSelector((state) => state.AllCourtiersReducer);
  const users = useSelector((state) => state.usersReducer);
  const user = useSelector((state) => state.userReducer.userInfo);
  const nav = useNavigate();
  const dispatch = useDispatch();
  const handleConversationClick = (id) => {
    nav("/chat/conversation");
    localStorage.setItem("currentConversationId", id);
    dispatch({
      type: "SET_CURRENT_CONVERSATION",
      payload: conversations.find((conversation) => conversation._id === id),
    });
  };
  return (
    <div className="flex flex-col justify-start space-y-2 items-center w-full h-screen bg-[#161a1d] p-1 sticky top-0 text-white overflow-y-auto">
      <div className="flex items-center shrink-0 justify-center w-full">
        <Link to="/">
          <img
            src={"/logo-locatech-v1.png"}
            alt="Logo"
            className="h-18 w-48 object-contain"
          />
        </Link>
      </div>
      <div className="w-full flex flex-col justify-start items-start overflow-y-auto custom-scrollbar">
        {conversations.map((conversation) => (
          <div
            className={` border-gray-800 flex items-start w-full my-1 flex-col hover:bg-[black] cursor-pointer rounded-lg p-3 ${
              currentConversation._id === conversation._id
                ? "bg-[black] text-white"
                : "bg-[#161a1d] text-gray-400"
            }`}
            key={conversation._id}
            onClick={() => handleConversationClick(conversation._id)}
          >
            <section className="flex items-center justify-start mb-4 w-full ">
              <div className="flex items-center justify-between space-x-1 w-full ">
                <div>
                  {user.role === "courtier"
                    ? users.map((u) =>
                        u.id === Number(conversation.clientId) ? (
                          <div
                            className="flex items-start space-x-2"
                            key={u.id}
                          >
                            <div className="flex justify-center items-center w-10 h-10">
                              <img
                                key={u.id}
                                src={u.image || ""}
                                alt={u.nom}
                                className="w-10 h-10 rounded-full"
                              />
                            </div>
                            <div>
                              <h5 className="text-xs">
                                {u.nom + " " + u.prenom}
                              </h5>
                              <p className="text-xs text-gray-400 flex justify-start items-end">
                                <span>{u.role}</span>
                              </p>
                            </div>
                          </div>
                        ) : (
                          ""
                        )
                      )
                    : courtiers.map((courtier) => {
                        if (courtier.id === Number(conversation.courtierId)) {
                          return user.id === Number(conversation.clientId) ? (
                            <div
                              className="flex items-start space-x-2"
                              key={courtier.id}
                            >
                              <div className="flex justify-center items-center w-10 h-10">
                                <img
                                  key={courtier.id}
                                  src={courtier.courtier_image || ""}
                                  alt={courtier.Nom_complet}
                                  className="w-10 h-10 rounded-full"
                                />
                              </div>
                              <div>
                                <h5 className="text-xs">
                                  {courtier.Nom_complet}
                                </h5>
                                <p className="text-xs text-gray-400 flex justify-center items-end">
                                  <span>{courtier.agence_nom}</span>
                                  <BadgeCheck className="h-3 text-white fill-blue-600" />
                                </p>
                              </div>
                            </div>
                          ) : user.id === conversation.courtierId ? (
                            ""
                          ) : (
                            ""
                          );
                        }
                      })}
                </div>
                <div className="flex items-startjustify-end ">
                  <p className="text-xs flex ">
                    {Number(conversation.clientId) === user.id
                      ? "client"
                      : "courtier"}
                  </p>
                </div>
              </div>
            </section>
            <section className="flex justify-between items-center w-full">
              <div className="flex items-center justify-start w-4/6">
                <p className="text-xs">
                  {conversation.lastMessage.length > 145
                    ? conversation.lastMessage.substring(0, 145) + " ..."
                    : conversation.lastMessage}
                </p>
              </div>
              <div className="flex items-center justify-center w-2/6">
                {biens.map((bien) => {
                  if (bien.id === Number(conversation.BienId)) {
                    return (
                      <div
                        className="flex items-center justify-center w-full"
                        key={bien.id}
                      >
                        <img
                          src={bien.images[0]}
                          alt="indice-image"
                          className="w-20 h-20"
                        />
                      </div>
                    );
                  }
                })}
                {}
              </div>
            </section>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Aside;
