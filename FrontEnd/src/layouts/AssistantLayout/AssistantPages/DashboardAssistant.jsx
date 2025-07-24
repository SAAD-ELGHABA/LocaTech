import ConversationsProcess from "../AssistantComponents/ConversationsProcess";
import ConversationDashboard from "../charts/LineChart";


function DashboardAssistant() {

  return (
    <div className="flex lg:flex-row flex-col  space-x-2">
      <div className="w-full lg:w-[70%] lg:h-[calc(100vh-100px)] max-h-[calc(100vh)] bg-gray-100 p-4 rounded">
        <ConversationDashboard/>
      </div>
      <div className="w-full lg:w-[30%] lg:h-[calc(100vh-100px)] max-h-[calc(100vh)] bg-gray-100 p-4 rounded overflow-auto">
        <ConversationsProcess/>
      </div>
    </div>
  );
}

export default DashboardAssistant;
