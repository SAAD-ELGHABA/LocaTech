import React, { useEffect } from "react";
import { Outlet } from "react-router";
import NavBar from "./AssistantComponents/NavBar";
import Aside from "./AssistantComponents/Aside";
import axios from "axios";
import { useDispatch } from "react-redux";
import { socketListener } from "../../functions/socketListener.js";
import { promiseConversation } from "./functions/promiseConversation.js";
function AssistantIndex() {
  const dispatch = useDispatch();
  const cleanup = socketListener(dispatch, 0);
  cleanup();
  useEffect(() => {
    const promise = async () => {
      await promiseConversation(dispatch);
    };
    promise();
  }, []);
  return (
    <div>
      <header className="sticky top-0 w-full bg-[#161a1d] z-50 text-white">
        <NavBar />
      </header>
      <div className="flex bg-white">
        <Aside />
        <div className="w-5/6 m-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AssistantIndex;
