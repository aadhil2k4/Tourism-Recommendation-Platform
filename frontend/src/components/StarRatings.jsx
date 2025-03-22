import propTypes from "prop-types";
import { Star, StarHalf } from "lucide-react";

const StarRatings = ({ ratings }) => {
  const ratingStar = Array.from({ length: 5 }, (elem, index) => {
    let number = index + 0.5;
    return (
      <span key={index}>
        {ratings >= index + 1 ? (
          <Star className="fill-yellow-400 text-yellow-400" />
        ) : ratings >= number ? (
          <StarHalf className="fill-yellow-400 text-yellow-400 pr-0" />
        ) : null}
      </span>
    );
  });

  return <div className="flex items-start">{ratingStar}</div>;
};

StarRatings.propTypes = {
  ratings: propTypes.number.isRequired,
};

export default StarRatings;
