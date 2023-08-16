const fs = require('fs');

const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');
const mongoose = require('mongoose');

const Place = require('../models/place');
const HttpError = require('../models/http-error');
const place = require('../models/place');
const User = require('../models/user');
const user = require('../models/user');

const getPlaceById = async (req, res, next) => {
    const placeID = req.params.pid;
    let place;
    try {
        place = await Place.findById(placeID);
    } catch (err) {
        const error = new HttpError("Something went wrong, couldn't find the place", 500);
        return next(error);
    }

    if (!place) {
        const error = new HttpError("Cound not find a place with the given place id.", 404);
        return next(error);
    }

    res.json({ place: place.toObject({ getters: true }) });
}

const getPlacesByUserId = async (req, res, next) => {
    const userID = req.params.uid;
    let places;
    try {
        places = await Place.find({ creator: userID });
    } catch (err) {
        const error = new HttpError('Failed to fetch the place, try again.', 500);
        return next(error);
    }

    if (!places || places.length === 0) {
        return next(new HttpError("Cound not find a place with the given user id.", 404));
    }

    res.json({ places: places.map(place => place.toObject({ getters: true })) });
};

const createPlace = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new HttpError('Invalid inputs passed, please check the provided data.', 422);
        return next(error);
    }

    const { title, description, coordinates, address } = req.body;

    const createdPlace = new Place({
        title,
        description,
        address,
        location: coordinates,
        image: req.file.path,
        creator: req.userData.userId
    });

    let user;
    try {
        user = await User.findById(reQ.userData.userId);
    } catch (err) {
        const error = new HttpError("Creating place failed. Please, try again.", 500);
        return next(error);
    }

    if (!user) {
        const error = new HttpError('Could not find the user with the provided id', 404);
        return next(error);
    }

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdPlace.save({ session: sess });
        user.places.push(createdPlace);
        await user.save({ session: sess });
        await sess.commitTransaction();
    } catch (err) {
        return next(console.log(err.message));
    };

    res.status(201).json({ place: createdPlace });
}

const updatePlace = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new HttpError('Invalid inputs passed, please check the provided data.', 422);
    }

    const { title, description } = req.body;
    const placeID = req.params.pid;

    let place;
    try {
        place = await Place.findById(placeID);
    } catch (err) {
        const error = new HttpError('Failed to update the place.', 500);
        return next(error);
    }
    
    if (place.creator.toString() !== req.userData.userId) {
        const error = new HttpError('You are not allowed to edit this place.', 401);
        return next(error);
    }

    place.title = title;
    place.description = description;

    try {
        await place.save();
    } catch (err) {
        const error = new HttpError('Failed to update the place', 500);
        return next(error);
    }

    res.status(200).json({ place: place.toObject({ getters: true }) });
}

const deletePlace = async (req, res, next) => {
    const placeID = req.params.pid;

    let place;
    try {
        place = await Place.findById(placeID).populate('creator');
    } catch (err) {
        const error = new HttpError('Failed to delete the place.', 500);
        return next(error);
    }

    if (!place) {
        const error = new HttpError('Could not find the place to delete, please try again.', 404);
        return next(error);
    }

    if(place.creator.id !== req.userData.userId){
        const error = new HttpError('You are not allowed to delete the place', 401);
        return next(error);
    }

    const imagePath = place.image;

    try {
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await place.remove({ session: sess });
        place.creator.places.pull(place);
        await place.creator.save({ session: sess });
        await sess.commitTransaction();
    } catch (err) {
        const error = new HttpError('Failed to delete the place.', 500);
        return next(error);
    }

    fs.unlink(imagePath, err => {

    });

    res.status(200).json({ message: "Deleted place." })
}

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;