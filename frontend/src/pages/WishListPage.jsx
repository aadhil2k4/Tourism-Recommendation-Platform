import PlacesCard from "../components/PlacesCard"
import { useWishlistStore } from "../store/useWishlistStore"
import { useEffect } from "react";
import { Loader } from "lucide-react";
import noWishlist from "../assets/noWishlist.svg";

const WishListPage = () => {
    const { wishlist, getWishList, isLoading } = useWishlistStore();
    console.log(wishlist)

    useEffect(() => {
        getWishList();
      }, [getWishList]);

  return (
    <div>
        <h1 className="text-2xl text-center font-semibold mb-3">Your WishList </h1>
        {isLoading && <Loader className="animate-spin w-9 h-9 m-auto mt-4" />}
        {wishlist.length === 0 &&( 
        <div className="flex flex-col items-center mt-10">
          <img src={noWishlist} alt="Empty wishlist" className="w-72 h-72"/>
          <p className="text-center mt-4">Your Wishlist is empty !!</p>
          </div>
          )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlist.map((destination) => (
                  <PlacesCard
                    key={destination._id}
                    id={destination._id}
                    name={destination["Destination Name"]}
                    country={destination.Country}
                    image={destination.Image}
                    rating={destination["User Ratings (out of 5)"]}
                  />
                ))
        }
    </div>
    </div>
  )
}

export default WishListPage