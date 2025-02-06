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
        const number = req.body.number;

        const isTrainUploaded = await Train.findOne({ number });
        if (isTrainUploaded) return res.status(401).json({ message: 'Train already uploaded' });
        const newTrain = new Train({ ...req.body });
        await newTrain.save();
        //console.log('New Train Saved:', result);

        const trainId = newTrain._id; // Use the generated ObjectId
        console.log('Train ID:', trainId)
        //console.log('Start processing stops...');
        for (const stop of req.body.stops) {
            //console.log('Processing stop:', stop.station);
            let station = await Station.findOne({ name: stop.station });

            if (station) {
                console.log('\nExisting station found:', station.name);
                if (!station.trains.includes(trainId)) {
                    station.trains.push(trainId);
                    await station.save();
                    //console.log('Station updated:', station);
                }
                console.log('Station updated: ', station);
            } else {
                console.log('\nCreating new station:', stop.station);
                const newStation = new Station({
                    name: stop.station,
                    trains: [trainId]
                });
                await newStation.save();
                console.log('New Station Saved:', newStation);
            }
        }
        console.log('\nAll stations updated.\n\n');
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

export const searchTrain = async (req, res, next) => {
    const {sourceStation, destinationStation, date, classes} = req.body
    
    //console.log('\n\n\ngiven data : ',sourceStation,destinationStation,date,classes)

    try{
        // const searchedStations = ["c", "f"];
        // const trains = await Train.find({
        // stops: { $all: [
        //     { $elemMatch: { station: searchedStations[0] } },
        //     { $elemMatch: { station: searchedStations[1] } }
        // ]}
        // });

        // const filteredTrains = trains.filter(train => {
        // const stops = train.stops.map(stop => stop.station);
        // const index1 = stops.indexOf(searchedStations[0]);
        // const index2 = stops.indexOf(searchedStations[1]);
        // return index1 !== -1 && index2 !== -1 && index1 < index2;
        // });

        let availableTrain=[];
        if (sourceStation && destinationStation) {
            sourceStation.trains.forEach(sourceTrainId => {
                destinationStation.trains.forEach(destinationTrainId => {
                    if (sourceTrainId.toString() === destinationTrainId.toString()) {
                        availableTrain.push(sourceTrainId);
                    }
                })
            })
        }else{
            res
                .status(200)
                .json({
                    success:false,
                    message:'no trains available for given data'
                }); 
            return
        }

        console.log('\navailableTrain',availableTrain)

        const trains = await Train.find({ _id: { $in: availableTrain } });
        // console.log('\ntrain',trains)
        // console.log('\ntrain len',trains.length)

        if(trains.length!==0) { 
            const filteredTrains = trains.filter(train => {
            const stops = train.stops.map(stop => stop.station);
            console.log('stop',stops)
            const index1 = stops.indexOf(sourceStation.name);
            const index2 = stops.indexOf(destinationStation.name);
            // console.log('index ',index1,index2)
            return index1 !== -1 && index2 !== -1 && index1 < index2})

            console.log(filteredTrains)
            if(filteredTrains.length !== 0)
                res
                .status(200)
                .json({
                    filteredTrains,
                    date,
                    classes,
                    success:true});
            else
                res
                .status(401)
                .json({
                    success:false,
                    message:'train going opposite direction'});    
        }else
            res
                .status(401)
                .json({
                    success:false,
                    message:'no trains available for given stations'});
    }catch(e){
        next(e)
    }
}

export const bookTicket = async (req, res, next) => {
    const {train, date:finalDate, class:selectedClass, sourceName, destinationName, passengerInfo, contactInfo, payment } = res.body
    
}
