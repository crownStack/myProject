import React, { useState } from "react";
import { Outlet, NavLink, Link } from "react-router-dom";
import images from "../images/AbrahamolaLogo.png";
import "../style/navigation.css";

const Navbar = () => {
    const [ showOptions, setShowOptions ] = useState(false);
    const signedInUser = JSON.parse(localStorage.getItem("signinData") || "null");

    return (
        <div>
            <nav className="navbar">
                <img src={images} alt="Abrahamola Logo" />
                <div className="links">
                    <NavLink className="link" to="/Home" style={({isActive}) => ({
                        margin: "0 10px",
                        fontWeight: isActive ? "#211d1d" : "500",
                        color: isActive ? "#211d1d" : "#979281"
                    })}>Home</NavLink>

                    <NavLink className="link" to="/About" style={({isActive}) => ({
                        margin: "0 10px",
                        fontWeight: isActive ? "#211d1d" : "500",
                        color: isActive ? "#211d1d" : "#979281"
                    })}>About Us</NavLink>

                    <NavLink className="link" onClick={() => setShowOptions(!showOptions)} style={({isActive}) => ({
                        margin: "0 10px",
                        fontWeight: isActive ? "#979281" : "500",
                        color: isActive ? "#211d1d" : "#979281"
                    })}>Find Us <i style={{color: '#211d1d'}}>▼</i>
                        {showOptions && (
                            <div className="options">
                                <div>MAP</div>
                            </div>
                        )}
                    </NavLink>
                    <NavLink aria-label={`Signed in as ${signedInUser?.lastName || "user"}`}  className="link" to="/Profile" style={({isActive}) => ({
                        margin: "0 10px",
                        fontWeight: isActive ? "#211d1d" : "500",
                        color: isActive ? "#211d1d" : "#979281"
                    })}>
                        <i className="fa-solid fa-user"></i>
                        {signedInUser?.lastName && <span style={{marginLeft: '8px', fontWeight: '500', fontFamily: 'montserrat', fontSize: '16px', color: '#979281'}}>Hi,{signedInUser.lastName}</span>}
                    </NavLink>
                    <Link to="/Cart" aria-label="Open cart">
                        <i className="fa-solid fa-cart-shopping"></i>
                    </Link>
                </div>

                <div className="search">
                    <input type="search" name="search" id="search" placeholder="Search" />
                    <i className="fa-solid fa-magnifying-glass"></i>
                </div>
            </nav>

            <hr />
            <Outlet />
        </div>
    )
}

export default Navbar