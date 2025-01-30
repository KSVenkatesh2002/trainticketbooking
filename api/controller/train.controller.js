import Train from '../models/train.model.js';
import Station from '../models/station.model.js';
import mongoose from 'mongoose';

export const test = (req,res) => {
    res.json({
        message : 'test request complete'
    });
};

export const trainUpload = async (req, res, next) => {
    try {
        const newTrain = new Train({ ...req.body });
        const result = await newTrain.save();
        //console.log('New Train Saved:', result);

        const trainId = newTrain._id; // Use the generated ObjectId

        //console.log('Start processing stops...');
        for (const stop of req.body.stops) {
            //console.log('Processing stop:', stop.station);
            let station = await Station.findOne({ name: stop.station });

            if (station) {
                console.log('Existing station found:', station.name);
                if (!station.trains.includes(trainId)) {
                    station.trains.push(trainId);
                    await station.save();
                    //console.log('Station updated:', station);
                }
            } else {
                console.log('Creating new station:', stop.station);
                const newStation = new Station({
                    name: stop.station,
                    trains: [trainId]
                });
                await newStation.save();
                //console.log('New Station Saved:', newStation);
            }
        }
        console.log('All stations updated.');
        res.status(200).json({ message: 'Train and stations updated successfully' });
    } catch (error) {
        console.error('Error:', error);
        next(error);
    }
};

export const trainAddressList = async (req, res, next) => {
    const address = req.query.address;

    if (!address) return res.json([]);
    try {

        // Search for stations matching the user input (case-insensitive)
        const stations = await Station.find({
            name: { $regex: new RegExp(address, "i") }
        }).limit(5); // Limit results to 5 suggestionsf

        res.status(200).json(stations);
    } catch (error) {
        console.error('Error:', error);
        next(error);
    }
}

export const searchResult = async (req, res, next) => {
    
}
