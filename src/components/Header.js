import { LOGO_URL } from "../utils/constants";
import { useState } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Header = () => {

    // let btnName = "Login"
    const [btnName, setBtnName] = useState("Login");

    const onlineStatus = useOnlineStatus();

    // if no dependency array => useEffect is called on every component render
    // there is a catch if dependency array is present than useEffect will be called only 
    // at first render but if dependency array is not present it will be called after every render
    // if the dependency array is like [btnName] then every time when btn is updated it will be called
    // useEffect ( () =>  {
    //     console.log("useEffect called")
    // }, [])

    return (
        <div className="flex justify-between bg-pink-100 shadow-lg">
            <div className="logo-container">
                <img className="w-56" src={LOGO_URL}/>
            </div>
            <div className="flex items-center">
                <ul className="flex p-4 m-4">
                    <li className="px-4">Online Status: {onlineStatus ? "Online" : "Offline"}</li>
                    <li className="px-4"> <Link to="/"> Home </Link> </li>
                    <li className="px-4"> <Link to="/about"> About Us</Link> </li>
                    <li className="px-4"> <Link to="/contact"> Contact Us</Link> </li>
                    <li className="px-4"> <Link to="/grocery"> Grocery</Link> </li>
                    <li className="px-4">Cart</li>
                    <button className="login" onClick={() => {
                        btnName === "Login" ? setBtnName("Logout") : setBtnName("Login");
                    }}>{btnName}</button>
                </ul>
            </div>
        </div>
    );
};

export default Header;