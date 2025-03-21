import { Heart } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useDestinationStore } from '../store/useDestinationStore';
import { useEffect } from 'react';
import { useWishlistStore } from '../store/useWishlistStore';

const PlaceInfoPage = () => {
  const { id } = useParams();
  const { selectedDestination, getDestinationById } = useDestinationStore();
  const { wishlist, addToWishList, removeFromWishlist } = useWishlistStore();

  useEffect(() => {
    console.log("PlaceInfoPage id: ", id)
    getDestinationById(id);
  }, [id]);

  if (!selectedDestination) {
    return <p>Loading...</p>;
  }

  const isWishlisted = wishlist.some((destination) => destination._id === id);

  const handleWishlistToggle = () => {
    if (isWishlisted) {
      removeFromWishlist(id);
    } else {
      addToWishList({ _id: id});
    }
  }

  return (
    <div>
      <div className="flex w-full">
        <div className="w-1/2 p-6 flex flex-col justify-center">
          <h1 className="text-2xl font-bold">
            {selectedDestination["Destination Name"]}, {selectedDestination.Country}
          </h1>
          <h1>Climate Type: {selectedDestination["Climate Type"]}</h1>
          <h1>Best Visiting Season: {selectedDestination["Best Visiting Season"]}</h1>
          <h1>Recommended for: {selectedDestination["Recommended for"]}</h1>
          <h1>Activity Types: {selectedDestination["Activity Types"]}</h1>
          <h1>Nearby Attractions: {selectedDestination["Nearby Attractions"]}</h1>
          <h1>Budget Level: {selectedDestination["Budget Level"]}</h1>
          <h1>Avg Cost of Stay: {selectedDestination["Average Cost of Stay per Night (USD)"]}$</h1>
          <h1>Local Transports: {selectedDestination["Local Transportation Availability"]}</h1>
          <h1>Nearest Airport: {selectedDestination["Airport Proximity (km)"]}</h1>
          <h1>Visa Requirements: {selectedDestination["Visa Requirements"]}</h1>
          <h1>Crime Index: {selectedDestination["Crime Index"]}</h1>
          <h1>Safety Warnings: {selectedDestination["Health & Safety Warnings"]}</h1>
          <h1>Language Spoken: {selectedDestination["Language Spoken"]}</h1>
          <h1>Cultural considerations: {selectedDestination["Cultural Considerations"]}</h1>
          <h1>Events/Festivals: {selectedDestination["Event/Festival Occurrence"]}</h1>
        </div>
        <div className="w-1/2">
          <img src={selectedDestination.Image} className="w-full h-full object-cover" />
        </div>
      </div>
      <button 
          className="border-2 flex items-center px-3 py-1 rounded-md mt-2" 
          onClick={handleWishlistToggle}
        >
          <Heart className={`mr-2 ${isWishlisted ? "fill-red-500 text-red-500" : "text-gray-500"}`} /> 
          {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
        </button>
    </div>
  );
};

export default PlaceInfoPage;
