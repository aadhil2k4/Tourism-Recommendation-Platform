import { Link } from "react-router-dom";
import { LogIn, LightbulbOff, Lightbulb, LogOut, User } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";
import { useAuthStore } from "../store/useAuthStore";
import Logo from "../assets/logo.svg";

const Navbar = () => {
  const { theme, setTheme }  = useThemeStore();
  const { user, logout } = useAuthStore();

  return (
    <div>
      <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40">
        <div className="container mx-auto px-4 h-16">
          <div className="flex items-center justify-between h-full">
            <div className="flex items-center gap-8">
              <Link
                to="/"
                className="flex items-center gap-2.5 hover:transition-all"
              >
                <div className="flex items-center justify-center">
                  <img src={Logo} alt="Logo" className="w-10 h-10" />
                </div>
                <h1 className="text-lg font-bold">TravelMate</h1>
              </Link>
            </div>
            <div className="flex items-center gap-2">
              {theme === "light" ? (
                <button className="btn btn-sm gap-2 transition-colors" onClick={() => setTheme("dark")}>
                  <LightbulbOff className="w-4 h-4" />
                  <span className="hidden sm:inline">DarkMode</span>
                </button>
                ) : (
                  <button className="btn btn-sm gap-2 transition-colors" onClick={() => setTheme("light")}>
                    <Lightbulb className="w-4 h-4" />
                    <span className="hidden sm:inline">LightMode</span>
                  </button>
                )}
                {!user ? (
                <Link to={"/login"} className={`btn btn-sm gap-2 transition-colors`}>
                  <LogIn className="w-4 h-4" />
                  <span className="hidden sm:inline">LogIn</span>
                </Link>
                ) : (
                  <>
                   <Link to={"/profile"} className={`btn btn-sm gap-2`}>
                <User className="size-5" />
                <span className="hidden sm:inline">Profile</span>
              </Link>
                  <button onClick={logout} className={`btn btn-sm gap-2 transition-colors`}>
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
                )
                }
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
