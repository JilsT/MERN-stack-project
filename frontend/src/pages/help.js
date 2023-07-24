import React, { useState } from "react";
import { Table, Tbody, Tr, Td } from 'react-super-responsive-table';

import "../Components/TableStyles.css";
import LoadingSpinner from "../Components/LoadingSpinner";
import Button from "../Components/Button";

const Help = () => {

    const [lat, setLat] = useState();
    const [lng, setLng] = useState();
    const [addressData, setAddressData] = useState();
    const [fetchedData, setFetchedData] = useState(false);
    const [loading, setLoading] = useState(false);

    navigator.geolocation.getCurrentPosition(position => {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
    })

    const location = {
        lat: lat,
        lng: lng
    }
    const [buttonText, setButtonText] = useState("Find the nearest locations!");

    const findCo = async (e) => {
        setLoading(true);
        e.preventDefault();
        const baseURL = "http://localhost:5000"
        const response = await fetch(baseURL, {
            method: "POST",
            body: JSON.stringify(location),
            headers: {
                "Content-type": "application/json"
            },
        });
        const data = await response.json();
        // console.log(data);
        setAddressData(data.data);
        setFetchedData(true);
        setLoading(false);
        setButtonText("Nearest Locations:")

    }

    return (
        <>
            {loading && <div className="center"><LoadingSpinner /></div>}
            {!loading && <div className="container">
                <div className="address">
                    <form action="" onSubmit={findCo}>
                        <Button type="submit" id="submit">{buttonText}</Button>
                    </form>
                    <Table className="content-table">
                        <Tbody>
                            {fetchedData && addressData.map((data) => {
                                return (
                                    <React.Fragment key={data._id}>
                                        <Tr className="table-row">
                                            <Td className="name-column">
                                                {data.name}
                                            </Td>
                                            <Td className="address-column">
                                                {data.address}
                                            </Td>
                                            <Td>
                                                {Math.round(data.dist.calculated)} Km
                                            </Td>
                                            <Td className="number-column">
                                                {data.contactNo}
                                            </Td>
                                        </Tr>
                                    </React.Fragment>
                                )
                            })}
                        </Tbody>
                    </Table>
                </div>
                <div >
                    <iframe title="map" className="map" src="https://www.google.com/maps/embed/v1/search?q=dog+ngos+in+delhi&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"></iframe>
                </div>
            </div>}
        </>
    );

}

export default Help;

