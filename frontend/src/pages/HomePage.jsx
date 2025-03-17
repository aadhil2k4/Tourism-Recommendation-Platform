import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const HomePage = () => {
  return (
    <div className="h-screen">
      <div className="flex pt-20">
        <div className="h-full">
          <Sidebar />
        </div>
        <main className="ml-52 pr-3 py-3 overflow-y-auto h-[calc(100vh-5rem)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default HomePage;
