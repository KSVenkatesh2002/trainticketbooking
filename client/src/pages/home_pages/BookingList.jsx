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
        <div className="flex flex-col w-full pt-2 items-center min-h-screen bg-gray-950 p-4">
            <h1 className="text-2xl md:text-3xl font-semibold text-white mb-6">Your Bookings</h1>
            <div className="flex flex-wrap justify-between items-center w-full ">
                {bookings.length > 0 ? (
                    bookings.map((booking, index) => (
                        <div key={index} className="bg-white shadow-md rounded-lg p-4 mb-4 w-full md:w-5/11 lg:w-3/10">
                            <p className="text-lg font-medium text-gray-700">
                                Passenger: <span className="font-semibold">{booking.passenger_name}</span>
                            </p>
                            <p className="text-gray-600">
                                From: <span className="font-medium">{booking.from}</span>
                            </p>
                            <p className="text-gray-600">
                                To: <span className="font-medium">{booking.to}</span>
                            </p>
                            <p className="text-gray-600">
                                Date: <span className="font-medium">{new Date(booking.date).toISOString().split('T')[0]}</span>
                            </p>
                            <p className="text-gray-600">
                                Seat: <span className="font-medium text-blue-500">{booking.seat}</span>
                            </p>
                            <p className="text-gray-600">
                                Status: <span className={`font-medium ${booking.status === 'Pending' ? 'text-red-500' : 'text-green-600'}`}>{booking.status}</span>
                            </p>
                            <p className="text-gray-600">
                                PNR: <Link to={`/pnr-status/${booking.pnr}`}><span className="font-semibold text-blue-600 hover:underline hover:text-blue-400 ">{booking.pnr}</span></Link>
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="text-white text-lg">No bookings found.</p>
                )}
            </div>
        </div>
    );
}

export default BookingList;
