import { useEffect, useState } from "react";
import SplashScreen from "./pages/SplashScreen";
import MainScreen from "./pages/Accueil";
import { RouterProvider } from "react-router-dom";
import Route from "./routes/route";
import Index from "./layouts/UserLayout/Index.user";
import { toast, Toaster } from "sonner";
import { Provider, useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { login } from "./redux/actions";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const token = useSelector((state) => state.userReducer.token);
  const LoadinfGlobal = useSelector((state) => state.loadingReducer);

  const dispatch = useDispatch();
  const ActuelCourtier = async (id) => {
    try {
      const response = await axios.post("/api/ActuelCourtier", {
        user_id: id,
      });
      if (response.status >= 200 && response.status <= 300) {
        dispatch({
          type: "ActuelCourtier",
          payload: response.data.ActuelCourtier,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const Biens = async () => {
    try {
      const response = await axios.get("/api/Biens");
      if (response.status >= 200 && response.status <= 300) {
        dispatch({
          type: "ALLBIENS",
          payload: response.data.Biens,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const getVilles = async () => {
      try {
        const response = await axios.get("/api/ville");
        if (response.status >= 200) {
          dispatch({
            type: "GET_VILLES",
            payload: response.data.villes,
          });
        } else {
          toast.error("Error fetching cities");
        }
      } catch (error) {
        console.error("Error fetching cities:", error);
      } finally {
        setTimeout(() => {
          dispatch({
            type: "SET_LOADING",
            payload: false,
          });
          toast.dismiss()
        }, 2000);
      }
    };
    getVilles();
    Biens();
  }, [LoadinfGlobal, Biens]);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        axios.defaults.withCredentials = true;
        axios.defaults.withXSRFToken = true;

        const response = await axios.get("/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status >= 200 && response.status < 300) {
          dispatch(login(token, response.data));
          ActuelCourtier(response.data.id);
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de l'utilisateur :",
          error
        );
      }
    };

    if (token) {
      fetchUserData();
    }

    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [LoadinfGlobal, dispatch, token]);

  return (
    <div className="app">
      {showSplash ? (
        <SplashScreen />
      ) : (
        <RouterProvider router={Route}>
          <Index />
        </RouterProvider>

        // <RouterProvider router={Route} />
      )}
      <Toaster />
    </div>
  );
}

// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
