import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTicketAlt,
  faMapMarkerAlt,
  faCalendar,
  faChair,
  faCheckCircle,
  faTimesCircle,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

function BookingList() {
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [bookings, setBooking] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!currentUser || !currentUser._id) {
        setError("No user ID found");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/train/get-my-booking/${currentUser._id}`);
        const data = await res.json();
        console.log(data);
        if (data.success) {
          setBooking(data.bookings);
        } else {
          setError(data.message);
        }
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [currentUser]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[50vh] bg-slate-950">
        <div className="w-8 h-8 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-[50vh] bg-slate-950 text-red-400">
        {error}
      </div>
    );

  return (
    <div className="min-h-[calc(100vh-8vh)] bg-slate-950 p-6 md:p-10 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
          My Bookings
        </h1>
        <p className="text-slate-400">View and manage your travel history</p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {bookings.length > 0 ? (
          bookings.map((booking, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-slate-900/60 backdrop-blur-xl border border-white/5 rounded-2xl p-6 shadow-xl relative overflow-hidden group hover:border-orange-500/30 transition-all duration-300"
            >
              <div className="absolute -top-3 -right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <FontAwesomeIcon
                  icon={faTicketAlt}
                  className="text-7xl text-white"
                />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-orange-500 font-bold border border-white/10">
                    {booking.passenger_name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-white font-semibold truncate">
                      {booking.passenger_name}
                    </h3>
                    <p className="text-xs text-slate-400">Passenger</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-slate-300">
                      <FontAwesomeIcon
                        icon={faMapMarkerAlt}
                        className="text-orange-500/70"
                      />
                      {booking.from}
                    </div>
                    <FontAwesomeIcon
                      icon={faArrowRight}
                      className="text-slate-600 text-xs"
                    />
                    <div className="flex items-center gap-2 text-slate-300">
                      <FontAwesomeIcon
                        icon={faMapMarkerAlt}
                        className="text-orange-500/70"
                      />
                      {booking.to}
                    </div>
                  </div>

                  <div className="flex justify-between items-center py-2 border-t border-white/5 border-b">
                    <div className="text-sm text-slate-300">
                      <FontAwesomeIcon
                        icon={faCalendar}
                        className="mr-2 text-slate-500"
                      />
                      {new Date(booking.date).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-slate-300">
                      <FontAwesomeIcon
                        icon={faChair}
                        className="mr-2 text-slate-500"
                      />
                      {booking.seat}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <div
                      className={`flex items-center gap-1.5 text-sm font-medium ${
                        booking.status === "Pending"
                          ? "text-amber-400"
                          : "text-emerald-400"
                      }`}
                    >
                      <FontAwesomeIcon
                        icon={
                          booking.status === "Pending"
                            ? faTimesCircle
                            : faCheckCircle
                        }
                      />
                      {booking.status}
                    </div>
                    <Link
                      to={`/pnr-status/${booking.pnr}`}
                      className="text-xs font-semibold bg-slate-800 hover:bg-orange-600 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg transition-colors border border-white/10"
                    >
                      PNR: {booking.pnr}
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-slate-500">
            <FontAwesomeIcon
              icon={faTicketAlt}
              className="text-6xl mb-4 opacity-20"
            />
            <p className="text-lg">No bookings found yet.</p>
            <Link
              to="/search"
              className="mt-4 text-orange-500 hover:text-orange-400 transition-colors"
            >
              Book your first ticket &rarr;
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default BookingList;
