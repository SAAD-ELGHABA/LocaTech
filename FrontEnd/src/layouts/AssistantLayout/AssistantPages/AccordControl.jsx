import axios from "axios";
import {
  BadgeCheck,
  Ban,
  HandshakeIcon,
  LoaderCircle,
  MessagesSquare,
  TrendingUp,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TextDisplay from "../../../components/TextDisplay";
import { useDispatch, useSelector } from "react-redux";
import ConversationInterface from "../AssistantComponents/ConversationInterface";
import Dropdown from "../../../components/Dropdown";

function AccordControl() {
  const [accords, setAccords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [idSignal, setIdSignal] = useState(null);
  const [showConversationInterface, setShowConversationInterface] =
    useState(false);
  const dispatch = useDispatch();
  const allConversationsReducer = useSelector(
    (state) => state.allConversationsReducer
  );
  const fetchAccords = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`/api/get-accords`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setAccords(res?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchAccords();
  }, []);
  const [selectedOption, setSelectedOption] = useState("");
  return isLoading ? (
    <div className="h-[50vh] flex justify-center items-center">
      <LoaderCircle className="text-red-500 h-8 w-8 animate-spin" />
    </div>
  ) : accords?.length > 0 ? (
    <div className="mx-8 my-4">
      <div className="flex items-center space-x-2 mb-6">
        <h1 className="text-xl font-semibold">Accords</h1>
        <HandshakeIcon />
      </div>
      <ul>
        {accords?.map((a) => (
          <li key={a?.id} className="border-b border-gray-300 py-4 px-2 ">
            <div className="flex items-center space-x-4">
              <div>
                <Link to={`/bien/${a?.bien?.ville}/${a?.bien?.slag}`}>
                  <img
                    src={a?.bien?.images[0]}
                    alt="bien-index-image"
                    className="w-36 h-22 rounded"
                  />
                </Link>
              </div>
              <div className="flex flex-col space-y-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <img
                      src={a?.courtier?.user?.image}
                      alt="client-image"
                      className="h-8 w-8 rounded-full"
                    />
                    <BadgeCheck className="h-4 text-white fill-blue-600 ml-1 absolute -top-2 -right-3" />
                  </div>
                  <span>
                    <h6>
                      {a?.courtier?.user?.nom} {a?.courtier?.user?.prenom}
                      {" (courtier)"}
                    </h6>
                    <p className="text-xs">{a?.courtier?.user?.email}</p>
                    <p className="text-xs">{a?.courtier?.user?.telephone}</p>
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <img
                    src={a?.user?.image}
                    alt="client-image"
                    className="h-8 w-8 rounded-full"
                  />
                  <span>
                    <h6>
                      {a?.user?.nom} {a?.user?.prenom}
                    </h6>
                    <p className="text-xs">{a?.user?.email}</p>
                    <p className="text-xs">{a?.user?.telephone}</p>
                  </span>
                </div>
              </div>
              <div
                className={`py-2 px-4 flex items-center justify-center space-x-2
                      ${
                        a?.status === "accepted"
                          ? "text-green-500"
                          : a?.status === "rejected"
                          ? "text-red-500"
                          : "text-yellow-500"
                      }
                      `}
              >
                <span>{a?.status}</span>
                <TrendingUp
                  className={`${
                    a?.status === "accepted"
                      ? "rotate-0"
                      : a?.status === "rejected"
                      ? "rotate-180"
                      : "none"
                  }`}
                />
              </div>
              <div>
                <TextDisplay commentaire={a?.commentaire} maxLength={20} />
              </div>
              <div className="text-xs ">
                <button
                  className="flex items-center space-x-2 hover:text-red-500 cursor-pointer"
                  onClick={async () => {
                    await dispatch({
                      type: "SET_CURRENT_CONVERSATION",
                      payload: allConversationsReducer?.find(
                        (c) =>
                          Number(c?.BienId) === a?.bienId &&
                          Number(c?.clientId) === a?.user?.id &&
                          Number(c?.courtierId) === a?.courtier?.id
                      ),
                    });
                    setShowConversationInterface(true);
                  }}
                >
                  <MessagesSquare className="h-4 w-4" />
                  <span>historique des discussions</span>
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between w-full">
              <div className="text-xs text-gray-500  mt-2">
                {new Date(a?.created_at).toLocaleString()}
              </div>
              <div className="text-xs text-gray-500  mt-2">
                <Dropdown
                  options={["Option 1", "Option 2", "Option 3"]}
                  selected={selectedOption}
                  setSelected={setSelectedOption}
                  placeholder="Choose an option"
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
      {showConversationInterface && (
        <ConversationInterface
          setShowConversationInterface={setShowConversationInterface}
        />
      )}
    </div>
  ) : (
    <div className="h-[50vh] flex justify-center items-center">
      <Ban />
    </div>
  );
}

export default AccordControl;
