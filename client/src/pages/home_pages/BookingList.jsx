import React, { useEffect, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux';

function BookingList() {
    const { currentUser } = useSelector((state) => state.user);
    const navigate = useNavigate()

    const [bookings, setBooking] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            if (!currentUser || !currentUser._id) {
                setError('No user ID found');
                setLoading(false);
                return;
            }

            try {
                const res = await fetch(`/api/train/get-my-booking/${currentUser._id}`);
                const data = await res.json();
                console.log(data)
                if (data.success) {
                    setBooking(data.bookings);
                } else {
                    setError(data.message);
                }
            } catch (e) {
                setError(e.message);
                console.log(e);
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, []);

    if (loading) return <div className="text-center text-xl mt-10">Loading...</div>;
    if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;

    return (
        <div className="flex flex-col w-full pt-2 items-center min-h-screen bg-gray-900 p-4">
            <h1 className="text-2xl md:text-3xl font-semibold text-white mb-6">Your Bookings</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
    {bookings.length > 0 ? (
        bookings.map((booking, index) => (
            <div
                key={index}
                className="bg-gray-900 text-white p-5 rounded-lg shadow-lg border border-gray-700 transform transition-all hover:scale-105 hover:shadow-xl"
            >
                <h3 className="text-lg font-semibold mb-2">🧑 Passenger: <span className="text-yellow-400">{booking.passenger_name}</span></h3>
                
                <div className="text-gray-300 space-y-1">
                    <p>📍 <strong>From:</strong> {booking.from}</p>
                    <p>🚆 <strong>To:</strong> {booking.to}</p>
                    <p>📅 <strong>Date:</strong> {new Date(booking.date).toISOString().split('T')[0]}</p>
                    <p>💺 <strong>Seat:</strong> <span className="text-blue-400 font-medium">{booking.seat}</span></p>
                    <p>
                        ⚡ <strong>Status:</strong> 
                        <span className={`font-semibold ${booking.status === 'Pending' ? 'text-red-500' : 'text-green-500'}`}>
                            {booking.status}
                        </span>
                    </p>
                    <p>
                        🔢 <strong>PNR:</strong> 
                        <Link to={`/pnr-status/${booking.pnr}`} className="text-blue-400 hover:underline hover:text-blue-300">
                            {booking.pnr}
                        </Link>
                    </p>
                </div>
            </div>
        ))
    ) : (
        <p className="text-white text-lg col-span-full text-center">🚫 No bookings found.</p>
    )}
</div>

        </div>
    );
}

export default BookingList;
