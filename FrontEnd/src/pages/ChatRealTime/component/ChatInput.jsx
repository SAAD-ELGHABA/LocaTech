import { useRef, useEffect, useState } from "react";
import { handleSendMessage } from "../../../functions/handleSendMsg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { Send, MessageCircleQuestion } from "lucide-react";

const ChatInput = ({
  dispatch,
  currentConversation,
  userId,
  isAssistant = false,
}) => {
  const textareaRef = useRef(null);
  const [inputValue, setInputValueInterne] = useState("");
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [inputValue]);

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    setIsSending(true);
    await handleSendMessage(
      dispatch,
      currentConversation,
      userId,
      inputValue,
      setIsSending
    );

    setInputValueInterne("");
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      await sendMessage();
    }
  };

  return (
    <div
      className={`py-4 max-h-50 ${
        !isAssistant
          ? "bg-[#161a1d] text-white"
          : "border-gray-300 border rounded bg-white"
      } w-full px-4 flex items-center justify-between gap-2 `}
    >
      <textarea
        ref={textareaRef}
        rows={1}
        className={`border-none outline-none focus:outline-none bg-transparent w-full resize-none overflow-auto no-scrollbar ${
          !isAssistant &&
          currentConversation?.status !== "activé" &&
          currentConversation?.status !== "en cours.."
            ? "cursor-not-allowed bg-gray-300 text-gray-500" // Apply disabled look
            : ""
        }`}
        placeholder="Votre message.."
        onChange={(e) => {
          setInputValueInterne(e.target.value);
        }}
        value={inputValue}
        onKeyDown={handleKeyDown}
        disabled={
          !isAssistant &&
          currentConversation?.status !== "activé" &&
          currentConversation?.status !== "en cours.."
        }
      />

      {inputValue.trim() ? (
        <button onClick={sendMessage} disabled={isSending} className="ml-2">
          {isSending ? (
            <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
          ) : (
            <Send />
          )}
        </button>
      ) : (
        <MessageCircleQuestion className="ml-2" />
      )}
    </div>
  );
};

export default ChatInput;
