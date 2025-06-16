import { MessagesSquare, SquareDashedMousePointer } from "lucide-react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ConversationInterface from "./ConversationInterface";

function ConversationsProcess() {
  const allConversationsReducer = useSelector(
    (state) => state.allConversationsReducer
  );
  const biens = useSelector((state) => state.BienReducer);
  const courtiers = useSelector((state) => state.AllCourtiersReducer);
  const users = useSelector((state) => state.usersReducer);
  const [showConversationInterface, setShowConversationInterface] =
    useState(false);
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <h1 className="text-lg font-semibold">
          Compte rendu des conversations
        </h1>
      </div>
      <div className="mt-2">
        {allConversationsReducer.length > 0 ? (
          <table className="border border-gray-300 rounded p-2 w-full text-sm text-center">
            <tbody>
              {allConversationsReducer.map((c) => (
                <tr className="hover:bg-gray-300">
                  <td className="px-2 py-4 flex space-x-1">
                    <img
                      src={
                        courtiers.find((crt) => crt.id === Number(c.courtierId))
                          ?.user?.image
                      }
                      className="w-6 h-6 rounded-full cursor-pointer"
                      alt="courtier"
                      title={`
                          Role : courtier\nNom Complet : ${
                            courtiers.find(
                              (crt) => crt.id === Number(c.courtierId)
                            )?.user?.nom +
                            " " +
                            courtiers.find(
                              (crt) => crt.id === Number(c.courtierId)
                            )?.user?.prenom
                          }\nEmail : ${
                        courtiers.find((crt) => crt.id === Number(c.courtierId))
                          ?.user?.email
                      }
                        `}
                    />
                    <img
                      src={
                        users.find((user) => user.id === Number(c.clientId))
                          ?.image
                      }
                      className="w-6 h-6 rounded-full cursor-pointer"
                      alt="user"
                      title={`
                          Role : utilisateur\nNom Complet : ${
                            users.find((user) => user.id === Number(c.clientId))
                              ?.nom +
                            " " +
                            users.find((user) => user.id === Number(c.clientId))
                              ?.prenom
                          }\nEmail : ${
                        users.find((user) => user.id === Number(c.clientId))
                          ?.email
                      }
                        `}
                    />
                  </td>
                  <td> </td>
                  <td>
                    {" "}
                    <img
                      src={
                        biens.find((bien) => bien.id === Number(c.BienId))
                          ?.images[0]
                      }
                      className="w-6 h-6 rounded cursor-pointer"
                      alt="user"
                      title={`
                          Title : ${
                            biens.find((bien) => bien.id === Number(c.BienId))
                              ?.title
                          }\nStatus : ${c.status}
                        `}
                    />
                  </td>
                  <td>
                    <span
                      className={`px-2 py-0.5 rounded-xl  text-white ${
                        c.status === "en cours.."
                          ? "bg-green-500"
                          : "bg-gray-400"
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td>
                    <SquareDashedMousePointer
                      className="h-5 w-5 hover:text-red-500 cursor-pointer"
                      title="aller à la conversation"
                      onClick={async () => {
                        await dispatch({
                          type: "SET_CURRENT_CONVERSATION",
                          payload: c,
                        });
                        setShowConversationInterface(true);
                        // setConversation(c);
                      }}
                    />
                  </td>
                  {showConversationInterface && (
                    <ConversationInterface
                      setShowConversationInterface={
                        setShowConversationInterface
                      }
                      conversation={c}
                    />
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          "Aucune Conversation .."
        )}
      </div>
    </div>
  );
}

export default ConversationsProcess;
