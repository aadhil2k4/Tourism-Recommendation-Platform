import Navbar from "./components/Navbar"
import { useThemeStore } from "./store/useThemeStore";
import LoginPage  from "./pages/LoginPage"
import SignUpPage from "./pages/SignUpPage";
import HomePage from "./pages/HomePage";
//import {Route, Routes} from "react-router-dom";

const App = () => {
  const { theme } = useThemeStore();
  return (
    <div data-theme={theme}>
      <Navbar />
      <HomePage />
      <LoginPage />
      <SignUpPage />
    </div>
  )
}

export default App