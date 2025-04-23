import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import {
  BadgeCheck,
  MessageCircleQuestion,
  Send,
  ShieldCheck,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "sonner";

function Conversation() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const ConversationsResponse = await axios.get(
          "http://localhost:5000/api/get-conversations/conversations",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (
          ConversationsResponse.status >= 200 &&
          ConversationsResponse.status <= 300
        ) {
          dispatch({
            type: "SET_CONVERSATIONS",
            payload: ConversationsResponse.data,
          });
          const currentConversationId = localStorage.getItem(
            "currentConversationId"
          );
          if (currentConversationId) {
            const currentConversation = ConversationsResponse.data.find(
              (conversation) => conversation._id === currentConversationId
            );

            dispatch({
              type: "SET_CURRENT_CONVERSATION",
              payload: currentConversation,
            });
          } else {
            dispatch({
              type: "SET_CURRENT_CONVERSATION",
              payload: {},
            });
          }
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Erreur lors du chargement des données.");
      }
    };

    fetchData();
  }, []);

  const biens = useSelector((state) => state.BienReducer);
  const courtiers = useSelector((state) => state.AllCourtiersReducer);
  const currentConversation = useSelector(
    (state) => state.currentConversationReducer
  );

  const users = useSelector((state) => state.usersReducer);

  const courtier = courtiers.find(
    (courtier) => Number(currentConversation.courtierId) === courtier.id
  );
  const client = users.find(
    (u) => Number(currentConversation.clientId) === u.id
  );
  const nav = useNavigate();
  const [inputValue, setInputValue] = useState("");

  const [isSending, setIsSending] = useState(false);
  const user = useSelector((state) => state.userReducer.userInfo);

  const lastMessageRef = useRef(null);

  useEffect(() => {
    if (!currentConversation && Object.keys(currentConversation).length === 0) {
      nav("/chat/negocier");
    }
  }, [currentConversation, nav]);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentConversation?.messages]);

  const handleSedMessage = async () => {
    setIsSending(true);
    if (inputValue.trim() === "") {
      setIsSending(false);
      return;
    }
    const newMessage = {
      conversationId: currentConversation._id,
      senderId: user.id,
      text: inputValue.trim(),
    };
    setInputValue("");
    try {
      const sendMessageResponse = await axios.post(
        "http://localhost:5000/api/chat/send",
        newMessage,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (
        sendMessageResponse.status >= 200 &&
        sendMessageResponse.status <= 300
      ) {
        dispatch({
          type: "SET_CURRENT_CONVERSATION",
          payload: sendMessageResponse.data.conversation,
        });
        dispatch({
          type: "SET_CONVERSATIONS",
          payload: sendMessageResponse.data.conversations,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Erreur lors de l'envoi du message.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="h-screen flex flex-col justify-between bg-white">
      <div className="flex items-center justify-between bg-[#161a1d] text-white px-4 py-1">
        <div>
          {courtiers.map((courtier) => {
            if (courtier.id === Number(currentConversation.courtierId)) {
              return (
                <div className="flex items-start space-x-2" key={courtier.id}>
                  <div className="flex justify-center items-center w-10 h-10">
                    <img
                      src={courtier.courtier_image || ""}
                      alt={courtier.name}
                      className="w-10 h-10 rounded-full"
                    />
                  </div>
                  <div>
                    <h5 className="text-xs">{courtier.Nom_complet}</h5>
                    <p className="text-xs text-gray-400">courtier</p>
                    <p className="text-xs text-gray-400 flex justify-center items-end">
                      <span>{courtier.agence_nom}</span>
                      <BadgeCheck className="h-3 text-white fill-blue-600" />
                    </p>
                  </div>
                </div>
              );
            }
          })}
        </div>
        <div className="flex items-center gap-2">
          {biens.map((bien) => {
            if (bien.id === Number(currentConversation.BienId)) {
              return (
                <div
                  key={bien.id}
                  className="flex items-start justify-start space-x-3 text-end"
                >
                  <div className="text-xs ">
                    <p>{bien.ville}</p>
                    <p className="text-gray-400">{bien.type}</p>
                  </div>
                  <img
                    src={bien.images[0] || ""}
                    alt={bien.title}
                    className="w-15 h-15 rounded-xl"
                  />
                  <h5 className="text-xs">{bien.name}</h5>
                </div>
              );
            }
          })}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto mt-4 px-4 space-y-4 custom-scrollbar py-4">
        <div className="flex w-5/6 text-center bg-gray-100 rounded-lg p-4 text-sm mx-auto">
          <ShieldCheck className="h-8 w-8 mr-2" />
          <p>
            Salut ! Nous, on est là pour t’aider à gérer ta conversation. Si tu
            as besoin d’infos, de poser une question ou de lancer la négo, on
            est là pour ça. On peut commencer quand tu veux !
          </p>
        </div>
        <div className="space-y-2">
          {currentConversation &&
            Object.keys(currentConversation).length !== 0 &&
            currentConversation?.messages.map((message, index) => {
              const isLast = index === currentConversation.messages.length - 1;
              return (
                <div key={index} ref={isLast ? lastMessageRef : null}>
                  <div
                    className={`flex ${
                      Number(message.senderId) === user.id
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`text-end w-auto ${
                        Number(message.senderId) === user.id
                          ? "flex"
                          : "flex flex-row-reverse"
                      }`}
                    >
                      <div
                        className={` bg-slate-100 py-2 px-5 rounded text-start`}
                      >
                        <p className="text-sm font-semibold">{message.text}</p>
                        <p className="text-[10px] text-gray-500">
                          {new Date(message.createdAt).toLocaleTimeString()}
                        </p>
                      </div>
                      {courtier.user_id === Number(message.senderId) ? (
                        <img
                          src={courtier.courtier_image}
                          alt="courtierImage"
                          className="h-8 w-8 rounded-full"
                        />
                      ) : (
                        <img
                          src={client.image}
                          alt="clientImage"
                          className="h-8 w-8 rounded-full"
                        />
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      <div className="py-4 bg-[#161a1d] text-white px-4 flex items-center justify-between">
        <input
          type="text"
          className="border-none outline-none focus:outline-none bg-transparent w-full h-full"
          placeholder="Votre message"
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
          onKeyDown={(e) => e.key === "Enter" && handleSedMessage()}
        />
        {inputValue ? (
          <button onClick={handleSedMessage}>
            {isSending ? (
              <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
            ) : (
              <Send className="text-white cursor-pointer" size={20} />
            )}
          </button>
        ) : (
          <button>
            <MessageCircleQuestion
              className="text-white cursor-pointer"
              size={20}
            />
          </button>
        )}
      </div>
    </div>
  );
}

export default Conversation;
