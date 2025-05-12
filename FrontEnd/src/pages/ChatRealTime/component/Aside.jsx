import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BadgeCheck, CircleOff } from "lucide-react";
import { socketListener } from "../../../functions/socketListener";

function Aside() {
  const currentConversation = useSelector(
    (state) => state.currentConversationReducer
  );
  const conversations = useSelector((state) => state.conversationsReducer);
  const biens = useSelector((state) => state.BienReducer);
  const courtiers = useSelector((state) => state.AllCourtiersReducer);
  const users = useSelector((state) => state.usersReducer);
  const user = useSelector((state) => state.userReducer.userInfo);
  const nav = useNavigate();
  const dispatch = useDispatch();
  const currentCourtier = useSelector((state) => state.ActuelCourtierReducer);

  const userId =
    user.role === "user"
      ? user.id
      : user.role === "courtier"
      ? currentCourtier.id
      : 0;

  const cleanup = socketListener(dispatch, currentConversation, userId);
  cleanup();

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
        {conversations.length > 0 ? (
          conversations
            .sort(
              (a, b) =>
                new Date(b.lastMessageDate) - new Date(a.lastMessageDate)
            )
            .filter((c) => c?.status !== "supprimé")
            .map((conversation) => {
              const lastMessageSenderId = Number(
                conversation.messages?.slice(-1)[0]?.senderId
              );
              const isUnread =
                (conversation.isRead === false &&
                  lastMessageSenderId !== user.id &&
                  user.role === "user") ||
                (conversation.isRead === false &&
                  lastMessageSenderId !== currentCourtier.id &&
                  user.role === "courtier");
              return (
                <div
                  className={`border-gray-800 flex items-start w-full mt-1 flex-col hover:bg-[black] cursor-pointer rounded-lg p-3 ${
                    currentConversation._id === conversation._id
                      ? "bg-[black] text-white"
                      : "bg-[#161a1d] text-gray-400"
                  }`}
                  key={conversation._id}
                  onClick={() => handleConversationClick(conversation._id)}
                >
                  <section className="flex items-center justify-start mb-4 w-full">
                    <div className="flex items-center justify-between space-x-1 w-full">
                      <div>
                        {(() => {
                          let otherPerson = null;
                          if (user.role === "courtier") {
                            otherPerson = users.find(
                              (u) => u.id === Number(conversation.clientId)
                            );
                            return (
                              <div
                                className="flex items-start space-x-2"
                                key={otherPerson.id}
                              >
                                <div className="flex justify-center items-center w-10 h-10">
                                  <img
                                    src={
                                      otherPerson
                                        ? otherPerson.image
                                        : users.find(
                                            (u) =>
                                              u.id ===
                                              Number(conversation.clientId)
                                          )?.image
                                    }
                                    alt={otherPerson.nom}
                                    className="w-10 h-10 rounded-full border border-gray-500"
                                  />
                                </div>
                                <div>
                                  <h5 className="text-xs">
                                    {otherPerson.nom + " " + otherPerson.prenom}
                                  </h5>
                                  <p className="text-xs text-gray-400 flex justify-start items-end">
                                    <span>{otherPerson.role}</span>
                                  </p>
                                </div>
                              </div>
                            );
                          } else {
                            otherPerson = courtiers.find(
                              (courtier) =>
                                courtier.id === Number(conversation.courtierId)
                            );

                            if (!otherPerson) return null;

                            return (
                              <div
                                className="flex items-start space-x-2"
                                key={otherPerson.id}
                              >
                                <div className="flex justify-center items-center w-10 h-10">
                                  <img
                                    src={otherPerson?.user?.image || ""}
                                    alt={
                                      otherPerson?.user?.nom +
                                      " " +
                                      otherPerson?.user?.prenom
                                    }
                                    className="w-10 h-10 rounded-full border border-gray-500"
                                  />
                                </div>
                                <div>
                                  <h5 className="text-xs ">
                                    {otherPerson?.user?.nom +
                                      " " +
                                      otherPerson?.user?.prenom}
                                  </h5>
                                  <p className="text-xs text-gray-400 flex justify-start items-end">
                                    <span>{otherPerson?.agence?.agence}</span>
                                    <BadgeCheck className="h-3 text-white fill-blue-600 ml-1" />
                                  </p>
                                </div>
                              </div>
                            );
                          }
                        })()}
                      </div>

                      <div className="flex items-start justify-end">
                        <p className="text-xs flex">
                          {Number(conversation.clientId) === user.id
                            ? "courtier"
                            : "client"}
                        </p>
                      </div>
                    </div>
                  </section>

                  <section className="flex justify-between items-center w-full">
                    <div className="flex items-center justify-start w-4/6">
                      <p className="text-xs flex flex-col items-start">
                        {(() => {
                          const sender =
                            users.find(
                              (u) =>
                                u.id ===
                                Number(
                                  conversation?.messages?.slice(-1)[0]?.senderId
                                )
                            ) ||
                            courtiers.find(
                              (c) =>
                                c.id ===
                                Number(
                                  conversation?.messages?.slice(-1)[0]?.senderId
                                )
                            );

                          const senderName = sender
                            ? sender.nom
                              ? `${sender.nom} ${sender.prenom}`
                              : sender?.user?.nom + " " + sender?.user?.prenom
                            : "Assistant";

                          return (
                            <>
                              {/* <span className="font-semibold me-2"> */}
                              <strong className="text-red-100 ">
                                {senderName + "  "}
                              </strong>
                              {/* </span> */}
                              <span>
                                {conversation.lastMessage.length > 145
                                  ? conversation.lastMessage.substring(0, 145) +
                                    " ..."
                                  : conversation.lastMessage}
                              </span>
                              <p className="text-gray-400 text-xs mt-2">
                                {new Date(
                                  conversation?.lastMessageDate
                                ).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })}
                              </p>
                            </>
                          );
                        })()}

                        {isUnread && (
                          <span className="mt-2 bg-red-500 text-white text-[10px] font-bold rounded-full px-2">
                            Nouveau
                          </span>
                        )}
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
                                className="w-36 rounded h-20"
                              />
                            </div>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </section>
                </div>
              );
            })
        ) : (
          <div className="w-full h-100 flex justify-center items-center text-gray-400">
            <div className="flex flex-col justify-center items-center">
              <CircleOff className="w-15 h-15" />
              <p>Aucune conversation trouvable</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Aside;
