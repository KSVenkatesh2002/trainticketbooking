import mongoose from 'mongoose';

const stationSchema = new mongoose.Schema({
    name: String,
    trains: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Train'
    }]
});

const Station = mongoose.model('Station', stationSchema);
export default Station;
