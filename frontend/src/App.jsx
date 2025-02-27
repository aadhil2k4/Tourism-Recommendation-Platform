import Navbar from "./components/Navbar";
import { useThemeStore } from "./store/useThemeStore";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import { Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (!isAuthenticated || !user || !user.isVerified) {
    return <Navigate to="/verifyEmail" replace />;
  }
  return children;
};

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();
  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const App = () => {
  const { theme } = useThemeStore();
  const { isCheckingAuth, checkAuth, isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth && !user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div data-theme={theme}>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/login"
          element={
            <RedirectAuthenticatedUser>
              <LoginPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/signup"
          element={
            <RedirectAuthenticatedUser>
              <SignUpPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route path="/verifyEmail" element={<VerifyEmailPage />} />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
