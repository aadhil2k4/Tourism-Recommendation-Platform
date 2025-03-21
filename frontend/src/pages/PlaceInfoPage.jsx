import { 
  Heart, Map, Utensils, Hotel, Binoculars, Sun, CloudRain, DollarSign, Plane, ShieldAlert, Users, Globe, CalendarDays, Home, Activity 
} from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useDestinationStore } from '../store/useDestinationStore';
import { useEffect } from 'react';
import { useWishlistStore } from '../store/useWishlistStore';

const PlaceInfoPage = () => {
  const { id } = useParams();
  const { selectedDestination, getDestinationById } = useDestinationStore();
  const { wishlist, addToWishList, removeFromWishlist } = useWishlistStore();

  useEffect(() => {
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
      addToWishList({ _id: id });
    }
  };

  const openInMaps = (type) => {
    const latitude = selectedDestination?.Latitude;
    const longitude = selectedDestination?.Longitude;
    const city = selectedDestination?.["Destination Name"] || "";
    const country = selectedDestination?.Country || "";

    if (!latitude || !longitude) {
      console.error("Latitude or Longitude is missing");
      return;
    }

    let mapURL;
    switch (type) {
      case "restaurants":
        mapURL = `https://www.google.com/maps/search/restaurants+in+${city}+${country}/@${latitude},${longitude},16z`;
        break;
      case "hotels":
        mapURL = `https://www.google.com/maps/search/hotels+in+${city}+${country}/@${latitude},${longitude},16z`;
        break;
      case "attractions":
        mapURL = `https://www.google.com/maps/search/tourist+attractions+in+${city}+${country}/@${latitude},${longitude},16z`;
        break;
      default:
        mapURL = `https://www.google.com/maps/place/${city},+${country}/@${latitude},${longitude},13z/data=!3m1!4b1`;
    }

    window.open(mapURL, "_blank");
  };

  return (
    <div>
    <div className="flex flex-col md:flex-row w-full p-6 bg-base-200 rounded-lg shadow-lg pl-0">
      {/* Left Section - Destination Info */}
      <div className="w-full md:w-1/2 p-6 space-y-4">
        <h1 className="text-3xl font-bold">{selectedDestination["Destination Name"]}, {selectedDestination.Country}</h1>

        <div className="p-1 border-2 rounded-lg shadow">
          <p className="flex items-start gap-2"><Sun/> <span className='font-bold'>Climate Type:</span> {selectedDestination["Climate Type"]}</p>
          <p className="flex items-start gap-2"><CalendarDays /> <span className='font-bold'>Best Visiting Season:</span> {selectedDestination["Best Visiting Season"]}</p>
          <p className="flex items-start gap-2"><Users /> <span className='font-bold'>Recommended for: </span>{selectedDestination["Recommended for"]}</p>
          <p className="flex items-start gap-2"><Activity /> <span className='font-bold'>Activity Types: </span>{selectedDestination["Activity Types"]}</p>
          <p className="flex items-start gap-2"><Binoculars /> <span className='font-bold'>Nearby Attractions: </span>{selectedDestination["Nearby Attractions"]}</p>
          <p className="flex items-start gap-2"><DollarSign /> <span className='font-bold'>Budget Level: </span>{selectedDestination["Budget Level"]}</p>
          <p className="flex items-start gap-2"><Home/> <span className='font-bold'>Avg Cost of Stay:</span> ${selectedDestination["Average Cost of Stay per Night (USD)"]}</p>
          <p className="flex items-start gap-2"><Plane/> <span className='font-bold'>Nearest Airport: </span>{selectedDestination["Airport Proximity (km)"]} km</p>
          <p className="flex items-start gap-2"><Utensils/> <span className='font-bold'>Local Transports: </span>{selectedDestination["Local Transportation Availability"]}</p>
          <p className="flex items-start gap-2"><Globe/> <span className='font-bold'>Language Spoken: </span>{selectedDestination["Language Spoken"]}</p>
          <p className="flex items-start gap-2"><ShieldAlert/> <span className='font-bold'>Crime Index:</span>{selectedDestination["Crime Index"]}</p>
          <p className="flex items-start gap-2"><CloudRain /> <span className='font-bold'>Safety Warnings:</span> {selectedDestination["Health & Safety Warnings"]}</p>
        </div>
      </div>

      {/* Right Section - Image */}
      <div className="w-full md:w-1/2">
        <img src={selectedDestination.Image} className="w-full h-full object-cover rounded-lg shadow-lg" />
      </div>
    </div>
    <div className="flex justify-between px-6 gap-4 mt-6 mb-6">
        <button 
          className="border-2 flex items-center px-4 py-2 rounded-md"
          onClick={handleWishlistToggle}
        >
          <Heart className={`mr-2 ${isWishlisted ? "fill-red-500 text-red-500" : "text-gray-500"}`} /> 
          {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
        </button>

        <button className="border-2 flex items-center px-4 py-2 rounded-md" onClick={() => openInMaps("default")}>
          <Map className="mr-2" /> View in Maps
        </button>

        <button className="border-2 flex items-center px-4 py-2 rounded-md" onClick={() => openInMaps("restaurants")}>
          <Utensils className="mr-2" /> Restaurants
        </button>

        <button className="border-2 flex items-center px-4 py-2 rounded-md" onClick={() => openInMaps("hotels")}>
          <Hotel className="mr-2" /> Hotels
        </button>

        <button className="border-2 flex items-center px-4 py-2 rounded-md" onClick={() => openInMaps("attractions")}>
          <Binoculars className="mr-2" /> Attractions
        </button>
        </div>
        </div>
  );
};

export default PlaceInfoPage;
