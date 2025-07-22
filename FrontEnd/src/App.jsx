import { useEffect, useState } from "react";
import SplashScreen from "./pages/SplashScreen";
import { RouterProvider } from "react-router-dom";
import Route from "./routes/route";
import Index from "./layouts/UserLayout/Index.user";
import { toast, Toaster } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { fetchInitialData } from "./functions/fetchInitialData";
import { fetchBiens } from "./functions/fetchBiens";
import { fetchUser } from "./functions/fetchUser";
import socketConfig from "./functions/socketConfig";
import { storeNotification } from "./functions/storeNotification";
import { fetchNotifications } from "./functions/fetchNotifications";
import { BellRing } from "lucide-react";
import { socketListener } from "./functions/socketListener";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const token = useSelector((state) => state.userReducer.token);
  const dispatch = useDispatch();
  const LoadingGlobal = useSelector((state) => state.loadingReducer);
  const user = useSelector((state) => state.userReducer.userInfo);

  useEffect(() => {
    const init = async () => {
      localStorage.getItem("token") &&
        (await fetchUser(dispatch, localStorage.getItem("token")));
      setShowSplash(false);
      await fetchBiens(dispatch);
      await fetchNotifications(dispatch);
      await fetchInitialData(dispatch, localStorage.getItem("token"));
      toast.dismiss();
    };

    init();
  }, [LoadingGlobal, dispatch, token]);

  useEffect(() => {
    if (user?.id && user?.role) {
      socketConfig.emit("register", {
        id: user.id,
        role: user.role,
      });
    }
  }, [user?.id, user?.role]);

  const currentCourtier = useSelector((state) => state.ActuelCourtierReducer);

  const userId =
    user?.role === "user"
      ? user?.id
      : user?.role === "courtier"
      ? currentCourtier?.id
      : 0;

  useEffect(() => {
    if (socketConfig && user?.id) {
      socketConfig.connect();
      socketConfig.emit("register", { id: user?.id, role: user?.role });
    }
  }, [user]);

  useEffect(() => {
    if (!user?.id || !user?.role) return;
    socketConfig.connect();
    socketConfig.emit("register", {
      id: user.id,
      role: user.role,
    });
    socketConfig.on("notification", async (data) => {
      dispatch?.({
        type: "ADD_NOTIFICATION",
        payload: data,
      });
      toast(
        <div className="ms-3">
          <p className="font-semibold">{data?.object}</p>
          <p className="text-sm text-gray-600">{data?.body}</p>
        </div>,
        {
          icon: <BellRing />,
        }
      );
      try {
        await storeNotification(data);
      } catch (error) {
        console.error("❌ Error storing notification:", error);
      }
    });
    return () => {
      socketConfig.off("notification");
      socketConfig.disconnect();
    };
  }, [user, dispatch]);

  socketConfig.on("newMessage", ({ newMessage, participants }) => {
    console.log("💬 New message received:", newMessage);
    const userRole = user?.role;
    if (userRole === "assistant") {
      socketListener(dispatch, 0, userRole, null);
      console.log("🤖 Assistant mode");
      return;
    }
    if (participants.includes(Number(userId))) {
      console.log("💬 New message received for user/courtier:", userId);
      socketListener(dispatch, userId, userRole, null);
    }
  });

  useEffect(() => {
  if (!user?.id || !user?.role) return;
    console.log(`🔗 User ${user.id} (${user.role}) connected in the chat page ...`);
  const unsubscribe = socketListener(dispatch, userId, user?.role, null);

  return () => {
    unsubscribe(); // remove listeners on unmount
  };
}, [user?.id, user?.role, userId]);


  return (
    <div className="app">
      {showSplash ? (
        <SplashScreen />
      ) : (
        <RouterProvider router={Route}>
          <Index />
        </RouterProvider>
      )}
      <Toaster />
    </div>
  );
}
