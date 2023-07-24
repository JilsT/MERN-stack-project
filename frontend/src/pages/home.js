import React from "react";
import AboutComponents from "../Components/AboutComponents";
import BackGroundSlider from "../Components/BackGroundSlider";
import Navbar from "../Components/Navbar";
import Services from "../Components/Services";
import ContactUs from "../Components/contactUs";

const Home = () => {
    return (
        <>
            <Navbar />
            <BackGroundSlider />
            <AboutComponents />
            <Services />
            <ContactUs />
        </>
    )
}

export default Home;