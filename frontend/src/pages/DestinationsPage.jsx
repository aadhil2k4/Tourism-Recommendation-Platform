import PlacesCard from "../components/PlacesCard";
import { useEffect } from "react";
import { useDestinationStore } from "../store/useDestinationStore";
import { ChevronDown, Loader } from "lucide-react";
import noQuiz from "../assets/noQuiz.svg";
import { useNavigate } from "react-router-dom";

const DestinationsPage = () => {
  const { destinations, getDestinations, isLoading, hasMore, quizTaken, fetchUserDetails } = useDestinationStore();
  console.log(destinations);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserDetails();
}, []);

useEffect(() => {
    if (quizTaken) {
        getDestinations();
    }
}, [quizTaken]);


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

  const handleQuizRedirect = () => {
    navigate("/dashboard/quiz")
  }

  return (
    <>
    {!quizTaken? (
      <div className="flex flex-col items-center mt-10">
                <img src={noQuiz} alt="No quizTaken" className="w-80 h-80"/>
                <h1 className="text-center">Take the quiz to get personalized recomendations</h1>
                <button className="btn btn-primary mt-2" onClick={handleQuizRedirect} >Take Quiz</button>
                </div>
    ) : (
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
    )}
    </>
  );
};

export default DestinationsPage;
