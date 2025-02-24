import { Link } from "react-router-dom";
import { MapPinned, LogIn, LightbulbOff, Lightbulb } from "lucide-react";
import { useThemeStore } from "../store/useThemeStore";

const Navbar = () => {
  const { theme, setTheme }  = useThemeStore();

  return (
    <div>
      <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80">
        <div className="container mx-auto px-4 h-16">
          <div className="flex items-center justify-between h-full">
            <div className="flex items-center gap-8">
              <Link
                to="/"
                className="flex items-center gap-2.5 hover:opacity-80 transition-all"
              >
                <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                  <MapPinned className="w-5 h-5 text-primary" />
                </div>
                <h1 className="text-lg font-bold">TravelMate</h1>
              </Link>
            </div>
            <div className="flex items-center gap-2">
              {theme === "light" ? (
                <button className="btn btn-sm gap-2 transition-colors border-black" onClick={() => setTheme("dark")}>
                  <LightbulbOff className="w-4 h-4" />
                  <span className="hidden sm:inline">DarkMode</span>
                </button>
                ) : (
                  <button className="btn btn-sm gap-2 transition-colors border-black" onClick={() => setTheme("light")}>
                    <Lightbulb className="w-4 h-4" />
                    <span className="hidden sm:inline">LightMode</span>
                  </button>
                )}
                <Link to={"/login"} className={`btn btn-sm gap-2 transition-colors border-black`}>
                  <LogIn className="w-4 h-4" />
                  <span className="hidden sm:inline">LogIn</span>
                </Link>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
