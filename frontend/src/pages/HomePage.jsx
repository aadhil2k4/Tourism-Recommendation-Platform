import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const HomePage = () => {
  return (
    <div className="h-screen">
      <div className="flex pt-20 px-4">
        <div className="h-full">
          <Sidebar />
        </div>
        <main className="px-6 py-3">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default HomePage;
