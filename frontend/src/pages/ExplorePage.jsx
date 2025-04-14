import { useEffect, useState } from "react";
import Map, { Marker, Popup } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";
import { MapPin, Star } from "lucide-react";
import { format } from "timeago.js";
import { axiosInstance } from "../libs/axios";
import { useAuthStore } from "../store/useAuthStore";
import { useExploreStore } from "../store/useExploreStore";
import { toast } from "react-hot-toast";

const Explore = () => {
  const { user } = useAuthStore();
  const currentUser = user.name;

  const [viewState, setViewState] = useState({
    latitude: 46,
    longitude: 17,
    zoom: 4,
  });

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [rating, setRating] = useState(0);

  const [newPlace, setNewPlace] = useState(null);
  const [currentPlaceId, setCurrentPlaceId] = useState(null);

  const { pins, fetchPins, addPin } = useExploreStore();

  useEffect(() => {
    fetchPins();
  }, [fetchPins]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPin = {
      username: currentUser,
      title,
      desc,
      rating,
      latitude: newPlace.latitude,
      longitude: newPlace.longitude,
    };
    try {
      const res = await axiosInstance.post("/pins", newPin);
      addPin(res.data);
      toast.success("Pin added successfully");
      setNewPlace(null);
      setTitle("");
      setDesc("");
      setRating(0);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMarkerClick = (id, latitude, longitude) => {
    setCurrentPlaceId(id);
    setViewState({ ...viewState, latitude, longitude });
  };

  const handleAddClick = (e) => {
    const longitude = e.lngLat.lng;
    const latitude = e.lngLat.lat;

    setNewPlace({
      latitude,
      longitude,
    });
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Map
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        mapLib={import("maplibre-gl")}
        style={{ width: "100%", height: "100%" }}
        onDblClick={handleAddClick}
        doubleClickZoom={false}
        transitionDuration="200"
        mapStyle="https://tiles.stadiamaps.com/styles/outdoors.json"
      >
        {pins.map((p) => (
          <div key={p._id}>
            <Marker
              latitude={p.latitude}
              longitude={p.longitude}
              offsetLeft={-viewState.zoom * 3.5}
              offsetTop={-viewState.zoom * 7}
              onClick={() =>
                handleMarkerClick(p._id, p.latitude, p.longitude)
              }
            >
              <MapPin
                style={{
                  fontSize: viewState.zoom * 7,
                  color:
                    p.username === currentUser ? "slateblue" : "tomato",
                  fill: p.username === currentUser ? "slateblue" : "tomato",
                  cursor: "pointer",
                }}
              />
            </Marker>

            {p._id === currentPlaceId && (
              <Popup
                latitude={p.latitude}
                longitude={p.longitude}
                closeButton={true}
                closeOnClick={false}
                onClose={() => setCurrentPlaceId(null)}
                anchor="left"
              >
                <div className="bg-white overflow-hidden transition-all duration-300">
                  <div className="p-3 space-y-4">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-semibold text-gray-800 line-clamp-1">
                        {p.title}
                      </h3>
                      <div className="flex space-x-0.5">
                        {Array(p.rating)
                          .fill(0)
                          .map((_, i) => (
                            <Star
                              key={i}
                              size={18}
                              className="text-yellow-400 fill-yellow-400"
                            />
                          ))}
                        {Array(5 - p.rating)
                          .fill(0)
                          .map((_, i) => (
                            <Star
                              key={i + p.rating}
                              size={18}
                              className="text-gray-300"
                            />
                          ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <span className="text-xs uppercase font-medium text-gray-500">
                          Review
                        </span>
                        <p className="mt-1 text-gray-600 text-sm line-clamp-3">
                          {p.desc}
                        </p>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-gray-100 flex justify-between items-center text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <span className="font-medium">
                          Created by: {p.username}
                        </span>
                      </div>
                      <time className="text-gray-400">
                        {format(p.createdAt)}
                      </time>
                    </div>
                  </div>
                </div>
              </Popup>
            )}
          </div>
        ))}

        {newPlace && (
          <Popup
            latitude={newPlace.latitude}
            longitude={newPlace.longitude}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setNewPlace(null)}
            anchor="left"
            transitionDuration="200"
            offsetLeft={-viewState.zoom * 3.5}
            offsetTop={-viewState.zoom * 7}
            onMove={(evt) => setViewState(evt.viewState)}
          >
            <div className="bg-white p-3">
              <h3 className="text-xl font-semibold mb-4 text-gray-800">
                Add Your Review
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="title" className="text-sm font-medium">
                    Title
                  </label>
                  <input
                    id="title"
                    placeholder="Enter a title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="desc" className="text-sm font-medium">
                    Review
                  </label>
                  <textarea
                    id="desc"
                    placeholder="Write something about this place..."
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    className="min-h-[120px] w-full p-2 border border-gray-300 rounded"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="rating" className="text-sm font-medium">
                    Rating
                  </label>
                  <select
                    id="rating"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded"
                  >
                    <option value="0">Select rating</option>
                    {[1, 2, 3, 4, 5].map((value) => (
                      <option key={value} value={value}>
                        {value} {value === 1 ? "Star" : "Stars"}
                      </option>
                    ))}
                  </select>

                  <div className="flex mt-2">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          size={20}
                          className={
                            i < rating
                              ? "text-yellow-400 fill-yellow-400 cursor-pointer"
                              : "text-gray-300 cursor-pointer"
                          }
                          onClick={() => setRating(i + 1)}
                        />
                      ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full mt-6 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
                >
                  Add Review
                </button>
              </form>
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
};

export default Explore;
