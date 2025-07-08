import React, { useEffect, useRef, useState } from "react";
import { Link2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import {
  faPaperPlane,
  faSpinner,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { msgChatAi } from "../../redux/actions";
import generatePrompt from "./prompt";
import { Link } from "react-router-dom";
import { GoogleGenAI } from "@google/genai";
const ChatAI = ({ onClose }) => {
  const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_OPENAI_KEY });
  const messagesChatAi = useSelector((state) => state.ChatAiReducer);
  const [thinking, setThinking] = useState(false);
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const conversationRef = useRef(null);
  const Biens = useSelector((state) => state.BienReducer);
  const [isSending, setIsSending] = useState(false);

  const [suggestionQst, setSuggestionQst] = useState([
    "C'est quoi LocaTech ?",
    "Comment ça marche ?",
    "Comment je peux acheter un bien ?",
    "Comment je peux louer un bien ?",
    "Comment je peux vendre un bien ?",
    "Comment je peux louer mon bien ?",
  ]);
  useEffect(() => {
    const stored = sessionStorage.getItem("chatMessages");
    if (stored) {
      JSON.parse(stored).forEach((msg) => {
        console.log(msg);
        
        dispatch(msgChatAi(msg));
      });
    }
  }, [dispatch]);

  useEffect(() => {
    if (conversationRef.current) {
      conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
    }
  }, [messagesChatAi]);

  const saveMessageToSession = (msg) => {
    let stored = sessionStorage.getItem("chatMessages");
    let messages = stored ? JSON.parse(stored) : [];
    messages.push(msg);
    const last10 = messages.slice(-10);
    sessionStorage.setItem("chatMessages", JSON.stringify(last10));
  };

  const sendMessage = async (suggestion = null) => {
    const userMessage = suggestion || input.trim();
    if (userMessage === "" || isSending) return;

    setIsSending(true);
    dispatch(msgChatAi({ data: userMessage, role: "user" }));
    setInput("");
    setThinking(true);
    saveMessageToSession({ data: userMessage, role: "user" });
    try {
      const response = await axios.post(
        `/api/ai-assistant`,
        {
          message: userMessage,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(response);
      dispatch(
        msgChatAi({
          data: response?.data?.reply || "No response",
          role: "ai",
          suggestions: response?.data?.suggestions || [],
        })
      );
      saveMessageToSession({
        data: response?.data?.reply || "No response",
        role: "ai",
        suggestions: response?.data?.suggestions || [],
      });
    } catch (error) {
      console.log(error?.response?.data?.message);
    } finally {
      setIsSending(false);
      setThinking(false);
    }
  };

  const handleSendMessageWithDelay = () => {
    setTimeout(sendMessage, 500);
  };

  return (
    <motion.div
      className="absolute lg:absolute bg-white border border-gray-200 lg:rounded-lg shadow-md w-full lg:w-1/2  h-[100vh] lg:h-[500px] flex flex-col "
      style={{ zIndex: 1003 }}
      onClick={(e) => e.stopPropagation()}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="lg:static sticky top-0 w-full flex items-center justify-between py-3 px-4 border-b border-gray-200 bg-white">
        <div className="flex items-center space-x-2 ">
          <Sparkles className="text-purple-500 text-lg" />
          <h2 className="text-xl md:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-500 to-red-500">
            LocaTech ChatAI
          </h2>
        </div>
        <button
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={onClose}
        >
          <FontAwesomeIcon icon={faXmark} className="w-5 h-5" />
        </button>
      </div>

      <div
        ref={conversationRef}
        className="p-4 overflow-y-auto flex-1 space-y-2 custom-scrollbar"
        id="conversation"
      >
        <div className="flex flex-wrap gap-2 my-4 ">
          {suggestionQst.map((qst, index) => (
            <div>
              <button
                key={index}
                className="cursor-pointer bg-gray-100 text-gray-800 rounded-lg px-3 py-2 text-sm hover:bg-gray-200"
                onClick={() => {
                  sendMessage(qst);
                }}
              >
                {qst}
              </button>
            </div>
          ))}
        </div>
        {messagesChatAi && messagesChatAi.length > 0 ? (
          messagesChatAi.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.role === "ai" ? "justify-start" : "justify-end"
              } mb-4`}
            >
              <div
                className={`max-w-[80%] rounded-xl p-4 text-sm break-words shadow ${
                  msg.role === "ai"
                    ? "bg-gray-100 text-gray-800"
                    : "bg-red-100 text-gray-800"
                }`}
              >
                {msg.role === "ai" && (
                  <div>
                    <div className="flex items-center mb-2">
                      <Sparkles className="text-gray-400 mr-2 h-4 w-4" />
                      <span className="text-xs text-gray-500">Assistant</span>
                    </div>
                    <p className="leading-relaxed whitespace-pre-wrap">
                      {msg.data}
                    </p>

                    {/* {biensSuggestions?.length > 0 && (
                      <div className="mt-3">
                        {biensSuggestions.map((b, idx) => (
                          <Link
                            to={`/bien/${b.ville}/${b.slag}`}
                            key={idx}
                            className="block font-medium text-sm text-blue-600 hover:underline hover:text-red-500"
                          >
                            <span>{idx + 1} - </span>
                            {b.title} - {b.ville}
                          </Link>
                        ))}
                      </div>
                    )} */}
                    {msg?.suggestions?.length > 0 && (
                      <div className="mt-3">
                        {msg.suggestions.map((b, idx) => (
                          <Link
                            to={`/bien/${b.ville}/${b.slag}`}
                            key={idx}
                            className="block font-medium text-sm text-blue-600 hover:underline hover:text-blue-800"
                          >
                            <span>{idx + 1} - </span>
                            {b.title} - {b.ville}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {msg.role === "user" && (
                  <div>
                    <p className="leading-relaxed whitespace-pre-wrap">
                      {msg.data}
                    </p>
                    <div className="text-xs text-right mt-2 font-semibold opacity-80">
                      Vous
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">
            Démarrer une conversation...
          </p>
        )}
        {thinking && (
          <div className="flex justify-start">
            <div className="rounded-lg p-3 text-sm bg-gray-100 text-gray-800 w-fit">
              <FontAwesomeIcon
                icon={faSpinner}
                className="animate-spin w-5 h-5"
              />
            </div>
          </div>
        )}
      </div>

      <div className="p-3 border-t fixed bottom-0 w-full lg:static border-gray-200 mb-2">
        <div className="flex items-center">
          <textarea
            className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Poser vos questions..."
            onKeyDown={(e) =>
              e.key === "Enter" && !e.shiftKey && handleSendMessageWithDelay()
            }
            rows={1}
          />

          <button
            onClick={handleSendMessageWithDelay}
            className={`flex items-center lg:space-x-2 ml-2 px-4 py-3 lg:py-2 rounded-md text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-purple-400 ${
              thinking || input.trim() === "" || isSending
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-purple-500 hover:bg-purple-600 cursor-pointer"
            }`}
            disabled={thinking || input.trim() === "" || isSending}
          >
            {thinking ? (
              <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
            ) : (
              <FontAwesomeIcon icon={faPaperPlane} />
            )}
            <span className="hidden lg:block">Envoyer</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatAI;
