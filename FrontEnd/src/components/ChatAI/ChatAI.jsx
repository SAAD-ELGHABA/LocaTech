import React, { useEffect, useRef, useState } from "react";
import { Sparkles } from "lucide-react";
import { toast } from "sonner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faSpinner, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { msgChatAi } from "../../redux/actions";
import generatePrompt from "./prompt"; // ✅ had prompt.js dyalek

const ChatAI = ({ onClose }) => {
  const messagesChatAi = useSelector((state) => state.ChatAiReducer);
  const [thinking, setThinking] = useState(false);
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const conversationRef = useRef(null);
  const test = ''
  useEffect(() => {
    if (conversationRef.current) {
      conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
    }
  }, [messagesChatAi]);

  const sendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = input.trim();
    dispatch(msgChatAi({ data: userMessage, role: "user" }));
    setInput("");
    setThinking(true);

    // ✅ Generate prompt dynamiquement
    const prompt = generatePrompt(userMessage);

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    };

    try {
      const response = await fetch(import.meta.env.VITE_OPENAI_API_URL, options);
      const data = await response.json();

      if (
        response.ok &&
        data.candidates &&
        data.candidates[0] &&
        data.candidates[0].content &&
        data.candidates[0].content.parts &&
        data.candidates[0].content.parts[0]
      ) {
        dispatch(
          msgChatAi({
            data: data.candidates[0].content.parts[0].text,
            role: "ai",
          })
        );
      } else {
        toast.error("Failed to get response from AI.");
      }
    } catch (error) {
      console.error("Error fetching AI response:", error);
      toast.error("Error communicating with AI.");
    } finally {
      setThinking(false);
    }
  };

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-200 rounded-lg shadow-md w-full max-w-md h-[500px] flex flex-col z-50">
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

      {/* Chat Conversation */}
      <div
        ref={conversationRef}
        className="p-4 overflow-y-auto flex-1 space-y-2"
        id="conversation"
      >
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
                  msg.role === "ai"
                    ? "bg-gray-100 text-gray-800"
                    : "bg-blue-100 text-blue-800"
                } w-2/3`}
              >
                {msg.role === "ai" && (
                  <Sparkles className="text-gray-400 inline-block mr-1 align-text-bottom h-4" />
                )}
                {msg.data}
                {msg.role === "user" && (
                  <div className="text-blue-600 font-semibold text-xs text-right mt-1">
                    You
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">Start a conversation...</p>
        )}
        {thinking && (
          <div className="flex justify-start">
            <div className="rounded-lg p-3 text-sm bg-gray-100 text-gray-800 w-fit">
              <FontAwesomeIcon icon={faSpinner} className="animate-spin w-5 h-5" />
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-3 border-t border-gray-200">
        <div className="flex items-center">
          <input
            className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-400"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Poser vos questions..."
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className={`ml-2 px-4 py-2 rounded-md text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-purple-400 ${
              thinking || input.trim() === ""
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-purple-500 hover:bg-purple-600 cursor-pointer"
            }`}
            disabled={thinking || input.trim() === ""}
          >
            <FontAwesomeIcon icon={faPaperPlane} /> Envoyer
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatAI;
