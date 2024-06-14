import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";

const RestaurantMenu = () => {

    const [resInfo, setResInfo] = useState(null);

    useEffect ( () => {
        fetchMenu();
    },[]);

    const fetchMenu = async () => {
        const data = await fetch("https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=17.488172&lng=78.3879387&restaurantId=344287&catalog_qa=undefined&submitAction=ENTER");
        const json = await data.json();

        console.log(json?.data?.cards[2]?.card?.card?.info?.name)
        console.log(json);

        setResInfo(json.data);
    };

    if (resInfo === null) return <Shimmer/>;
    
    const { name, cuisines, costForTwoMessage } = resInfo?.cards[2]?.card?.card?.info || {};

    const {itemCards} = 
        resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[4]?.card?.card;

    console.log(itemCards);


    return (
        <div className="menu">
            <h1>{name}</h1>
            <p>
                {cuisines.join(", ")} - {costForTwoMessage}
            </p>
            <h2>Menu</h2>
            <ul>
                {itemCards.map( item => <li key={item.card.info.id}>{item.card.info.name} - Rs. {item.card.info.price/100 || item.card.info.defaultprice/100}</li>)}
            </ul>
        </div>
    );
};

export default RestaurantMenu;