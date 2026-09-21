import React, { useState } from "react";
import { Outlet, NavLink, Link } from "react-router-dom";
import images from "../images/AbrahamolaLogo.png";
import "../style/navigation.css";

const Navbar = () => {
    const [ showOptions, setShowOptions ] = useState(false);

    return (
        <div>
            <nav className="navbar" style={{ position: "sticky", top: 0, zIndex: 1000 }}>
                <img src={images} alt="Abrahamola Logo" />
                <div className="links">
                    <NavLink className="link" to="/" style={({isActive}) => ({
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
                    <i className="fa-solid fa-user"></i>
                    <i className="fa-solid fa-cart-shopping"></i>
                </div>

                <div className="search">
                    <input type="search" name="search" id="search" placeholder="Search" />
                    <i className="fa-solid fa-magnifying-glass"></i>
                </div>

                <div className="signbtn">
                    <Link to="/signin">Sign in</Link>
                    <Link className="signup" to="/Signup">Sign up</Link>
                </div>
            </nav>

            <hr />
            <Outlet />
        </div>
    )
}

export default Navbar                                                   