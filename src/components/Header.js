import { LOGO_URL } from "../utils/constants";
import { useState } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Header = () => {
  const [btnName, setBtnName] = useState("Login");

  const onlineStatus = useOnlineStatus();

  return (
    <div className="flex justify-between bg-pink-100 shadow-lg">
      <div className="logo-container">
        <img className="w-56" src={LOGO_URL} alt="Company Logo" />
      </div>
      <div className="flex items-center">
        <ul className="flex p-4 m-4 items-center">
          <li className="px-4 flex items-center">
            <span
              className={`ml-2 w-3 h-3 rounded-full ${
                onlineStatus ? "bg-green-500" : "bg-red-500"
              }`}
            ></span>
            {onlineStatus ? "" : ""}
          </li>
          <li className="px-4">
            <Link to="/"> Home </Link>
          </li>
          <li className="px-4">
            <Link to="/about"> About Us</Link>
          </li>
          <li className="px-4">
            <Link to="/contact"> Contact Us</Link>
          </li>
          <li className="px-4">
            <Link to="/grocery"> Grocery</Link>
          </li>
          <li className="px-4">Cart</li>
          <button
            className="px-4 py-2 bg-gray-100 rounded-lg"
            onClick={() => {
              btnName === "Login" ? setBtnName("Logout") : setBtnName("Login");
            }}
          >
            {btnName}
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Header;
