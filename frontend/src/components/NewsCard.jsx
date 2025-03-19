
import PropTypes from 'prop-types';

const NewsCard = ({title, image, link}) => {
  return (
    <div className="w-full max-w-sm border-2 rounded-lg">
            <img
              className="p-3 h-auto max-w-full"
              src={image || "https://bsmedia.business-standard.com/_media/bs/img/article/2024-09/06/full/1725606424-9293.jpg?im=FeatureCrop,size=(826,465)"}
              alt="News card image"
            />
            <div className="px-4 pb-2">
                <h5 className="text-xl font-semibold mb-2">{title}</h5>
              <button className="btn btn-primary" onClick={() => window.open(link, "_blank", "noopener,noreferrer")}>Read More</button>
            </div>
          </div>
  )
}

NewsCard.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string,
  link: PropTypes.string
};

export default NewsCard

