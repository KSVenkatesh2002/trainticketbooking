import mongoose from 'mongoose';
const { Schema } = mongoose;

const BookingSchema = new Schema({
    train_number: { type: String, required: true },
    passenger: {
        name: { type: String, required: true },
        age: { type: Number, required: true },
        gender: { type: String, required: true }
    },
    from_station: {
        name: { type: String, required: true },
        no: { type: Number, required: true }
    },
    to_station: {
        name: { type: String, required: true },
        no: { type: Number, required: true }
    },
    class: { type: String, required: true },
    coach: { type: String, required: true },
    seat: { type: String, required: true },
    status: { type: String, required: true },
    booking_date: { type: Date, required: true },
    pnr: { type: String, required: true }
});

const Booking = mongoose.model('Booking', BookingSchema);

export default Booking;
