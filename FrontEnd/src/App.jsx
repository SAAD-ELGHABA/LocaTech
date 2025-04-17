import { useEffect, useState } from "react";
import SplashScreen from "./pages/SplashScreen";
import MainScreen from "./pages/Accueil";
import { RouterProvider } from "react-router-dom";
import Route from "./routes/route";
import Index from "./layouts/UserLayout/Index.user";
import { toast, Toaster } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { login } from "./redux/actions";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const token = useSelector((state) => state.userReducer.token);
  const dispatch = useDispatch();
  const LoadingGlobal = useSelector((state) => state.loadingReducer);
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const villesResponse = await axios.get("/api/ville");
        if (villesResponse.status >= 200) {
          dispatch({
            type: "GET_VILLES",
            payload: villesResponse.data.villes,
          });
        } else {
          toast.error("Erreur lors de la récupération des villes");
        }
        const statusResponse = await axios.get("/api/status");
        if (statusResponse.status >= 200 && statusResponse.status <= 300) {
          dispatch({
            type: "GET_STATUS",
            payload: statusResponse.data,
          });
        }
        const biensResponse = await axios.get("/api/Biens");
        if (biensResponse.status >= 200 && biensResponse.status <= 300) {
          dispatch({
            type: "ALLBIENS",
            payload: biensResponse.data.Biens,
          });
        }

        if (token) {
          const userResponse = await axios.get("/api/user", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (userResponse.status >= 200 && userResponse.status < 300) {
            const userData = userResponse.data;

            dispatch({
              type: "LOGIN",
              payload: userData,
            });
            if (userData.role === "courtier") {
              try {
                const courtierResponse = await axios.post(
                  "/api/ActuelCourtier",
                  {
                    user_id: userData.id,
                  }
                );
                if (
                  courtierResponse.status >= 200 &&
                  courtierResponse.status <= 300
                ) {
                  dispatch({
                    type: "ActuelCourtier",
                    payload: courtierResponse.data.ActuelCourtier,
                  });
                }
              } catch (error) {
                console.error(
                  "Erreur lors de la récupération du courtier :",
                  error
                );
              }
            }
          }
        }
      } catch (error) {
        console.error("Erreur lors du chargement initial :", error);
      } finally {
        dispatch({
          type: "SET_LOADING",
          payload: false,
        });
        setTimeout(() => {
          setShowSplash(false);
          toast.dismiss();
        }, 2000);
      }
    };

    fetchInitialData();
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
