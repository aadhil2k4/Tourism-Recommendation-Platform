import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDestinationStore } from "../store/useDestinationStore";
import PlacesCard from "../components/PlacesCard";
import { Loader } from "lucide-react";
import searchPage from "../assets/searchPage.svg";
import destinationNotFound from "../assets/destinationNotFound.svg";

const DestinationSearchPage = () => {
  const { searchedDestinations, searchDestination, isLoading, clearSearchResults } = useDestinationStore();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/dashboard/search?q=${query}`);
    searchDestination(query);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("q");

    if (searchTermFromUrl) {
      setQuery(searchTermFromUrl);
      searchDestination(searchTermFromUrl);
    }

    return () => {
      clearSearchResults();
    };
  }, [location.search]);

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex justify-center">
        <div className="w-full max-w-sm min-w-[200px]">
          <div className="relative flex items-center">
            <div className="absolute w-5 h-5 top-2 left-2.5">
              <Search />
            </div>
            <input
              className="w-full bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md pl-10 pr-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              placeholder="Enter Place..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              className="rounded-md bg-slate-800 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none ml-2"
              type="submit"
            >
              Search
            </button>
          </div>
        </div>
      </form>

      {isLoading && <Loader className="w-9 h-9 m-auto mt-6 animate-spin" />}

      {/* Show searchPage image when nothing is entered */}
      {query === "" && searchedDestinations.length === 0 && !isLoading && (
        <div className="flex flex-col items-center mt-10">
          <img src={searchPage} alt="Search Destination" className="w-72 h-72" />
          <p className="text-center mt-4">Enter destination in searchbar to get results !!</p>
        </div>
      )}

      {/* Show destinationNotFound image when no destinations are found */}
      {query !== "" && searchedDestinations.length === 0 && !isLoading && (
        <div className="flex flex-col items-center mt-10">
          <img src={destinationNotFound} alt="Destination Not Found" className="w-72 h-72" />
          <p className="text-center mt-4">No destinations found!!</p>
        </div>
      )}

      {/* Show results if destinations are found */}
      {searchedDestinations.length > 0 && !isLoading && (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {searchedDestinations.map((destination) => (
            <PlacesCard
              key={destination._id}
              id={destination._id}
              name={destination["Destination Name"]}
              country={destination.Country}
              image={destination.Image}
              rating={destination["User Ratings (out of 5)"]}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DestinationSearchPage;
