import React from "react";
import Aside from "./component/Aside";
import { Outlet } from "react-router";
import { MessageCircleQuestion } from "lucide-react";

function ChatRealTimePage() {
  return (
    <div>
      <div className="flex ">
        <div className="w-2/6 ">
          <Aside />
        </div>
        <div className="w-4/6 ">
          <Outlet />
        </div>
      </div>
      <div className="fixed bottom-4 left-4 text-[#161a1d] p-3 rounded-full shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer bg-white">
        <MessageCircleQuestion className="text-[#161a1d]" size={20} />
      </div>
    </div>
  );
}

export default ChatRealTimePage;
