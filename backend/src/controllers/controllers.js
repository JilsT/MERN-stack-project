const data = require("../assets/data");
const Address = require("../models/address");

const saveData = async () => {
    try {
        for (let index = 0; index < data.length; index++) {
            let { name, address, city, pincode, location, contactNo } = data[index];
            let newAddress = new Address({
                name, address, city, pincode, location, contactNo
            });

            let exsistingAddress;
            try {
                exsistingAddress = await Address.findOne({ name: name });
            } catch (error) {
                console.log(error.message);
            }

            if (exsistingAddress) {
                continue;
            }
            else {
                try {
                    await newAddress.save();
                } catch (err) {
                    console.log(err.message);
                }
            }
        }
        Address.createIndex({ location: "2dsphere"});
    } catch (err) {
        console.log(err.message);
    }
}

const fetchData = async (req, res) => {

    const lat = req.body.lat;
    const lng = req.body.lng;

    try {
        const addressData = await Address.aggregate([
            {
                $geoNear: {
                    near: { type: "Point", coordinates: [parseFloat(lng), parseFloat(lat)] },
                    key: "location",
                    maxDistance: parseFloat(1000) * 1609,
                    distanceField: "dist.calculated",
                    spherical: true,
                    distanceMultiplier: 0.001
                }
            }
        ]);
        res.send({ data: addressData });
    } catch (error) {
        console.log(error.message);
    }
};

exports.fetchData = fetchData;