//import { useAuthStore } from "../store/useAuthStore.js";
import PlacesCard from "../components/PlacesCard";
import Sidebar from "../components/Sidebar";

const HomePage = () => {
  //const {user} = useAuthStore();
  return (
    <div className="h-screen">
      <div className="flex pt-20 px-4">
        <div className="h-full">
          <Sidebar />
        </div>
        <div className="px-6 py-3">
          <PlacesCard />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
