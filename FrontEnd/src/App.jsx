import { useEffect, useState } from "react";
import SplashScreen from "./pages/SplashScreen";
import { RouterProvider } from "react-router-dom";
import Route from "./routes/route";
import Index from "./layouts/UserLayout/Index.user";
import { toast, Toaster } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { fetchInitialData } from "./functions/fetchInitialData"; // ✅ IMPORT







export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const token = useSelector((state) => state.userReducer.token);
  const dispatch = useDispatch();
  const LoadingGlobal = useSelector((state) => state.loadingReducer);


  
  
  


  useEffect(() => {
    const init = async () => {
      await fetchInitialData(dispatch, localStorage.getItem("token"));
      setTimeout(() => {
        setShowSplash(false);
        toast.dismiss();
      }, 1000);
    };

    init();
  }, [LoadingGlobal, dispatch, token]);

  

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
