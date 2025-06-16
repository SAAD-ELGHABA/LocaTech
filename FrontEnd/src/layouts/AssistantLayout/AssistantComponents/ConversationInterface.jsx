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
    <div className="w-[100%] h-[100vh] bg-[#2125296b] flex items-center justify-center fixed z-50 top-0 left-0">
      <div className="w-[95%] h-[95%] bg-white">
        <div className="flex mx-8 justify-between my-2">
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
        <div className="flex  h-[90%]">
          <div className="w-2/3 h-[100%]">
            <Conversation isAssistant={true} conversation={conversation} />
          </div>
          <div className="w-1/3 border-s h-[100%] border-gray-400 relative p-1">
            <div className="mx-4">
              <MySlider items={selectedBien?.images} slidesPerView={1} />
              <div>
                <h1 className="text-lg font-semibold">{selectedBien?.title}</h1>
                <p className="text-sm text-gray-600 h-[190px] overflow-y-scroll">
                  {selectedBien?.description}
                </p>
              </div>
            </div>
            <div className="absolute -bottom-3 left-0 px-2 py-1 right-0 w-full z-50">
              <div className="py-3 px-4 flex items-center justify-between w-full">
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
