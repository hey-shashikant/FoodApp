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
    <div className="restaurant-card m-4 p-4 w-[250px] h-[350px] rounded-lg bg-gray-100 hover:bg-gray-200">
      <img className="res-logo rounded-lg w-full h-32 object-cover" alt="res-logo" src={CDN_URL + cloudinaryImageId} />
      <h3 className="font-bold py-2 text-lg">{name}</h3>
      <h4 className="text-sm truncate">{cuisines.join(", ")}</h4>
      <h4 className="text-sm">{avgRatingString} stars</h4>
      <h4 className="text-sm">{deliveryTime} minutes</h4>
      <h4 className="text-sm">{costForTwo}</h4>
    </div>
  );
};

export default ResturantCard;
