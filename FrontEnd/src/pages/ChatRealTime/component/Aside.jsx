import React from "react";
import Logo from "../../../components/Logo";
import { useSelector } from "react-redux";

function Aside() {
    const conversations = useSelector((state) => state.conversationsReducer);
    const courtiers = useSelector((state) => state.AllCourtiersReducer);
    const users = useSelector((state) => state.usersReducer);
  return (
    <div className="flex flex-col justify-start space-y-2 items-center w-full h-screen bg-[#161a1d] p-4 sticky top-0 text-white overflow-y-auto">
      <div>
        <h1 className="text-xl font-semibold">LocaTech</h1>
      </div>
      <hr className="border-1 border-gray-700 w-full"/>
      <div>
        {
            conversations.map((conversation) => (
                <div key={conversation.id} className="flex items-center mb-4">
                <img
                    src={conversation.image || "https://via.placeholder.com/150"}
                    alt="User"
                    className="w-10 h-10 rounded-full mr-2"
                />
                <div className="flex flex-col">
                    <span className="text-sm font-semibold">{conversation.name || 'title conversation'}</span>
                    <span className="text-xs text-gray-400">{conversation.lastMessage}</span>
                </div>
                </div>
            ))
        }
      </div>
    </div>
  );
}

export default Aside;
