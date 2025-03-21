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
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import SettingsPage from "./pages/SettingsPage";
import QuizPage from "./pages/QuizPage";
import DestinationsPage from "./pages/DestinationsPage";
import LandinPage from "./pages/LandinPage";
import PlaceInfoPage from "./pages/PlaceInfoPage";
import HotelsPage from "./pages/HotelsPage";
import NewsPage from "./pages/NewsPage";
import PredictorPage from "./pages/PredictorPage";
import DestinationSearchPage from "./pages/DestinationSearchPage";
import WishListPage from "./pages/WishListPage";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user, isCheckingAuth } = useAuthStore();

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (!user?.isVerified) {
    return <Navigate to="/verifyEmail" replace />;
  }
  return children;
};

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user, isCheckingAuth } = useAuthStore();
  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }
  if (isAuthenticated && user?.isVerified) {
    return <Navigate to="/dashboard/destinations" replace />;
  }
  return children;
};

const App = () => {
  const { theme } = useThemeStore();
  const { isCheckingAuth, checkAuth, user } = useAuthStore();

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
          element={<LandinPage />}
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard/destinations" replace />} />
          <Route path="destinations" element={<DestinationsPage />} />
          <Route path="destinations/:id" element={<PlaceInfoPage />} />
          <Route path="quiz" element={<QuizPage />} />
          <Route path="hotels" element={<HotelsPage />} />
          <Route path="news" element={<NewsPage />} />
          <Route path="predictor" element={<PredictorPage />} />
          <Route path="search" element={<DestinationSearchPage />} />
          <Route path="wishlist" element={<WishListPage />} />
          </Route>
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
        <Route
          path="/forgotPassword"
          element={
            <RedirectAuthenticatedUser>
              <ForgotPasswordPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/resetPassword/:token"
          element={
            <RedirectAuthenticatedUser>
              <ResetPasswordPage />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <SettingsPage />
            </ProtectedRoute>
          }
        />
        {/* <Route
          path="/trends"
          element={
            <ProtectedRoute>
              <TrendsPage />
            </ProtectedRoute>
          }
        /> */}
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
