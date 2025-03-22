import {useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import DefaultDestination from "../assets/DefaultDestination.jpg";
import StarRatings from "../components/StarRatings";

const PlacesCard = ({id, name, country, image, rating}) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="w-full max-w-sm border-2 rounded-lg">
        <img
          className="p-3 h-auto max-w-full"
          src={!image ? DefaultDestination : image}
          alt={image}
        />
        <div className="px-4 flex items-center justify-between">
          <div>
            <h5 className="text-xl font-semibold">{name}, {country}</h5>
            <div className="flex items-center mt-2.5 mb-5">
              <div className="flex items-center space-x-1 rtl:space-x-reverse">
                <StarRatings ratings = {rating} />
              </div>
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-3">
                {rating}
              </span>
            </div>
          </div>
          <button className="btn btn-primary" onClick={() => navigate(`/dashboard/destinations/${id}`)}>Explore</button>
        </div>
      </div>
    </>
  );
};
PlacesCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
};

export default PlacesCard;
