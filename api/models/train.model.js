import mongoose from 'mongoose';


const trainSchema = new mongoose.Schema({
    name: { type: String, required: true },
    number: { type: Number, required: true },
    classes: { type: [String], required: true },
    daysOfOperation: { type: [String], required: true },
    coach_structure: {
        SL: {
            total_coaches: { type: Number, required: true },
            seats_per_coach: { type: Number, required: true },
            price_per_km: { type: Number, required: true }
        },
        AC2: {
            total_coaches: { type: Number, required: true },
            seats_per_coach: { type: Number, required: true },
            price_per_km: { type: Number, required: true }
        },
        AC3: {
            total_coaches: { type: Number, required: true },
            seats_per_coach: { type: Number, required: true },
            price_per_km: { type: Number, required: true }
        }
    },
    stations: [{ 
        number: { type: Number, required: true },
        name: { type: String, required: true },
        arrival: { type: String, default: null },
        departure: { type: String, default: null },
        distance: { type: Number, required: true } 
    }]
});

const Train = mongoose.model('Train', trainSchema);
export default Train;
