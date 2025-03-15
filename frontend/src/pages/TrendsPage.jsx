import Sidebar from "../components/Sidebar"

const TrendsPage = () => {
  return (
    <div className="h-screen">
      <div className="flex pt-20 px-4">
        <div className="h-full">
          <Sidebar />
        </div>
        <div className="px-6 py-3">
          <h1>Trends</h1>
        </div>
      </div>
    </div>
  )
}

export default TrendsPage