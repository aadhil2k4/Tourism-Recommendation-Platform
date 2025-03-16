import { NavLink } from "react-router-dom";
import {
  House,
  NotebookPen,
  Heart,
  Search,
  Hotel,
  Plane,
  Users,
  FlaskConical,
} from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="h-full w-24 lg:w-44 border-r border-base-300 flex flex-col">
      <div className="overflow-y-auto px-3 text-center w-full py-3">
        <NavLink
          to="/dashboard/destinations"
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
          to="/dashboard/search"
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
          to="/dashboard/blogs"
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
          to="/dashboard/wishlist"
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
          to="/dashboard/community"
          className={({ isActive }) =>
            `flex items-center p-3 gap-3 transition-colors 
     hover:bg-base-300 hover:rounded-md 
     ${isActive ? "bg-base-300 rounded-md" : ""}`
          }
        >
          <Users className="w-5 h-5" />
          <span className="hidden sm:inline text-center">Community</span>
        </NavLink>
        <NavLink
          to="/dashboard/flights"
          className={({ isActive }) =>
            `flex items-center p-3 gap-3 transition-colors 
     hover:bg-base-300 hover:rounded-md 
     ${isActive ? "bg-base-300 rounded-md" : ""}`
          }
        >
          <Plane className="w-5 h-5" />
          <span className="hidden sm:inline text-center">Flights</span>
        </NavLink>
        <NavLink
          to="/dashboard/hotels"
          className={({ isActive }) =>
            `flex items-center p-3 gap-3 transition-colors 
     hover:bg-base-300 hover:rounded-md 
     ${isActive ? "bg-base-300 rounded-md" : ""}`
          }
        >
          <Hotel className="w-5 h-5" />
          <span className="hidden sm:inline text-center">Hotels</span>
        </NavLink>
        <NavLink
          to="/dashboard/quiz"
          className={({ isActive }) =>
            `flex items-center p-3 gap-3 transition-colors 
     hover:bg-base-300 hover:rounded-md 
     ${isActive ? "bg-base-300 rounded-md" : ""}`
          }
        >
          <FlaskConical className="w-5 h-5" />
          <span className="hidden sm:inline text-center">Quiz</span>
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
