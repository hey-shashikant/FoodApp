import { CDN_URL } from "../utils/constants";

const ResturantCard = (props) => {
    const { resData } = props;

    const {
        cloudinaryImageId,
        name, 
        avgRatingString,
        cuisines,
        costForTwo,
        sla,
    } = resData?.info;

    const { deliveryTime } = sla;

    return (
        <div className="res-card">
            <img className="res-logo" alt="res-logo" src={CDN_URL + cloudinaryImageId}/>
            <h3>{name}</h3>
            <h4>{cuisines.join(", ")}</h4>
            <h4>{avgRatingString} stars</h4>
            <h4>{deliveryTime} minutes</h4>
            <h4>{costForTwo}</h4>
        </div>
    )
}

export default ResturantCard