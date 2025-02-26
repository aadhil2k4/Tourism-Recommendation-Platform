import Navbar from "./components/Navbar"
import { useThemeStore } from "./store/useThemeStore";
import LoginPage  from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import {Route, Routes} from "react-router-dom";
import { Toaster } from "react-hot-toast";

const App = () => {
  const { theme } = useThemeStore();
  return (
    <div data-theme={theme}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/verifyEmail" element={<VerifyEmailPage />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App