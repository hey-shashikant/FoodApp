import { LOGO_URL } from "../utils/constants";
import { useState, useEffect } from "react";

const Header = () => {

    // let btnName = "Login"
    const [btnName, setBtnName] = useState("Login");

    // if no dependency array => useEffect is called on every component render
    // there is a catch if dependency array is present than useEffect will be called only 
    // at first render but if dependency array is not present it will be called after every render
    // if the dependency array is like [btnName] then every time when btn is updated it will be called
    // useEffect ( () =>  {
    //     console.log("useEffect called")
    // }, [])

    return (
        <div className="header">
            <div className="logo-container">
                <img className="logo" src={LOGO_URL}/>
            </div>
            <div className="nav-items">
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Contact Us</li>
                    <li>Cart</li>
                    <button className="login" onClick={() => {
                        btnName === "Login" ? setBtnName("Logout") : setBtnName("Login");
                    }}>{btnName}</button>
                </ul>
            </div>
        </div>
    );
};

export default Header;