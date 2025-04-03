import PlacesCard from "../components/PlacesCard";
import { useEffect } from "react";
import { useDestinationStore } from "../store/useDestinationStore";
import { ChevronDown, Loader } from "lucide-react";

const DestinationsPage = () => {
  const { destinations, getDestinations, isLoading, hasMore } = useDestinationStore();
  console.log(destinations);

  useEffect(() => {
    getDestinations();
  }, []);

  const handleScroll = () => {
    const { scrollHeight, clientHeight } = document.documentElement;
    console.log("scrollHeight", scrollHeight);
    console.log("clientHeight: ", clientHeight);
  
    if (scrollHeight === clientHeight && hasMore && !isLoading) {
      getDestinations();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasMore, isLoading]);

  return (
    <div>
      <header className="text-center text-3xl font-bold rounded-lg mb-6">
        Top Destinations
      </header>
      {isLoading && <Loader className="text-center m-auto animate-spin h-9 w-9"/>}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {destinations.length === 0 && !isLoading ? (
        <p>No destinations found.</p>
      ) : (
        destinations.map((destination) => (
          <PlacesCard
            key={destination._id}
            id={destination._id}
            name={destination["Destination Name"]}
            country={destination.Country}
            image={destination.Image}
            rating={destination["User Ratings (out of 5)"]}
          />
        ))
      )}
    </div>
    <div className="text-center mt-3 items-center">
    <button className="btn rounded-3xl" onClick={() => handleScroll()}><ChevronDown /></button>
    </div>
    {isLoading && (
        <div className="col-span-full flex justify-center py-4">
          <p>Loading more destinations...</p>
        </div>
      )}
      
      {!hasMore && destinations.length > 0 && (
        <div className="col-span-full text-center py-4">
          <p>Youve reached the end of the destinations list.</p>
        </div>
      )}
    </div>
  );
};

export default DestinationsPage;
