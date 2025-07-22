import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  BadgeCheck,
  ChevronLeft,
  ClockAlert,
  ShieldCheck,
  Trash,
  Vault,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import socketConfig from "../../../functions/socketConfig.js";
import { socketListener } from "../../../functions/socketListener.js";
import ChatInput from "../component/ChatInput.jsx";
import CourtierDropdown from "../../../components/CourtierDropdown.jsx";
import axios from "axios";
function Conversation({ isAssistant = false }) {
  const currentConversation = useSelector(
    (state) => state.currentConversationReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const getConversation = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_SOCKET}:5000/api/conversation/${
            currentConversation._id
          }`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        dispatch({
          type: "SET_CURRENT_CONVERSATION",
          payload: response?.data,
        });
      } catch (error) {
        console.log(error);
      }
    };
    if (currentConversation && currentConversation._id) {
      getConversation();
    }
  }, [currentConversation._id]);

  const nav = useNavigate();
  const lastMessageRef = useRef(null);

  const currentCourtier = useSelector((state) => state.ActuelCourtierReducer);
  const biens = useSelector((state) => state.BienReducer);
  const courtiers = useSelector((state) => state.AllCourtiersReducer);

  const users = useSelector((state) => state.usersReducer);
  const user = useSelector((state) => state.userReducer.userInfo);

  const client = users.find(
    (u) => Number(currentConversation.clientId) === u.id
  );
  let userId;

  if (user.role === "user") {
    userId = user.id;
  } else if (user.role === "courtier") {
    userId = currentCourtier?.id;
  } else if (user.role === "assistant") {
    userId = 0;
  }

  useEffect(() => {
    if (currentConversation && currentConversation._id) {
      socketConfig.emit("joinConversation", currentConversation._id);
    }
  }, [currentConversation]);

  useEffect(() => {
    if (!currentConversation && Object.keys(currentConversation).length === 0) {
      nav("/chat/negocier");
      localStorage.removeItem("currentConversationId");
      dispatch({
        type: "SET_CURRENT_CONVERSATION",
        payload: {},
      });
    }
  }, [currentConversation, dispatch, nav]);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentConversation?.messages]);

  if (
    !currentConversation ||
    Object.keys(currentConversation).length === 0 ||
    biens.length === 0 ||
    users.length === 0 ||
    courtiers.length === 0
  ) {
    return (
      <div className="p-4 space-y-4 animate-pulse w-full min-h-screen overflow-y-auto custom-scrollbar">
        <div className="h-20 bg-gray-300 w-full "></div>
        {[...Array(12)].map((_, index) => (
          <div
            key={index}
            className={`flex ${
              index % 2 === 0 ? "justify-start" : "justify-end"
            }`}
          >
            <div
              className="bg-gray-300 rounded-lg w-2/3 h-16"
              style={{ width: `${60 + Math.random() * 20}%` }}
            ></div>
          </div>
        ))}
        <div className="h-20 bg-gray-300 w-full "></div>
      </div>
    );
  }

  return (
    <div
      className={`${
        isAssistant ? "h-full" : "h-full min-h-[90vh] lg:h-screen"
      }  flex flex-col justify-between relative`}
    >
      {!isAssistant && (
        <div className="fixed lg:relative w-full flex items-center justify-between bg-[#161a1d] text-white px-2 lg:px-4 lg:py-1 py-2">
          <div className="flex items-center space-x-2">
            <Link to={"/chat/negocier"} className="lg:hidden">
              <ChevronLeft />
            </Link>
            {user.role === "courtier" && client && (
              <div className="flex items-start space-x-2">
                <div className="flex justify-center items-center w-10 h-10">
                  <img
                    src={client.image || ""}
                    alt={client.nom}
                    className="w-10 h-10 rounded-full"
                  />
                </div>
                <div>
                  <h5 className="text-xs">
                    {client.nom + " " + client.prenom}
                  </h5>
                  <p className="text-xs text-gray-400">client</p>
                </div>
              </div>
            )}
            {user.role === "user" &&
              courtiers.map((courtier) => {
                if (courtier.id === Number(currentConversation.courtierId)) {
                  return (
                    <div
                      className="flex items-center space-x-2 lg:space-x-2"
                      key={courtier.id}
                    >
                      <div className="flex justify-center items-center w-10 h-10">
                        <img
                          src={courtier?.user?.image || ""}
                          alt={courtier.Nom_complet}
                          className="w-10 h-10 rounded-full"
                        />
                      </div>
                      <div className="line-clamp-2">
                        <h5 className="text-xs">
                          {courtier?.user?.nom + " " + courtier?.user?.nom}
                        </h5>
                        <p className="text-xs text-gray-400 flex items-center relative">
                          <span>{courtier?.agence?.agence}</span>
                          <BadgeCheck className="h-3 text-white fill-blue-600 lg:flex hidden" />
                        </p>
                        <p className="text-xs text-gray-400">courtier</p>
                      </div>
                    </div>
                  );
                }
              })}
          </div>
          {user?.role === "courtier" &&
            currentConversation?.status === "activé" &&
            biens.some(
              (b) =>
                Number(currentConversation?.BienId) === b?.id &&
                [1, 5, 7].includes(b.status_id)
            ) && (
              <CourtierDropdown
                bienId={Number(currentConversation?.BienId)}
                user_id={currentConversation?.clientId}
              />
            )}

          <div className="flex items-center lg:gap-2 ">
            {biens.map((bien) => {
              if (bien.id === Number(currentConversation.BienId)) {
                return (
                  <div
                    key={bien.id}
                    className="flex items-start justify-start space-x-3 text-end"
                  >
                    <div className="text-xs">
                      <p>{bien.ville}</p>
                      <p className="text-gray-400">{bien.type}</p>
                    </div>
                    <img
                      src={bien.images[0] || ""}
                      alt={bien.title}
                      className="w-12 h-12 lg:w-15 lg:h-15 rounded-xl"
                    />
                    <h5 className="text-xs">{bien.name}</h5>
                  </div>
                );
              }
            })}
          </div>
        </div>
      )}
      {currentConversation?.status &&
        currentConversation?.status !== "activé" && (
          <div
            className={`text-sm sticky top-16 lg:top-0 mt-1 font-medium rounded shadow min-w-1/3 mx-auto px-4 py-4 text-white flex items-center gap-2`}
            style={{
              backgroundColor:
                currentConversation.status === "supprimé"
                  ? "#dc2626"
                  : currentConversation.status === "brouillant"
                  ? "#fbbf24"
                  : currentConversation.status === "blocké"
                  ? "#4b5563"
                  : currentConversation.status === "désactivé"
                  ? "#9ca3af"
                  : "#34d399",
            }}
          >
            {currentConversation.status === "supprimé" && (
              <Trash className="h-5 w-5" />
            )}
            {currentConversation.status === "brouillant" && (
              <ClockAlert className="h-5 w-5" />
            )}
            {currentConversation.status === "blocké" && (
              <Vault className="h-5 w-5" />
            )}
            {currentConversation.status === "désactivé" && (
              <MouseOff className="h-5 w-5" />
            )}
            <span>
              Cette conversation est{" "}
              <span className="font-bold">{currentConversation.status} </span>
              par l'assistant
            </span>
          </div>
        )}

      <div
        className={`flex-1 overflow-y-auto  px-4 space-y-4 custom-scrollbar py-4 ${
          !isAssistant && "mt-16 lg:mt-4"
        }`}
      >
        <div className="flex min-w-5/6 text-center bg-red-100 text-gray-900  rounded-lg p-4 text-sm mx-auto">
          <ShieldCheck className="h-8 w-8 mr-2" />
          <p>
            Salut ! Nous, on est là pour t’aider à gérer ta conversation. Si tu
            as besoin d’infos, de poser une question ou de lancer la négo, on
            est là pour ça. On peut commencer quand tu veux !
          </p>
        </div>
        <div className="space-y-2 py-12 lg:py-0">
          {currentConversation?.messages?.length > 0 &&
            currentConversation?.messages?.map((msg, index) => {
              const isLast = index === currentConversation.messages.length - 1;
              return (
                <div
                  className={`w-full flex  ${
                    Number(currentConversation.clientId) ===
                    Number(msg.senderId)
                      ? "justify-end"
                      : Number(currentConversation.courtierId) ===
                        Number(msg.senderId)
                      ? "justify-start"
                      : "justify-center text-center"
                  }`}
                >
                  <div className={` lg:max-w-4/5 lg:p-2 text-sm`}>
                    <div
                      className={`flex ${
                        Number(currentConversation.clientId) ===
                        Number(msg.senderId)
                          ? "justify-end "
                          : Number(currentConversation.courtierId) ===
                            Number(msg.senderId)
                          ? "justify-start "
                          : "justify-center "
                      }`}
                    >
                      <img
                        className={`${
                          Number(msg.senderId) === 0 && "hidden"
                        } w-8 h-8 rounded-full`}
                        src={
                          Number(currentConversation.clientId) ===
                          Number(msg.senderId)
                            ? users.find((u) => u.id === Number(msg.senderId))
                                ?.image
                            : Number(currentConversation.courtierId) ===
                              Number(msg.senderId)
                            ? courtiers.find(
                                (crt) => crt.id === Number(msg.senderId)
                              )?.user?.image
                            : "assistant"
                        }
                        alt="img-sender"
                      />
                    </div>
                    <div
                      className={` px-3 py-6 rounded-xl min-w-xs lg:m-1 text-gray-700 ${
                        Number(msg?.senderId) ===
                          Number(currentConversation?.clientId) &&
                        user?.role === "user"
                          ? "bg-gray-200 border border-gray-100 "
                          : Number(msg?.senderId) ===
                              Number(currentConversation?.courtierId) &&
                            user?.role === "courtier"
                          ? "bg-gray-300 border border-gray-100  "
                          : Number(msg?.senderId) == 0
                          ? "bg-red-100 text-gray-900"
                          : "bg-[#161a1d11] "
                      }`}
                    >
                      <div>
                        <span className="flex space-x-2">
                          <span>
                            {Number(msg.senderId) === 0 && (
                              <ShieldCheck className="h-5 w-5" />
                            )}
                          </span>
                          <p className=" font-medium">{msg.text}</p>
                        </span>
                      </div>
                    </div>
                    <div className="text-[10px] text-gray-500 text-start mt-1 ms-2">
                      {new Date(msg.createdAt).toLocaleTimeString()}
                    </div>
                  </div>
                  {isLast && <div ref={lastMessageRef} />}
                </div>
              );
            })}
        </div>
      </div>
      {!isAssistant && (
        <ChatInput
          dispatch={dispatch}
          currentConversation={currentConversation}
          userId={userId}
        />
      )}
    </div>
  );
}

export default Conversation;
