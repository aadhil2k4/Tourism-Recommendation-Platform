// import { useAuthStore } from "../store/useAuthStore.js";
import Sidebar from "../components/Sidebar"

const HomePage = () => {
  // const {user} = useAuthStore();
  return (
    <div className="h-screen">
      <div className="flex items-center pt-20 px-4 h-full">
      <Sidebar />
      </div>
    </div>
  )
}

export default HomePage