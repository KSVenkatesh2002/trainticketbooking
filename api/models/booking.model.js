import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    train_id: { type: String, required: true },
    payment_id:{ type:String},
    passenger: {
        name: { type: String, required: true },
        age: { type: Number, required: true },
        gender: { type: String, required: true },
        birth: { type: String, required: true }
    },
    contactDetails: {
        name: { type: String, required: true },
        email: { type: String, required: true},
        phoneno: { type: String, required: true }, 
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
    coach: { type: Number, required: true },
    seat: { type: Number, required: true },
    status: { type: String, required: true },
    booking_date: { type: Date, required: true },
},{ timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking; 
