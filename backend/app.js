const express = require('express');
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const controllers = require("./src/controllers/controllers");

const app = express();

mongoose.set('strictQuery', false);

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST,PATCH, DELETE'); 
    next();
})

app.post("/", controllers.fetchData);

mongoose.connect("mongodb+srv://Jils:Shreejana%401@cluster0.daqae5e.mongodb.net/Sahayyam?retryWrites=true&w=majority").then(() => {
    app.listen(5000, () => {            
        console.log("Server is now running on port 5000");
    });
}).catch(err => console.log(err));


