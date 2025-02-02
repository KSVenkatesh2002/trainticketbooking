import mongoose from 'mongoose';

const trainSchema = new mongoose.Schema(
    {
        name: String,
        number: String,
        source: String,
        destination: String,
        departureTime: String,
        arrivalTime: String,
        duration: String,
        daysOfOperation: [String],
        seatsAvailable: {
            sleeper: Number,
            AC3Tier: Number,
            AC2Tier: Number,
            chairCar : Number,
            executive : Number
        },
        fare: {
            sleeper: Number,
            AC3Tier: Number,
            AC2Tier: Number,
            chairCar: Number,
            executive: Number
        },
        stops: [{
            station: String,
            arrival: String,
            departure: String
        }]
    },
    { timestamps: true }
);

const Train = mongoose.model('Train', trainSchema);
export default Train;
