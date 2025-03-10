import { NavLink } from "react-router-dom";
import {
  House,
  NotebookPen,
  Heart,
  Bell,
  TrendingUp,
  Search,
} from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="h-full w-20 lg:w-40 border-r border-base-300 flex flex-col">
      <div className="overflow-y-auto px-3 text-center w-full py-3">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center p-3 gap-3 transition-colors 
     hover:bg-base-300 hover:rounded-md 
     ${isActive ? "bg-base-300 rounded-md" : ""}`
          }
        >
          <House className="w-5 h-5" />
          <span className="hidden sm:inline text-center">Home</span>
        </NavLink>
        <NavLink
          to="/search"
          className={({ isActive }) =>
            `flex items-center p-3 gap-3 transition-colors 
     hover:bg-base-300 hover:rounded-md 
     ${isActive ? "bg-base-300 rounded-md" : ""}`
          }
        >
          <Search className="w-5 h-5" />
          <span className="hidden sm:inline text-center">Search</span>
        </NavLink>
        <NavLink
          to="/blogs"
          className={({ isActive }) =>
            `flex items-center p-3 gap-3 transition-colors 
     hover:bg-base-300 hover:rounded-md 
     ${isActive ? "bg-base-300 rounded-md" : ""}`
          }
        >
          <NotebookPen className="w-5 h-5" />
          <span className="hidden sm:inline text-center">Blogs</span>
        </NavLink>
        <NavLink
          to="/wishlist"
          className={({ isActive }) =>
            `flex items-center p-3 gap-3 transition-colors 
     hover:bg-base-300 hover:rounded-md 
     ${isActive ? "bg-base-300 rounded-md" : ""}`
          }
        >
          <Heart className="w-5 h-5" />
          <span className="hidden sm:inline text-center">WishList</span>
        </NavLink>
        <NavLink
          to="/alerts"
          className={({ isActive }) =>
            `flex items-center p-3 gap-3 transition-colors 
     hover:bg-base-300 hover:rounded-md 
     ${isActive ? "bg-base-300 rounded-md" : ""}`
          }
        >
          <Bell className="w-5 h-5" />
          <span className="hidden sm:inline text-center">Alerts</span>
        </NavLink>
        <NavLink
          to="/trends"
          className={({ isActive }) =>
            `flex items-center p-3 gap-3 transition-colors 
     hover:bg-base-300 hover:rounded-md 
     ${isActive ? "bg-base-300 rounded-md" : ""}`
          }
        >
          <TrendingUp className="w-5 h-5" />
          <span className="hidden sm:inline text-center">Trends</span>
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
