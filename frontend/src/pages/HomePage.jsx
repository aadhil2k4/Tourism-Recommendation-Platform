import { useAuthStore } from "../store/useAuthStore.js";

const HomePage = () => {

  const { user } = useAuthStore();

  return (
    <div className="h-screen pt-20 text-center">
      <h1>TravelMate HomePage</h1>
      <h1>Hi {user.name}!!</h1>
      <h1>Thank You for Choosing Us</h1>
      <h1>Dashboard Work in Progress</h1>
    </div>
  )
}

export default HomePage