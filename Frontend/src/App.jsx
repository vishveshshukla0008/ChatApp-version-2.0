import React, { useEffect } from "react";
import Navbar from "./Components/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import SignupPage from "./Pages/SignupPage";
import LoginPage from "./Pages/LoginPage";
import ProfilePage from "./Pages/ProfilePage";
import SettingsPage from "./Pages/SettingsPage";
import { useAuthStore } from "./Store/UseStoreAuth";
import { ChevronsDownUp, Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { useThemeStore } from "./Store/useThemeStore";

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen" data-theme={theme}>
        <Loader className="animate-spin" />
      </div>
    );
  }
  return (
    <div data-theme={theme}>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignupPage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
