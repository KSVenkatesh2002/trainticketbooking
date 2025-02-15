import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
    method: { type: String, required: true },
    price: { type: Number, required: true },
    cardDetails:{ 
        holderName:{ type: String},
        cardNo:{ type: String},
        expiry:{ type: String},
        cvv:{ type: Number},
    },
    upiId: { type: String},

},{ timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;
