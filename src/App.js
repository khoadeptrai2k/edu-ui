/** @format */

import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import PageRender from "./customRouter/PageRender";
import PrivateRouter from "./customRouter/PrivateRouter";

import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import ForgotPassword from "./pages/forgot_password";
import ResetPassword from "./pages/reset_password";
import Premium from "./pages/premium";
import PremiumSuccess from "./pages/premium_success";

import Alert from "./components/alert/Alert";
import Header from "./components/header/Header";
import StatusModal from "./components/StatusModal";

import { useSelector, useDispatch } from "react-redux";
import { refreshToken } from "./redux/actions/authAction";
import { getPosts } from "./redux/actions/postAction";
import { getSuggestions } from "./redux/actions/suggestionsAction";
import { getNotifies } from "./redux/actions/notifyAction";

import io from "socket.io-client";
import { GLOBALTYPES } from "./redux/actions/globalTypes";
import SocketClient from "./SocketClient";

import CallModal from "./components/message/CallModal";
import Peer from "peerjs";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30 * 1000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  const { auth, status, modal, call } = useSelector((state) => state);
  const dispatch = useDispatch();

  // 🔥 INIT SOCKET
  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  // Connect Socket.io only after auth is ready.
  useEffect(() => {
    if (!auth.token) {
      dispatch({ type: GLOBALTYPES.SOCKET, payload: null });
      return;
    }

    const socket = io(process.env.REACT_APP_SOCKET_URL || "http://localhost:9090", {
      autoConnect: false,
      transports: ["polling", "websocket"],
      upgrade: true,
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 500,
      timeout: 10000,
    });

    dispatch({ type: GLOBALTYPES.SOCKET, payload: socket });

    const connectTimer = setTimeout(() => {
      if (!socket.connected) socket.connect();
    }, 0);

    socket.on("connect_error", (err) => {
      console.warn("Socket connection error:", err.message);
    });

    return () => {
      clearTimeout(connectTimer);
      socket.removeAllListeners();
      if (socket.connected) socket.disconnect();
    };
  }, [dispatch, auth.token]);

  // 🔥 FETCH DATA SAU KHI LOGIN
  useEffect(() => {
    if (auth.token) {
      dispatch(getPosts(auth.token));
      dispatch(getSuggestions(auth.token));
      dispatch(getNotifies(auth.token));
    }
  }, [dispatch, auth.token]);

  // 🔥 NOTIFICATION PERMISSION
  useEffect(() => {
    if (!("Notification" in window)) return;

    if (Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    const peerHost = process.env.REACT_APP_PEERJS_HOST || window.location.hostname;
    const isLocalPeer = peerHost === "localhost" || peerHost === "127.0.0.1";

    const newPeer = new Peer(undefined, {
      host: peerHost,

      port: isLocalPeer ? 9090 : 443,

      path: "/peerjs",

      secure: !isLocalPeer,
    });

    dispatch({ type: GLOBALTYPES.PEER, payload: newPeer });

    return () => newPeer.destroy();
  }, [dispatch]);

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Alert />

      <input type="checkbox" id="theme" />

      <div className={`App ${status || modal ? "mode" : ""}`}>
        <div className="main">
          {auth.token && <Header />}
          {status && <StatusModal />}
          {auth.token && <SocketClient />}
          {call && <CallModal />}

          <Routes>
            <Route path="/" element={auth.token ? <Home /> : <Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot_password" element={<ForgotPassword />} />
            <Route path="/reset_password/:token" element={<ResetPassword />} />
            <Route path="/premium" element={auth.token ? <Premium /> : <Login />} />
            <Route path="/premium/success" element={auth.token ? <PremiumSuccess /> : <Login />} />

            <Route
              path="/:page"
              element={
                <PrivateRouter>
                  <PageRender />
                </PrivateRouter>
              }
            />

            <Route
              path="/:page/:id"
              element={
                <PrivateRouter>
                  <PageRender />
                </PrivateRouter>
              }
            />
          </Routes>
        </div>
      </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
