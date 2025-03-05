import { Link } from "react-router-dom";
import { House, NotebookPen, Heart, Bell, TrendingUp, Search } from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="h-full w-20 lg:w-40 border-r border-base-300 flex flex-col">
      <div className="overflow-y-auto px-3 text-center w-full py-3">
        <Link to="/" className={`flex items-center p-3 gap-3 transition-colors hover:bg-base-300 hover:rounded-md`}>
          <House className="w-5 h-5" />
          <span className="hidden sm:inline text-center">Home</span>
        </Link>
        <Link to="/search" className={`flex items-center p-3 gap-3 transition-colors hover:bg-base-300 hover:rounded-md`}>
          <Search className="w-5 h-5" />
          <span className="hidden sm:inline text-center">Search</span>
        </Link>
        <Link to="/blogs" className={`flex items-center p-3 gap-3 transition-colors hover:bg-base-300 hover:rounded-md`}>
          <NotebookPen  className="w-5 h-5" />
          <span className="hidden sm:inline text-center">Blogs</span>
        </Link>
        <Link to={"/wishlist"} className={`flex items-center p-3 gap-3 transition-colors hover:bg-base-300 hover:rounded-md`}>
          <Heart  className="w-5 h-5" />
          <span className="hidden sm:inline text-center">WishList</span>
        </Link>
        <Link to="/alerts" className={`flex items-center p-3 gap-3 transition-colors hover:bg-base-300 hover:rounded-md`}>
          <Bell  className="w-5 h-5" />
          <span className="hidden sm:inline text-center">Alerts</span>
        </Link>
        <Link to="/trends" className={`flex items-center p-3 gap-3 transition-colors hover:bg-base-300 hover:rounded-md`}>
          <TrendingUp  className="w-5 h-5" />
          <span className="hidden sm:inline text-center">Trends</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
