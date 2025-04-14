import { useEffect, useRef, useState } from "react";
import { Sparkles } from "lucide-react";

const ChatAI = ({ ville, selectedType, budget }) => {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [spin, setSpin] = useState(false);
  const chatRef = useRef(null);

  const playSound = () => {
    const sound = new Audio("/path-to-sound/beep.mp3");
    sound.play();
  };

  const handleSend = async () => {
    if (!message.trim()) return;
  
    setChat((prev) => [...prev, { role: "user", content: message }]);
    setMessage("");
    playSound();
  
    const userMessage = `
      Tu es un assistant intelligent pour le site LocaTech, spécialisé dans l'immobilier au Maroc.
      Ta mission est d'aider les utilisateurs, répondre à toutes leurs questions, et leur donner des conseils utiles sur les services du site LocaTech.
      Réponds toujours en français, avec un minimum de 50 caractères.
      Ne te limite pas aux salutations.
  
      Voici la question de l'utilisateur :
      "${message}"
  
      Critères de l'utilisateur :
      - Ville : ${ville || "non spécifiée"}
      - Type : ${selectedType || "non spécifié"}
      - Budget : ${budget || "non spécifié"}
    `;
  
    try {
      const response = await fetch("/api/gemini-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });
  
      const data = await response.json();
      const assistantReply = data.reply || "";
  
      const defaultReply =
        "Merci pour votre question ! Voici quelques conseils : explorez les biens disponibles, filtrez selon vos besoins, et utilisez notre moteur de recherche avancé.";
  
      const finalReply =
        assistantReply.length < 50 ? defaultReply : assistantReply;
  
      setChat((prev) => [...prev, { role: "assistant", content: finalReply }]);
      playSound();
    } catch (error) {
      setChat((prev) => [
        ...prev,
        { role: "assistant", content: "Désolé, une erreur est survenue lors de la réponse." },
      ]);
    }
  };
  

  useEffect(() => {
    setSpin(true);
    const timer = setTimeout(() => setSpin(false), 500);
    return () => clearTimeout(timer);
  }, [chat]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chat]);

  return (
    <div className="w-full max-w-3xl mx-auto bg-white border border-gray-200 rounded-xl shadow-lg p-4 md:p-6 space-y-4">
      <div className="flex items-center justify-center space-x-2 mb-4 md:mb-6">
        <div className={`${spin ? "animate-spin-fast" : ""} transform rotate-0 origin-center`}>
          <Sparkles className="w-8 h-8 text-purple-500" />
        </div>
        <h2 className="text-xl md:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-500 to-red-500">
          LocaTech ChatAI
        </h2>
      </div>

      <div ref={chatRef} className="h-64 md:h-72 overflow-y-auto space-y-2 border rounded-md p-4 bg-gray-50 scroll-smooth">
  {chat.map((msg, i) => (
    <div key={i} className={`whitespace-pre-line ${msg.role === "user" ? "text-right text-blue-600" : "text-left text-purple-600"}`}>
      <p>{msg.content}</p>
    </div>
  ))}
</div>


      <div className="flex flex-col sm:flex-row gap-2 mt-4">
        <input
          type="text"
          className="flex-1 border border-gray-300 rounded-md px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-400"
          placeholder="Posez une question sur LocaTech..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="relative inline-block p-[1px] rounded-md bg-gradient-to-r from-purple-500 via-blue-500 to-red-500 hover:opacity-90 transition-all duration-300 transform hover:scale-105 hover:shadow-md"
        >
          <span className="block bg-white px-4 py-2 rounded cursor-pointer">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-500 to-red-500 font-semibold">
              Envoyer
            </span>
          </span>
        </button>
      </div>
    </div>
  );
};

export default ChatAI;
