import { Send, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import MySlider from "../../../components/Slider";
import ChatInput from "../../../pages/ChatRealTime/component/ChatInput";
import Conversation from "../../../pages/ChatRealTime/ChatPages/Conversation";

function ConversationInterface({ setShowConversationInterface, conversation }) {
  const biens = useSelector((state) => state.BienReducer);
  const courtiers = useSelector((state) => state.AllCourtiersReducer);
  const users = useSelector((state) => state.usersReducer);
  const user = useSelector((state) => state.userReducer.userInfo);
  const currentConversationReducer = useSelector(
    (state) => state.currentConversationReducer
  );
  const selectedBien = biens.find(
    (b) => b.id === Number(currentConversationReducer.BienId)
  );
  const dispatch = useDispatch();
  return (
    <div className="w-screen h-full bg-[#2125296b] flex items-center justify-center fixed z-50 top-0 left-0 overflow-y-auto custom-scrollbar">
      <div className="lg:w-[95%] w-full h-[100%]  lg:h-[95%] bg-white overflow-y-auto custom-scrollbar relative">
        <div className="flex mx-8 justify-between my-2 ">
          <h1 className="text-lg">
            Conversation :{" "}
            <span className="font-semibold">
              {currentConversationReducer._id}
            </span>
          </h1>
          <X
            className="cursor-pointer"
            onClick={() => setShowConversationInterface(false)}
          />
        </div>
        <div className="flex flex-col-reverse lg:flex-row h-[90%]">
          <div className="lg:w-2/3  h-[100%]">
            <Conversation isAssistant={true} conversation={conversation} />
          </div>
          <div className="lg:w-1/3 border-s h-[100%] border-gray-400 relative p-1 ">
            <div className="mx-4 lg:block hidden">
              <MySlider items={selectedBien?.images} slidesPerView={1} />
              <div>
                <h1 className="text-lg font-semibold">{selectedBien?.title}</h1>
                <p className="text-sm text-gray-600 h-[190px] lg:h-[150px] overflow-y-auto custom-scrollbar lg:block hidden">
                  {selectedBien?.description}
                </p>
              </div>
            </div>
            <div className="absolute -bottom-3 left-0 lg:px-2 py-1 right-0 lg:w-full w-[90%] z-50 flex items-center justify-center mx-auto">
              <div className="py-3 lg:px-4 flex items-center justify-center lg:w-full w-full  ">
                <ChatInput
                  dispatch={dispatch}
                  currentConversation={conversation}
                  userId={0}
                  isAssistant={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConversationInterface;
