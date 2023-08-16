const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const { check } = require('express-validator');
const mongoose = require('mongoose');
const path = require('path');

const placesRoutes = require('./routes/places-routes');
const userRoutes = require('./routes/users-routes')
const HttpError = require('./models/http-error');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST,PATCH, DELETE'); 

    next();
})

app.use('/api/places', placesRoutes);
app.use('/api/users', userRoutes)

app.use('/uploads/images', express.static(path.join('uploads', 'images')));

app.use((req, res, next) => {
    const error = new HttpError("Could not find this route", 404);
    throw error;
})

app.use((error, req, res, next) => {
    if(req.file){
        fs.unlink(req.file.path, err => {

        })
    }

    if (res.headerSent) {
        return next(error);
    }
    res.status(500).json({ message: error.message || "An unknown error occured" });
})

mongoose.connect(`mongodb+srv://Jils:Shreejana%401@cluster0.daqae5e.mongodb.net/mern?retryWrites=true&w=majority`)
    .then(() => {
        app.listen(5000);
    })
    .catch(err => console.log(err));
