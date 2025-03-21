import PlacesCard from "../components/PlacesCard"
import { useWishlistStore } from "../store/useWishlistStore"
import { useEffect } from "react";

const WishListPage = () => {
    const { wishlist, getWishList } = useWishlistStore();
    console.log(wishlist)

    useEffect(() => {
        getWishList();
      }, [getWishList]);

  return (
    <div>
        <h1 className="text-xl font-semibold mb-3">Your WishList </h1>
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