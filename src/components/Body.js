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
            <div className="filter flex">
                <div className="search m-4 p-4">
                    <input type="text" className="border border-solid border-black" value={searchText} onChange={(e) => {
                        setSearchText(e.target.value);
                    }}/>
                    <button className="px-4 py-2 bg-green-100 m-4 rounded-lg" onClick={() => {
                        // Filter the restaurant cards and update the UI
                        // search Text
                        const filteredRestaurants = listOfResturants.filter(
                            (resturant) => resturant.info.name.toLowerCase().includes(searchText.toLowerCase())
                        );

                        setFilteredRestaurant(filteredRestaurants);

                        console.log(searchText);
                    }}>Search</button>
                </div>
                <div className="search m-4 p-4 flex items-center">
                    <button 
                        className="px-4 py-2 bg-gray-100 rounded-lg"
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
                
            </div>
            
            <div className="res-container flex flex-wrap">
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