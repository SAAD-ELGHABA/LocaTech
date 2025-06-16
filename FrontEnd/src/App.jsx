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
    if (user?.id) {
      socketConfig.emit("register", user?.id);
    }
  }, [user?.id]);

  useEffect(() => {
    const handleNotification = async (payload) => {
      if (payload.receiver === user?.id) {
        dispatch({
          type: "ADD_NOTIFICATION",
          payload: payload,
        });

        console.log("Received:", payload);
        toast(
          <div className="ms-3">
            <p className="font-semibold">{payload?.object}</p>
            <p className="text-sm text-gray-600">{payload?.body}</p>
          </div>,
          {
            icon: <BellRing />,
          }
        );
        try {
          await storeNotification(payload);
        } catch (error) {
          console.error("Error storing notification:", error);
        }
      }
    };

    socketConfig.on("notification", handleNotification);

    return () => socketConfig.off("notification", handleNotification);
  }, [user?.id]);

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
