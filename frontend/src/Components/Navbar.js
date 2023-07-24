import React, { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

import "../Components/Navbar.css";

const Navbar = () => {
    const navRef = useRef();

    const showNavBar = () => {
        navRef.current.classList.toggle("responsive_nav");
    }

    return (
        <header>
            <img class="logo-nav" src="logo.png" />
            <nav ref={navRef}>
                <a href="/#" className="nav-links">Home</a>
                <a href="#About" className="nav-links">About us</a>
                <a href="#services" className="nav-links">Help</a>
                <a href="#Contact" className="nav-links">Contact us</a>
                <button className="nav-btn nav-close-btn" onClick={showNavBar}>
                    <FaTimes />
                </button>
            </nav>
            <button className="nav-btn" onClick={showNavBar}>
                <FaBars />
            </button>
        </header>
    );
}

export default Navbar;