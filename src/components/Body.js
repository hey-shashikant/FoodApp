import ResturantCard from "./ResturantCard";
import { useState, useEffect } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
    // Local State Variable - Super powerful variable
    const [listOfResturants, setListOfResturants] = useState([]);

    const [filteredRestaurant, setFilteredRestaurant] = useState([])

    const [searchText, setSearchText] = useState("");

    // It will be called when the render cycle is finished.
    useEffect( () => {
        fetchData();
    }, []);

    const fetchData = async () => {
        // fetch is given to us by browser which is there in JS engine...
        const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9580044&lng=77.7089009&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");

        const json = await data.json();

        // Optional Chaining
        setListOfResturants(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setFilteredRestaurant(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);

    }; 

    const onlineStatus = useOnlineStatus();

    if (onlineStatus === false) {
        return <h1>Looks like you're offline!! Please check your internet connection</h1>
    };

    return listOfResturants.length === 0 ? <Shimmer /> : (
        <div className="body">
            <div className="filter">
                <div className="search-container">
                    <input type="text" className="search-box" placeholder="Search..." value={searchText} onChange={(e) => {
                        setSearchText(e.target.value);
                    }}/>
                    <button className="search-btn" onClick={() => {
                        // Filter the restaurant cards and update the UI
                        // search Text
                        const filteredRestaurants = listOfResturants.filter(
                            (resturant) => resturant.info.name.toLowerCase().includes(searchText.toLowerCase())
                        );

                        setFilteredRestaurant(filteredRestaurants);

                        console.log(searchText);
                    }}>Search</button>
                </div>
                <button 
                    className="filter-btn"
                    onClick={() => {
                        // Write a filter logic here

                        const filteredList = listOfResturants.filter(
                            (restaurant) => restaurant.info.avgRating > 4
                        );
                        setFilteredRestaurant(filteredList);
                    }}
                >
                    Top Rated Resturants
                </button>
            </div>
            
            <div className="res-container">
                {filteredRestaurant.map((resturant) => (
                    <Link key={resturant.info.id}  to= {"/restaurants/" + resturant.info.id}> <ResturantCard f
                        resData={resturant} 
                    /> </Link>
                ))}
            </div>
        </div>
    );
}    

export default Body