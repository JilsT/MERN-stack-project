import React, { useState, useEffect } from "react";

import imageSlide from "../assets/data.js"
import "../Components/BackGroundSlider.css";

const BackGroundSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    useEffect(() => {
        const timer = setTimeout(() => {
            if (currentSlide === 0) {
                setCurrentSlide(1)
            }
            else if (currentSlide === 1) {
                setCurrentSlide(2);
            }
            else {
                setCurrentSlide(0);
            }
        }, 4500)
        return () => clearTimeout(timer)
    }, [currentSlide]);
    const bgImageStyle = {
        backgroundImage: `url(${imageSlide[currentSlide].url})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        height: "100vh",
        filter: "blur(3px)",
        loading: "lazy"
    }

    return (
        <>
            <div className="background">
                <div style={bgImageStyle}> </div>
                <div className="background-image"></div>
                <div className="description">
                    <h1>A little bit for yourself,
                        and everything for others.</h1>
                    <p>
                        No One Has Ever Become Poor By Giving.
                    </p>
                </div>
            </div>
        </>
    );
}

export default BackGroundSlider;