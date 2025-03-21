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
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 animate-spin"></div>
      </div>
    );
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

  const detailItems = [
    { icon: Sun, label: "Climate Type", value: selectedDestination["Climate Type"] },
    { icon: CalendarDays, label: "Best Visiting Season", value: selectedDestination["Best Visiting Season"] },
    { icon: Users, label: "Recommended for", value: selectedDestination["Recommended for"] },
    { icon: Activity, label: "Activity Types", value: selectedDestination["Activity Types"] },
    { icon: Binoculars, label: "Nearby Attractions", value: selectedDestination["Nearby Attractions"] },
    { icon: DollarSign, label: "Budget Level", value: selectedDestination["Budget Level"] },
    { icon: Home, label: "Avg Cost of Stay", value: `$${selectedDestination["Average Cost of Stay per Night (USD)"]} per night` },
    { icon: Plane, label: "Nearest Airport", value: `${selectedDestination["Airport Proximity (km)"]} km` },
    { icon: Utensils, label: "Local Transports", value: selectedDestination["Local Transportation Availability"] },
    { icon: Globe, label: "Language Spoken", value: selectedDestination["Language Spoken"] },
    { icon: ShieldAlert, label: "Crime Index", value: selectedDestination["Crime Index"] },
    { icon: CloudRain, label: "Safety Warnings", value: selectedDestination["Health & Safety Warnings"] },
  ];

  return (
    <div 
      className="p-8 flex flex-col"
    >
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl mx-auto">
        {/* Left Section - Destination Image */}
        <div 
          className="w-full md:w-1/2 rounded-2xl overflow-hidden shadow-2xl"
        >
          <img 
            src={selectedDestination.Image} 
            alt={selectedDestination["Destination Name"]} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Right Section - Destination Details */}
        <div 
          className="w-full md:w-1/2 space-y-6"
        >
          <div>
            <h1 className="text-4xl font-bold mb-2">
              {selectedDestination["Destination Name"]}
            </h1>
            <p className="text-xl text-gray-500">
              {selectedDestination.Country}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 bg-gray-50 p-6 rounded-2xl shadow-md">
            {detailItems.map(({ icon: Icon, label, value }, index) => (
              <div key={index} className="flex items-center space-x-3">
                <Icon className="text-blue-500 w-6 h-6" />
                <div>
                  <p className="text-xs text-gray-500 font-semibold">{label}</p>
                  <p className="text-sm text-gray-800">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div 
        className="mt-8 flex justify-center space-x-4 w-full max-w-6xl mx-auto"
      >
        {[
          { icon: Heart, text: isWishlisted ? "Remove from Wishlist" : "Add to Wishlist", onClick: handleWishlistToggle, className: isWishlisted ? "text-red-500 fill-red-500 bg-red-50" : "text-gray-500 bg-gray-50" },
          { icon: Map, text: "View in Maps", onClick: () => openInMaps("default"), className: "text-blue-500 bg-blue-50" },
          { icon: Utensils, text: "Restaurants", onClick: () => openInMaps("restaurants"), className: "text-green-500 bg-green-50" },
          { icon: Hotel, text: "Hotels", onClick: () => openInMaps("hotels"), className: "text-purple-500 bg-purple-50" },
          { icon: Binoculars, text: "Attractions", onClick: () => openInMaps("attractions"), className: "text-orange-500 bg-orange-50" },
        ].map(({ icon: Icon, text, onClick, className }, index) => (
          <button
            key={index}
            className={`flex items-center justify-center px-4 py-2 rounded-full shadow-md transition-all duration-300 hover:shadow-lg ${className}`}
            onClick={onClick}
          >
            <Icon className="mr-2 w-5 h-5" />
            <span className="text-sm font-medium">{text}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PlaceInfoPage;
