import cron from 'node-cron';
import Booking from '../models/booking.model.js';
import User from '../models/user.model.js';

const deletePendingBookings = async () => {
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);

    try {
        // Find all expired pending bookings
        const expiredBookings = await Booking.find({
            status: "pending",
            createdAt: { $lte: tenMinutesAgo }
        });

        if (expiredBookings.length === 0) {
            console.log("✅ No expired bookings to delete.");
            return;
        }

        // Extract booking IDs
        const bookingIds = expiredBookings.map(booking => booking._id.toString());

        // Delete bookings
        const result = await Booking.deleteMany({
            _id: { $in: bookingIds }
        });

        console.log(`❌ Deleted ${result.deletedCount} expired pending bookings.`);

        // Remove PNR from users
        await User.updateMany(
            { pnr: { $in: bookingIds } },
            { $pull: { pnr: { $in: bookingIds } } }
        );

        console.log(`🛑 Removed ${result.deletedCount} PNR numbers from users.`);

    } catch (error) {
        console.error("⚠️ Error deleting pending bookings:", error);
    }
};

// Run every 5 minutes
cron.schedule('*/5 * * * *', deletePendingBookings);

export default deletePendingBookings;
