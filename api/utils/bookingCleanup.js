import cron from 'node-cron';
import Booking from '../models/booking.model.js';
import Train from '../models/train.model.js';

const cleanupExpiredBookings = async () => {
    try {
        const now = new Date();
        // Fetch all bookings
        const bookings = await Booking.find({});
        
        for (const booking of bookings) {
            const train = await Train.findById(booking.train_id);

            if (!train) {
                await Booking.findByIdAndDelete(booking._id);
                    console.log(`❌ removed booking bcz train not found: ${booking}`);
                    continue;
            } // Skip if train not found

            const destinationStation = train.stations.find(station => station.number === booking.to_station.no);

            if (destinationStation && destinationStation.arrival) {
                // console.log(destinationStation)
                const arrivalDateTime = new Date(booking.booking_date);
                const [hours, minutes] = destinationStation.arrival.split(' ')[0].split(':').map(Number);
                // console.log(hours, minutes)
                arrivalDateTime.setHours(hours);
                arrivalDateTime.setMinutes(minutes);

                if (now > arrivalDateTime) {
                    await Booking.findByIdAndDelete(booking._id);
                    console.log(`❌ Removed expired booking for train ${train.number}, Destination: ${destinationStation.name}`);
                }
            }
        }
    } catch (error) {
        console.error("⚠️ Error in booking cleanup:", error);
    }
};

// Run cleanup every hour (adjust as needed)
cron.schedule('0 */5 * * *', cleanupExpiredBookings);

export default cleanupExpiredBookings;
