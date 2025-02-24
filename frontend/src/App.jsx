import Navbar from "./components/Navbar"
import { useThemeStore } from "./store/useThemeStore";
import LoginPage  from "./pages/LoginPage"
//import {Route, Routes} from "react-router-dom";

const App = () => {
  const { theme } = useThemeStore();
  return (
    <div data-theme={theme}>
      <Navbar />
      <LoginPage />
    </div>
  )
}

export default App