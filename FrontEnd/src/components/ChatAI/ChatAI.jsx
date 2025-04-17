import { useEffect, useRef, useState } from "react";
import { Cpu } from "lucide-react";
// import spinner from "../Assets/spinner.gif";
import { toast } from "sonner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faPaperPlane, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { msgChatAi } from "../../redux/actions";
import { Link } from "react-router-dom";

const ChatBot = () => {
  const messagesChatAi = useSelector((state) => state.ChatAiReducer);
  const [thinking, setThinking] = useState(false);
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const conversationRef = useRef(null);
  useEffect(() => {
    if (conversationRef.current) {
      conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
    }
  }, [messagesChatAi]);

  const sendMessage = async () => {
    if (input.trim() === "") return;
    dispatch(msgChatAi({ data: input, role: "user" }));

    setThinking(true);
    const languages = [
      "javascript",
      "python",
      "php",
      "html",
      "css",
      "bootstrap",
      "react",
      "laravel",
      "java",
    ];
    const prompt = `You are a virtual guide. Talk under 20 words just about the programming languages: ${languages}. Help the user navigate the platform. Question: ${input}`;

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }),
    };

    try {
      const response = await fetch(
        import.meta.env.VITE_OPENAI_API_URL,
        options
      );
      const data = await response.json();
      if (response.ok) {
        dispatch(
          msgChatAi({
            data: data.candidates[0].content.parts[0].text,
            role: "ai",
          })
        );
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    } finally {
      setThinking(false);
      setInput("");
    }
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center shadow shadow-blue-500">
      <div className="w-full max-w-md mx-auto overflow-hidden">
        <div className="flex flex-col h-[500px]">
          <div
            ref={conversationRef}
            className={`flex-1 px-4 py-5 overflow-y-auto ${
              messagesChatAi.length > 0
                ? "space-y-3"
                : "flex items-center justify-center"
            }`}
            id="conversation"
          >
            {messagesChatAi && messagesChatAi.length > 0 ? (
              messagesChatAi.map((msg, index) =>
                msg.role === "ai" ? (
                  <div key={index} className="w-full flex justify-start">
                    <div className="flex items-start space-x-2 bg-[#25538b2f] p-3 rounded w-2/3">
                      <Cpu className="text-gray-400 text-lg" />
                      <p className="text-gray-100 text-sm">{msg.data}</p>
                    </div>
                  </div>
                ) : (
                  <div key={index} className="w-full flex justify-end">
                    <div className="flex items-end text-sm justify-start space-x-2 w-2/3 bg-[#163050] text-gray-100 p-3 rounded ">
                      <div>
                        <div className="font-bold text-gray-400">You</div>
                        <p>{msg.data}</p>
                      </div>
                    </div>
                  </div>
                )
              )
            ) : (
              <p className="text-gray-500 text-center">
                Start a conversation...
              </p>
            )}
          </div>
          <div className="border w-5/6 mx-auto border-blue-500 rounded flex">
            <input
              className="flex-1 rounded-lg px-4 py-2 text-gray-200 focus:ring-none focus:outline-none"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
            />
            <button
              onClick={sendMessage}
              className={`${input.length == 0 ? 'cursor-not-allowed':"cursor-pointer" } text-gray-900 ml-4 px-4 py-2 ${
                thinking
                  ? "bg-gray-900 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}
              disabled={thinking}
            >
              {thinking ? (
                // <img
                //   src={spinner}
                //   alt="Loading..."
                //   className="w-5 h-5 mx-auto"
                // />
                <FontAwesomeIcon icon={faSpinner} className="animate-spin" />
                
              ) : (
                <FontAwesomeIcon icon={faPaperPlane} />
              )}
            </button>
          </div>
        </div>
      </div>
      <div className="flex space-x-2 text-sm items-center w-full -mb-12 pt-2 ms-5 text-blue-400">
        <Link
          className="flex items-center hover:bg-gray-800 px-4 py-2"
          to={"/help"}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
          <p>Go to chat</p>
        </Link>
      </div>
    </div>
  );
};

export default ChatBot;
