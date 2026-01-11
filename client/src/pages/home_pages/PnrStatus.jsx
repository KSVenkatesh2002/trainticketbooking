import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faTrain,
  faUser,
  faPhone,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

const PnrStatus = () => {
  const { id } = useParams();
  const [pnrid, setPnrid] = useState(id || "");
  const [error, setError] = useState("");
  const [details, setDetails] = useState(null);
  const [showButton, setShowButton] = useState(false);

  const fetchPnrDetails = async (pnr) => {
    if (!pnr) return;
    try {
      const res = await fetch(`/api/train/get-pnr-status?pnrid=${pnr}`);
      const data = await res.json();
      if (data.success) {
        setDetails(data.result);
        setError("");
      } else setError("Wrong PNR number or Failed to fetch PNR details");
    } catch (err) {
      setError("Failed to fetch PNR details");
    }
  };

  useEffect(() => {
    if (id) fetchPnrDetails(id);
    setShowButton(false);
  }, [id]);

  const getPnr = async (e) => {
    e.preventDefault();
    const enteredPnr = e.target.pnr_no.value.trim();
    setShowButton(false);
    setPnrid(enteredPnr);
    fetchPnrDetails(enteredPnr);
  };

  return (
    <div className="min-h-[calc(100vh-15vh)] bg-slate-950 text-slate-100 py-10 px-4 flex flex-col items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 mb-2">
          Check PNR Status
        </h1>
        <p className="text-slate-400">
          Enter your PNR number below to get live updates
        </p>
      </motion.div>

      {/* Search Form */}
      <motion.form
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg bg-slate-900/60 backdrop-blur-xl border border-white/10 p-6 rounded-2xl shadow-xl flex flex-col gap-4"
        onSubmit={getPnr}
      >
        <div className="relative">
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
          />
          <input
            type="text"
            name="pnr_no"
            placeholder="Enter 10-digit PNR Number"
            defaultValue={id}
            onChange={(e) => setShowButton(true)}
            className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all placeholder-slate-500"
            required
          />
        </div>
        {showButton && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-3 rounded-xl shadow-lg transition-all"
            type="submit"
          >
            Get Status
          </motion.button>
        )}
      </motion.form>

      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 text-red-400 bg-red-500/10 px-6 py-3 rounded-xl border border-red-500/20"
        >
          {error}
        </motion.div>
      )}

      {details && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-3xl mt-10 space-y-6"
        >
          {/* Train Details Card */}
          <div className="bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            <div className="bg-slate-800/50 p-4 border-b border-white/5 flex items-center gap-3">
              <FontAwesomeIcon
                icon={faTrain}
                className="text-orange-500 text-xl"
              />
              <h3 className="text-lg font-semibold text-white">
                Journey Details
              </h3>
            </div>

            <div className="p-6 grid md:grid-cols-2 gap-8">
              <div className="text-center md:text-left">
                <div className="text-2xl font-bold text-orange-500">
                  {details.trainNumber}
                </div>
                <div className="text-white font-medium">
                  {details.trainName}
                </div>
                <div className="text-sm text-slate-400 mt-1">
                  {new Date(details.booking_date).toDateString()}
                </div>
              </div>

              <div className="flex items-center justify-center gap-4 bg-slate-800/30 p-4 rounded-xl">
                <div className="text-center">
                  <div className="text-xl font-bold text-white">
                    {details.from.name}
                  </div>
                  <div className="text-sm text-orange-400">
                    {details.from.time}
                  </div>
                </div>
                <FontAwesomeIcon
                  icon={faArrowRight}
                  className="text-slate-500"
                />
                <div className="text-center">
                  <div className="text-xl font-bold text-white">
                    {details.to.name}
                  </div>
                  <div className="text-sm text-orange-400">
                    {details.to.time}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/30 p-4 flex justify-around text-center border-t border-white/5">
              <div>
                <div className="text-xs text-slate-400 uppercase">Class</div>
                <div className="font-bold text-white">{details.class}</div>
              </div>
              <div>
                <div className="text-xs text-slate-400 uppercase">Coach</div>
                <div className="font-bold text-white">{details.coach}</div>
              </div>
              <div>
                <div className="text-xs text-slate-400 uppercase">Seat</div>
                <div className="font-bold text-white">{details.seat}</div>
              </div>
              <div>
                <div className="text-xs text-slate-400 uppercase">Status</div>
                <div
                  className={`font-bold ${
                    details.status === "Confirmed"
                      ? "text-green-500"
                      : "text-orange-500"
                  }`}
                >
                  {details.status}
                </div>
              </div>
            </div>
          </div>

          {/* Passenger & Contact Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Passenger Details */}
            <div className="bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-xl">
              <div className="bg-slate-800/50 p-4 border-b border-white/5 flex items-center gap-3">
                <FontAwesomeIcon icon={faUser} className="text-orange-500" />
                <h3 className="font-semibold text-white">Passenger</h3>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-slate-400">Name</span>
                  <span className="font-medium text-white">
                    {details.passenger.name}
                  </span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-slate-400">Age / Gender</span>
                  <span className="font-medium text-white">
                    {details.passenger.age} / {details.passenger.gender}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Berth Preference</span>
                  <span className="font-medium text-white">
                    {details.passenger.birth}
                  </span>
                </div>
              </div>
            </div>

            {/* Contact Details */}
            <div className="bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-xl">
              <div className="bg-slate-800/50 p-4 border-b border-white/5 flex items-center gap-3">
                <FontAwesomeIcon icon={faPhone} className="text-orange-500" />
                <h3 className="font-semibold text-white">Contact</h3>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-slate-400">Name</span>
                  <span className="font-medium text-white">
                    {details.contact.name}
                  </span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-slate-400">Phone</span>
                  <span className="font-medium text-white">
                    {details.contact.phoneno}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Email</span>
                  <span className="font-medium text-white truncate max-w-[150px]">
                    {details.contact.email}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default PnrStatus;
