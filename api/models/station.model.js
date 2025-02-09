import mongoose from 'mongoose';

const stationSchema = new mongoose.Schema({
    name: String,
});

const Station = mongoose.model('Station', stationSchema);
export default Station;
