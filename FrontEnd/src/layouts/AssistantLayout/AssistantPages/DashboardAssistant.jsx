import ConversationsProcess from "../AssistantComponents/ConversationsProcess";
import ConversationDashboard from "../charts/LineChart";


function DashboardAssistant() {

  return (
    <div className="flex space-x-2">
      <div className="w-[70%] h-[calc(100vh-250px)] bg-gray-100 p-4 rounded">
        <ConversationDashboard/>
      </div>
      <div className="w-[30%] h-[calc(100vh-100px)] bg-gray-100 p-4 rounded overflow-y-scroll overflow-x-scroll">
        <ConversationsProcess/>
      </div>
    </div>
  );
}

export default DashboardAssistant;
