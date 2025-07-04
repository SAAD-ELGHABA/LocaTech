/* eslint-disable no-constant-binary-expression */
import {
  BadgeCheck,
  CheckCircle,
  ClockAlert,
  ExternalLink,
  MouseOff,
  MousePointerBan,
  Pin,
  Search,
  SlidersHorizontal,
  Trash,
  Vault,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import ConversationInterface from "../AssistantComponents/ConversationInterface";
import { socketListener } from "../../../functions/socketListener";
import axios from "axios";
import { toast } from "sonner";
import { handleSendMessage } from "../../../functions/handleSendMsg";
import { sendNotification } from "../../../functions/NotificationSender";
function Conversations() {
  const allConversationsReducer = useSelector(
    (state) => state.allConversationsReducer
  );
  const statusConversationsReducer = useSelector(
    (state) => state.statusConversationsReducer
  );

  const biens = useSelector((state) => state.BienReducer);
  const courtiers = useSelector((state) => state.AllCourtiersReducer);
  const users = useSelector((state) => state.usersReducer);
  const dispatch = useDispatch();
  const [selectedConversation, setSelectedConversation] = useState(null);
  const userId = 0;

  useEffect(() => {
    const unsubscribe = socketListener(dispatch, 0);
    return () => {
      unsubscribe();
    };
  }, [userId]);

  const cleanup = socketListener(dispatch, 0);
  cleanup();

  const user = useSelector((state) => state.userReducer.userInfo);

  const handleCheckboxChange = (conversationId) => {
    setSelectedConversation((prev) =>
      prev === conversationId ? null : conversationId
    );
  };
  const [showConversationInterface, setShowConversationInterface] =
    useState(false);
  const [conversation, setConversation] = useState({});

  const [searchTerm, setSearchTerm] = useState("");

  const handleConversationAction = async (actionType) => {
    const choosedconversation = allConversationsReducer.find(
      (cnv) => cnv?._id === selectedConversation
    );
    const loading = toast.loading("Chargement..");
    try {
      const response = await axios.post(
        `http://localhost:5000/api/assistant/change-status-conversation/${selectedConversation}`,
        {
          newStatus: actionType,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status >= 200 && response.status <= 300) {
        await sendNotification(
          user?.id,
          Number(
            courtiers.find(
              (crt) => crt.id === Number(choosedconversation?.courtierId)
            )?.user_id
          ),
          "Changement de status",
          `Le status de votre conversation devient ${actionType} par l'assistant !`,
          {
            link: "/chat/conversation",
          }
        );
        await sendNotification(
          user?.id,
          Number(choosedconversation?.clientId),
          "Changement de status",
          `Le status de votre conversation devient ${actionType} par l'assistant !`,
          {
            link: "/chat/conversation",
          }
        );

        toast.success(response.data.message);
        dispatch({
          type: "GET_CONVERSATION_ASSISTANT",
          payload: response.data.allConversations,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      toast.dismiss(loading);
      setSelectedConversation(null);
    }
  };

  return (
    <div>
      <div>
        <div className="border rounded px-4 py-2 flex w-1/3 border-gray-400 mb-4">
          <input
            type="text"
            className="w-[95%] h-full focus:outline-none"
            placeholder="chercher des conversations .. "
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
          />
          <div className="flex justify-end w-[5%] text-gray-400">
            <Search className="h-5 w-5" />
          </div>
        </div>
        <AnimatePresence>
          {selectedConversation && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="mb-4 rounded p-2 text-sm text-gray-700"
            >
              <p className="font-semibold mb-1">
                Conversation sélectionnée : {selectedConversation}
              </p>
              {(() => {
                const conv = allConversationsReducer.find(
                  (c) => c._id === selectedConversation
                );
                const courtier = courtiers.find(
                  (crt) => crt.id === Number(conv?.courtierId)
                );
                const client = users.find(
                  (user) => user.id === Number(conv?.clientId)
                );
                return (
                  <span key={selectedConversation}>
                    <span className="font-semibold">Courtier</span>:{" "}
                    {courtier?.user?.nom + " " + courtier?.user?.prenom ??
                      "N/A"}{" "}
                    <br />
                    <span className="font-semibold">Client</span>:{" "}
                    {client?.nom + " " + client?.prenom ?? "N/A"} <br />
                    <span className="flex space-x-2 items-center">
                      <span className="font-semibold">Bien</span> :{" "}
                      <Link
                        to={`/bien/${
                          biens.find((b) => b.id === Number(conv.BienId))?.ville
                        }/${
                          biens.find((b) => b.id === Number(conv.BienId))?.slag
                        }`}
                        className="flex items-center hover:underline"
                      >
                        {biens.find((b) => b.id === Number(conv.BienId))?.title}
                        <ExternalLink className="w-4 ms-2" />
                      </Link>
                    </span>
                    <div className="flex space-x-1 items-center">
                      {/* Handle 'brouillant' or 'supprimé' status */}
                      {conv.status === "activé" ||
                      conv.status === "en cours.." ? (
                        <>
                          <span
                            onClick={() =>
                              handleConversationAction("brouillant")
                            }
                            className="hover:bg-gray-200 rounded-full px-2 py-2.5 cursor-pointer"
                            title="brouiller cette conversation"
                          >
                            <ClockAlert className="h-4" />
                          </span>
                          <span
                            onClick={() => handleConversationAction("blocké")}
                            className="hover:bg-gray-200 rounded-full px-2 py-2.5 cursor-pointer"
                            title="blocker cette conversation"
                          >
                            <Vault className="h-4" />
                          </span>
                          <span
                            onClick={() =>
                              handleConversationAction("désactivé")
                            }
                            className="hover:bg-gray-200 rounded-full px-2 py-2.5 cursor-pointer"
                            title="désactiver l'accès à cette conversation"
                          >
                            <MouseOff className="h-4" />
                          </span>
                          <span
                            onClick={() => handleConversationAction("supprimé")}
                            className="hover:bg-gray-200 rounded-full px-2 py-2.5 cursor-pointer"
                            title="supprimer cette conversation"
                          >
                            <Trash className="h-4" />
                          </span>
                        </>
                      ) : (
                        <span
                          onClick={() => handleConversationAction("activé")}
                          className="hover:bg-gray-200 rounded-full px-3 py-2.5 cursor-pointer flex items-center space-x-1"
                          title="activer cette conversation"
                        >
                          <span>activer</span>
                          <CheckCircle className="h-4" />
                        </span>
                      )}
                    </div>
                  </span>
                );
              })()}
              <div></div>
            </motion.div>
          )}
        </AnimatePresence>

        <div>
          <table className="w-full bg-gray-50 p-4 my-4 text-sm text-gray-600 text-center">
            <tbody>
              {allConversationsReducer
                .filter((c) => {
                  const courtier = courtiers.find(
                    (crt) => crt.id === Number(c.courtierId)
                  );
                  const client = users.find(
                    (user) => user.id === Number(c.clientId)
                  );

                  const courtierName =
                    (
                      courtier?.user?.nom +
                      " " +
                      courtier?.user?.prenom
                    )?.toLowerCase() || "";
                  const clientName =
                    (client?.nom + " " + client?.prenom)?.toLowerCase() || "";

                  return (
                    courtierName.includes(searchTerm) ||
                    clientName.includes(searchTerm)
                  );
                })
                .map((c) => (
                  <tr
                    className="border-b border-gray-200 hover:bg-gray-100 cursor-pointer"
                    key={c.id}
                    onClick={async () => {
                      await dispatch({
                        type: "SET_CURRENT_CONVERSATION",
                        payload: c,
                      });
                      setShowConversationInterface(true);
                      setConversation(c);
                    }}
                  >
                    <td className="px-4">
                      <input
                        type="checkbox"
                        checked={selectedConversation === c._id}
                        onClick={(e) => e.stopPropagation()}
                        onChange={() => {
                          handleCheckboxChange(c._id);
                        }}
                      />
                    </td>
                    <td className="py-2 flex space-x-2 items-center">
                      <div className="relative">
                        <img
                          src={
                            courtiers.find(
                              (crt) => crt.id === Number(c.courtierId)
                            )?.user?.image
                          }
                          className="w-6 h-6 rounded-full cursor-pointer"
                          alt="courtier"
                          title={`Role : courtier\nNom Complet : ${
                            courtiers.find(
                              (crt) => crt.id === Number(c.courtierId)
                            )?.user?.nom +
                            " " +
                            courtiers.find(
                              (crt) => crt.id === Number(c.courtierId)
                            )?.user?.prenom
                          }\nEmail : ${
                            courtiers.find(
                              (crt) => crt.id === Number(c.courtierId)
                            )?.user?.email
                          }`}
                        />
                        <BadgeCheck className="h-4 text-white fill-blue-600 ml-1 absolute -top-2 -right-3" />
                      </div>
                      <p>
                        {courtiers.find(
                          (crt) => crt.id === Number(c.courtierId)
                        )?.user?.nom +
                          " " +
                          courtiers.find(
                            (crt) => crt.id === Number(c.courtierId)
                          )?.user?.prenom}
                      </p>
                    </td>
                    <td className="py-2">
                      <div className="flex space-x-1 items-center">
                        <img
                          src={
                            users.find((user) => user.id === Number(c.clientId))
                              ?.image
                          }
                          className="w-6 h-6 rounded-full cursor-pointer"
                          alt="user"
                          title={`Role : utilisateur\nNom Complet : ${
                            users.find((user) => user.id === Number(c.clientId))
                              ?.nom +
                            " " +
                            users.find((user) => user.id === Number(c.clientId))
                              ?.prenom
                          }\nEmail : ${
                            users.find((user) => user.id === Number(c.clientId))
                              ?.email
                          }`}
                        />
                        <p>
                          {users.find((user) => user.id === Number(c.clientId))
                            ?.nom +
                            " " +
                            users.find((user) => user.id === Number(c.clientId))
                              ?.prenom}
                        </p>
                      </div>
                    </td>
                    <td className="py-2 overflow-hidden px-4">
                      <div className="flex justify-between">
                        <div className="flex space-x-1">
                          <span className="font-semibold text-black">
                            {c.messages[c.messages.length - 1]?.senderId
                              ? c.messages[c.messages.length - 1]?.senderId ===
                                c.clientId
                                ? users.find(
                                    (u) =>
                                      u.id ==
                                      Number(
                                        c.messages[c.messages.length - 1]
                                          ?.senderId
                                      )
                                  )?.nom +
                                  " " +
                                  users.find(
                                    (u) =>
                                      u.id ==
                                      Number(
                                        c.messages[c.messages.length - 1]
                                          ?.senderId
                                      )
                                  )?.prenom
                                : c.messages[c.messages.length - 1]
                                    ?.senderId === c.courtierId
                                ? courtiers.find(
                                    (crt) =>
                                      crt.id ==
                                      Number(
                                        c.messages[c.messages.length - 1]
                                          ?.senderId
                                      )
                                  )?.user?.nom +
                                  " " +
                                  courtiers.find(
                                    (crt) =>
                                      crt.id ==
                                      Number(
                                        c.messages[c.messages.length - 1]
                                          ?.senderId
                                      )
                                  )?.user?.prenom
                                : "sender"
                              : "Assistant"}{" "}
                            :
                          </span>
                          <span>
                            {c.lastMessage.length > 50 ? (
                              <div>{c.lastMessage.substring(0, 50)}..</div>
                            ) : (
                              c.lastMessage
                            )}
                          </span>
                        </div>
                        <span className="text-xs">
                          {c.messages[c.messages.length - 1]?.createdAt &&
                            new Date(
                              c.messages[c.messages.length - 1]?.createdAt
                            ).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                              hour12: true,
                            })}
                        </span>
                      </div>
                    </td>
                    <td className="py-3">
                      <span
                        className={`px-2 py-1 rounded-xl text-xs text-white ${
                          c.status === "en cours.." || c.status === "activé"
                            ? "bg-green-500"
                            : c.status === "supprimé"
                            ? "bg-red-500"
                            : c.status === "blocké"
                            ? "bg-purple-950"
                            : "bg-gray-400"
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="text-black pe-4">
                      {new Date(c.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {showConversationInterface && (
        <ConversationInterface
          setShowConversationInterface={setShowConversationInterface}
          conversation={conversation}
        />
      )}
    </div>
  );
}

export default Conversations;
