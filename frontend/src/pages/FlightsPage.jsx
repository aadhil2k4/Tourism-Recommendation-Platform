import { Loader, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useHotelStore } from "../store/useHotelStore";

const HotelsPage = () => {
  const { hotels, isLoading, error, getHotels } = useHotelStore();

  const [query, setQuery] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    getHotels({ place: query, inDate: checkIn, outDate: checkOut });
  };

  useEffect(() => {
    getHotels();
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="relative flex justify-center space-x-2">
          <div className="relative">
            <div className="absolute w-5 h-5 top-2 left-2.5">
              <Search />
            </div>
            <input
              className="w-80 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              placeholder="Enter Place..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <p className="mt-2 pl-5">CheckIn Date:</p>
          <input
            type="date"
            className="border border-slate-200 rounded-md px-2 py-2 text-sm text-slate-700 focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
          />
          <p className="mt-2 pl-5">CheckOut Date:</p>
          <input
            type="date"
            className="border border-slate-200 rounded-md px-2 py-2 text-sm text-slate-700 focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
          />
          <button
            className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="submit"
          >
            Search
          </button>
        </div>
      </form>

      {isLoading ? (
        <Loader className="text-center m-auto animate-spin h-9 w-9" />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {hotels.map((hotel) => (
            <FlightCard
              key={article.article_id}
              title={article.title}
              link={article.link}
              image={article.image_url}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HotelsPage;
