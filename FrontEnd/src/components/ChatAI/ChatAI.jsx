// ChatAI.jsx
import React, { useEffect, useRef, useState } from "react";
import { Link2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faSpinner,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { msgChatAi } from "../../redux/actions";
import generatePrompt from "./prompt";
import { Link } from "react-router-dom";

const ChatAI = ({ onClose }) => {
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
    if (conversationRef.current) {
      conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
    }
  }, [messagesChatAi]);

  const sendMessage = async (suggestion = null) => {
    const userMessage = suggestion || input.trim();
    if (userMessage === "" || isSending) return;

    setIsSending(true);
    dispatch(msgChatAi({ data: userMessage, role: "user" }));
    setInput("");
    setThinking(true);

    const prompt = generatePrompt(userMessage, Biens);

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    };

    try {
      const response = await fetch(
        import.meta.env.VITE_OPENAI_API_URL,
        options
      );
      const data = await response.json();

      if (
        response.ok &&
        data.candidates &&
        data.candidates[0]?.content?.parts?.[0]
      ) {
        dispatch(
          msgChatAi({
            data: data.candidates[0].content.parts[0].text,
            role: "ai",
          })
        );
      } else {
        toast.error("Un erreur quand parler avec l'assistant ai.");
      }
    } catch (error) {
      console.error("Error fetching AI response:", error);
      toast.error("Error communicating with AI.");
    } finally {
      setThinking(false);
      setIsSending(false);
    }
  };

  const handleSendMessageWithDelay = () => {
    setTimeout(sendMessage, 500);
  };

  return (
    <div
      className="absolute bg-white border border-gray-200 rounded-lg shadow-md w-1/2  h-[500px] flex flex-col "
      style={{ zIndex: 1003 }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-center justify-between py-3 px-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
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
        className="p-4 overflow-y-auto flex-1 space-y-2"
        id="conversation"
      >
        <div className="flex flex-wrap gap-2 my-4">
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
              }`}
            >
              <div
                className={`rounded-lg p-3 text-sm break-words ${
                  msg.role === "ai" ? " text-gray-800" : "bg-red-100 text-black"
                } w-4/5`}
              >
                {msg.role === "ai" && (
                  <Sparkles className="text-gray-400 inline-block mr-1 align-text-bottom h-4" />
                )}
                {msg.data
                  .split(/<link>(.*?)<\/link>/)
                  .map((part, partIndex) => {
                    const linkMatch = part.match(/^(.*)\((.*?)\)$/);
                    if (linkMatch) {
                      const text = linkMatch[1];
                      const to = linkMatch[2];
                      return (
                        <div className="block border rounded border-gray-400 px-2 py-1 hover:bg-red-100">
                          <Link2 className="h-4" />
                          <Link key={`link-${index}-${partIndex}`} to={to}>
                            {text}
                          </Link>
                        </div>
                      );
                    }
                    return (
                      <span key={`span-${index}-${partIndex}`}>{part}</span>
                    );
                  })}
                {msg.role === "user" && (
                  <div className="text-red-600 font-semibold text-xs text-right mt-1">
                    Vous
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

      <div className="p-3 border-t border-gray-200">
        <div className="flex items-center">
          <input
            className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Poser vos questions..."
            onKeyDown={(e) => e.key === "Enter" && handleSendMessageWithDelay()}
          />
          <button
            onClick={handleSendMessageWithDelay}
            className={`flex items-center space-x-2 ml-2 px-4 py-2 rounded-md text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-purple-400 ${
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
            <span>Envoyer</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatAI;
