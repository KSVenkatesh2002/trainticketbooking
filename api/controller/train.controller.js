import Train from '../models/train.model.js';
import Station from '../models/station.model.js';
import Booking from '../models/booking.model.js';
import User from '../models/user.model.js'
import Payment from '../models/payment.model.js';
import { errorHandler } from '../utils/error.js';

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

        for (const stop of req.body.stations) {
            let isStationUploaded = await Station.findOne({ name: stop.name });

            if (!isStationUploaded) {
                console.log('\n not Exided station:', stop.name);

                const newStation = new Station({name:stop.name})
                await newStation.save();
                
                console.log('Station updated: ', newStation);

            }
        }
        console.log('\nAll stations updated.\n\n');
        res.status(200).json({ message: 'Train and stations updated successfully' });
    } catch (error) {
        console.error('\n\n\n\n\nError:', error);
        next(error);
    }
};

export const trainAddressList = async (req, res, next) => {
    const address = req.query.address;

    if (!address) return res.json([]);
    try {
        const stations = await Station.find({
            name: { $regex: new RegExp(address, "i") }
        }).limit(5); // Limit results to 5 suggestionsf

        res.status(200).json(stations);
    } catch (error) {
        console.error('Error:', error);
        next(error);
    }
}

export const getAvailableSeats = async (req, res, next) => {
    const {trainId, date, fromIndex, toIndex} = req.query
    try {
        const travelDate = new Date(date);

        // Find the train
        const train = await Train.findById(trainId);
        if (!train) return res.status(404).json({ message: "Train not found" });

        // Store available seats for each class
        const availableSeats = {};

        // Loop through each class and calculate available seats
        for (const cls of train.classes) {
            const totalSeats = train.coach_structure[cls].total_coaches * train.coach_structure[cls].seats_per_coach;

            // Find booked seats for the selected route & date
            const bookedSeats = await getBookedSeats(trainId, travelDate, fromIndex, toIndex, cls);

            // Calculate available seats
            const bookedCount = bookedSeats.length;
            availableSeats[cls] = totalSeats - bookedCount; // Subtract booked from total
        }

        res.json({ success: true, availableSeats });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const searchTrain = async (req, res, next) => {
    const {sourceStation, destinationStation} = req.query
    
    try {
        const trains = await Train.aggregate([
            {
                $match: {
                    "stations.name": { $all: [sourceStation, destinationStation] }
                }
            },
            {
                $addFields: {
                    sourceStationIndex: {
                        $indexOfArray: ["$stations.name", sourceStation]
                    },
                    destinationStationIndex: {
                        $indexOfArray: ["$stations.name", destinationStation]
                    }
                }
            },
            {
                $match: {
                    $expr: { $lt: ["$sourceStationIndex", "$destinationStationIndex"] }
                }
            }
        ]);


        if(trains.length>0){
            // Filter stations for each train
            trains.forEach(train => {
                // Filter stations only for this train, not all trains
                train.stations = train.stations.filter(station =>
                    station.name.trim().toLowerCase() === sourceStation.trim().toLowerCase() ||
                    station.name.trim().toLowerCase() === destinationStation.trim().toLowerCase()
                );
            });
            
            res.status(200).json({success:true, trains});

        } else
            return next(errorHandler(401,'train not available in given location'))
    }catch(e){
        next(e)
    }
}

async function getBookedSeats(trainId, date, fromIndex, toIndex, seatClass){
    try{
        //console.log('given for bs',trainId, date, fromIndex, toIndex, seatClass)
        const bookedSeats = await Booking.find({
            train_id: trainId,
            booking_date: new Date(date),
            class: seatClass,
            $or: [
                { $and: [
                    { "from_station.no": { $lte: fromIndex } }, 
                    { "to_station.no": { $gte: fromIndex } }
                ] },
                { $and: [
                    { "from_station.no": { $lte: toIndex } }, 
                    { "to_station.no": { $gte: toIndex } }
                ] }
            ]
        });
        //console.log('bookedSeats',bookedSeats)
        return bookedSeats.map(booking => booking.seat);
    }catch(e){
        return e
    }
};

const getTotalSeats = async (trainId, seatClass) => {
    try{
        //console.log('st start')
        const train = await Train.findById({ _id:trainId });
        if (!train) return [];

        const totalSeats = train.coach_structure[seatClass].total_coaches * train.coach_structure[seatClass].seats_per_coach;
        return Array.from({ length: totalSeats }, (_, i) => i + 1); // Create seat numbers
    }catch(e){
        next(errorHandler(401,e))
    }
};


const findAvailableSeat = async (trainId, date, fromIndex, toIndex, seatClass) => {
    try{
        //console.log('findAvailableSeat')
        const bookedSeats = await getBookedSeats(trainId, date, fromIndex, toIndex, seatClass);
        const totalSeats = await getTotalSeats(trainId, seatClass);
        //console.log('\nbs',bookedSeats,'\nts', totalSeats)
        // Remove booked seats from the total seat list
        const availableSeats = totalSeats.filter(seat => !bookedSeats.includes(seat));
        //console.log('as',availableSeats)
        return availableSeats.length > 0 ? availableSeats[0] : null; // Return first available seat or null if full
    }catch(e){
        next(errorHandler(401,e))
    }
};

export const bookTicket = async (req, res, next) => {
    try{
        const {
            user_id,
            train_id,
            selectedClass,
            date,
            passenger,
            contactDetails,
            seats_per_coach,
            from_station,
            to_station
        } = req.body
        //console.log('\n\n\n\n\nstart', req.body)
        const availableSeat = await findAvailableSeat(train_id, date, from_station.no, to_station.no, selectedClass);

        //console.log('availableSeat',availableSeat)

        if (!availableSeat) {
            return next(errorHandler(401,{text:'seats not available',availableSeat}))
        }

        const newBooking = new Booking({
            train_id,
            passenger: {
                name: passenger.name,
                age: Number(passenger.age),
                gender: passenger.gender,
                birth: passenger.birth
            },
            contactDetails: {
                name: contactDetails.name,
                email: contactDetails.email,
                phoneno: contactDetails.phoneno
            },
            from_station: {
                name: from_station.name,
                no: Number(from_station.no)
            },
            to_station: {
                name: to_station.name,
                no: Number(to_station.no) 
            },
            class: selectedClass,
            coach:  Math.floor(availableSeat / seats_per_coach) + 1,
            seat: availableSeat % seats_per_coach,
            status: 'Pending',
            booking_date: new Date(date),
        });
        await newBooking.save();

        const user = await User.findById(user_id)
        user.pnr.push(newBooking._id)
        await user.save()

        //console.log('new booking',newBooking)
        res.status(200).json({success: true, message: "Seat booked successfully", pnr: newBooking._id })
    }catch(e){
        next(errorHandler(401,e))
    }
};

export const payment = async (req, res, next) => {
    const { pnrList, price, method, upiId, cardDetails } = req.body;
    console.log(req.body)
    try {
        // Ensure that price is a number and multiply by the number of pnrList elements
        if (typeof price !== 'number' || isNaN(price)) {
            return res.status(400).json({ success: false, message: 'Invalid price' });
        }

        const newPayment = new Payment({
            method,
            ...(method === 'upi'
                ? { upiId }
                : {
                    cardDetails: {
                        holderName: cardDetails.holderName,
                        cardNo: cardDetails.cardNo,
                        expiry: cardDetails.expiry,
                        cvv: Number(cardDetails.cvv),
                    }
                }),
            price: price * pnrList.length
        });

        await newPayment.save();

        // Use Promise.all to handle multiple booking updates concurrently
        const updateBookings = pnrList.map(async (pnr) => {
            const updatedBooking = await Booking.findByIdAndUpdate(
                pnr,
                { $set: { status: 'Success' } },
                { new: true } // to return the updated document
            );
            
            // Check if the update was successful
            if (!updatedBooking) {
                // If the booking wasn't found or updated, return an error
                throw new Error(`Booking with PNR ${pnr} not found or update failed.`);
            }

            if (updatedBooking.status !== 'Success') {
                // If the status isn't 'Success', log or throw an error
                throw new Error(`Booking with PNR ${pnr} did not have 'Success' status after update.`);
            }

            console.log(`Booking with PNR ${pnr} updated successfully.`);
            return updatedBooking;
        });

        await Promise.all(updateBookings);

        res.status(200).json({ success: true, message: 'Payment success' });
    } catch (e) {
        // Ensure errorHandler is defined or imported correctly
        next(errorHandler(401, e));
    }
};

export const getPnr  = async (req, res, next) => {
    const pnrid = req.query.pnrid
    //console.log(pnrid)
    try{
        // get booking data
        const bookingDetails = await Booking.findById(pnrid)
        if(!bookingDetails) return next(errorHandler(401,'PNR number is not valid'))
        //console.log('booking',bookingDetails)
        
        const {train_id} = bookingDetails
        //console.log(train_id)
        
        //get Train data
        const trainDetails = await Train.findById(train_id);
        if(!trainDetails) return next(errorHandler(401,'Train not found'))
        //console.log('train', trainDetails)

        trainDetails.stations = trainDetails.stations.filter(station =>
            station.name.trim().toLowerCase() === bookingDetails.from_station.name.trim().toLowerCase() ||
            station.name.trim().toLowerCase() === bookingDetails.to_station.name.trim().toLowerCase()
        );

        const result = {
            passenger:bookingDetails.passenger,
            contact:bookingDetails.contactDetails,
            class: bookingDetails.class,
            coach: bookingDetails.coach,
            seat: bookingDetails.seat,
            status: bookingDetails.status,
            booking_date: bookingDetails.booking_date,

            trainName: trainDetails.name,
            trainNumber: trainDetails.number,
            from:{
                name: trainDetails.stations[0].name,
                time: trainDetails.stations[0].arrival
            },
            to:{
                name: trainDetails.stations[1].name,
                time: trainDetails.stations[1].departure
            },
        }
        //console.log(result)
        res.status(200).json({success:true,result})
    }catch(e){
        next(errorHandler(401,e))
        console.log(e)
    }
}

export const getMyBooking = async (req, res, next) => {
    try {
        const userId = req.params.userId;

        // Get user details
        const user = await User.findById(userId);
        if (!user) return next(errorHandler(404, 'User not found'));

        // Get user's PNR list
        const pnrList = user.pnr;
        if (!pnrList || pnrList.length === 0) {
            return res.status(200).json({ success: true, message: 'No bookings found', bookings: [] });
        }

        // Fetch all booking details based on PNRs
        const bookings = await Booking.find({ _id: { $in: pnrList } });

        // Format response data
        const result = bookings.map(booking => ({
            passenger_name: booking.passenger.name,
            from: booking.from_station.name,
            to: booking.to_station.name,
            date: booking.booking_date,
            status: booking.status,
            pnr: booking._id // Booking ID is used as PNR

        }));

        res.status(200).json({ success: true, result });

    } catch (error) {
        next(errorHandler(500, error.message || 'Internal Server Error'));
    }
}
