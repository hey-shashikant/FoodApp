import ResturantCard from "./ResturantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { RESTAURANT_API_URL } from "../utils/constants";

const Body = () => {
  // Local State Variable
  const [listOfResturants, setListOfResturants] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [offset, setOffset] = useState(""); // State to keep track of the current offset
  const [isFetching, setIsFetching] = useState(false); // State to prevent multiple fetch calls

  // It will be called when the render cycle is finished.
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [offset]);

  const fetchData = async (nextOffset = "") => {
    setIsFetching(true);
    const data = await fetch(`${RESTAURANT_API_URL}${nextOffset ? `&pageOffset=${nextOffset}` : ''}`);
    const json = await data.json();

    const newRestaurants = json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
    const nextOffsetValue = json?.data?.pageOffset?.nextOffset || "";

    setListOfResturants((prevList) => [...prevList, ...newRestaurants]);
    setFilteredRestaurant((prevList) => [...prevList, ...newRestaurants]);
    setOffset(nextOffsetValue);
    setIsFetching(false);
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight ||
      isFetching
    ) {
      return;
    }
    fetchData(offset);
  };

  const onlineStatus = useOnlineStatus();

  if (onlineStatus === false) {
    return <h1>Looks like you're offline!! Please check your internet connection</h1>;
  }

  return listOfResturants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="body">
      <div className="filter flex">
        <div className="search m-4 p-4">
          <input
            type="text"
            className="border border-solid border-black"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <button
            className="px-4 py-2 bg-green-100 m-4 rounded-lg"
            onClick={() => {
              const filteredRestaurants = listOfResturants.filter((resturant) =>
                resturant.info.name.toLowerCase().includes(searchText.toLowerCase())
              );
              setFilteredRestaurant(filteredRestaurants);
            }}
          >
            Search
          </button>
        </div>
        <div className="search m-4 p-4 flex items-center">
          <button
            className="px-4 py-2 bg-gray-100 rounded-lg"
            onClick={() => {
              const filteredList = listOfResturants.filter(
                (restaurant) => restaurant.info.avgRating > 4
              );
              setFilteredRestaurant(filteredList);
            }}
          >
            Top Rated Restaurants
          </button>
        </div>
      </div>

      <div className="res-container flex flex-wrap">
        {filteredRestaurant.map((resturant) => (
          <Link key={resturant.info.id} to={"/restaurants/" + resturant.info.id}>
            <ResturantCard resData={resturant} />
          </Link>
        ))}
      </div>
      {isFetching && <Shimmer />}
    </div>
  );
};

export default Body;
