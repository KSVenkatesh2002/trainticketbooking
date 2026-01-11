import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrain,
  faCalendarAlt,
  faMoneyBillWave,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

const TripSummary = ({ t, itemVariants }) => {
  const {
    bookingTrain,
    sourceName,
    destinationName,
    finalDate,
    selectedClass,
    price,
    passengerList,
    contactDetails,
  } = useSelector((state) => state.train);
  return (
    <motion.div
      variants={itemVariants}
      className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
        <FontAwesomeIcon icon={faTrain} className="text-9xl text-white" />
      </div>
      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
        <span className="bg-orange-600/20 text-orange-500 p-2.5 rounded-xl border border-orange-500/10">
          <FontAwesomeIcon icon={faTrain} />
        </span>
        Trip Summary
      </h2>

      <div className="bg-slate-950/50 rounded-2xl p-6 border border-white/5 relative overflow-hidden group">
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-orange-500 to-orange-600"></div>

        <div className="flex flex-col sm:flex-row justify-between items-start mb-8 gap-4">
          <div>
            <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">
              {t.name}
            </h3>
            <div className="flex items-center gap-3">
              <p className="text-slate-400 font-mono text-xs bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
                {t.number}
              </p>
              <span className="text-slate-600">|</span>
              <div className="text-orange-400 font-semibold text-sm bg-orange-500/10 px-3 py-1 rounded-lg border border-orange-500/20">
                {selectedClass} Class
              </div>
            </div>
          </div>
          <div className="text-slate-300 flex items-center gap-2 bg-slate-900/80 px-4 py-2 rounded-xl border border-white/5">
            <FontAwesomeIcon
              icon={faCalendarAlt}
              className="text-orange-500/70"
            />
            <span className="font-medium">{finalDate}</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center relative gap-6 sm:gap-0">
          {/* Visual Line for Desktop */}
          <div className="hidden sm:block absolute top-1/2 left-0 w-full border-t-2 border-dashed border-slate-800 -z-10"></div>

          <div className="w-full sm:w-auto bg-slate-900 px-5 py-3 rounded-xl border border-white/5 text-center min-w-[120px] z-10 shadow-lg relative">
            <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-orange-500 rounded-full border-2 border-slate-900"></div>
            <div className="text-2xl font-bold text-white mb-1">
              {t.stations?.[0]?.departure}
            </div>
            <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">
              {sourceName}
            </div>
          </div>

          <div className="z-10 bg-slate-900/90 p-3 rounded-full border-2 border-slate-800 text-slate-500 shadow-xl backdrop-blur-sm">
            <FontAwesomeIcon icon={faTrain} className="text-lg" />
          </div>

          <div className="w-full sm:w-auto bg-slate-900 px-5 py-3 rounded-xl border border-white/5 text-center min-w-[120px] z-10 shadow-lg relative">
            <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-orange-500 rounded-full border-2 border-slate-900"></div>
            <div className="text-2xl font-bold text-white mb-1">
              {t.stations?.[1]?.arrival}
            </div>
            <div className="text-xs text-slate-400 font-medium uppercase tracking-wider">
              {destinationName}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-slate-800/30 p-5 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
          <h4 className="text-slate-500 text-xs mb-4 font-bold uppercase tracking-widest flex items-center gap-2">
            <FontAwesomeIcon icon={faMoneyBillWave} /> Fare Breakdown
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between text-slate-400 text-sm">
              <span>Base Fare x {passengerList.length}</span>
              <span className="font-mono text-slate-200">
                ₹ {price[bookingTrain]}
              </span>
            </div>
            <div className="w-full h-px bg-white/5"></div>
            <div className="flex justify-between items-center">
              <span className="text-slate-300 font-medium">Total Amount</span>
              <span className="text-orange-400 font-bold text-xl font-mono">
                ₹ {price[bookingTrain] * passengerList.length}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/30 p-5 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
          <h4 className="text-slate-500 text-xs mb-4 font-bold uppercase tracking-widest flex items-center gap-2">
            <FontAwesomeIcon icon={faUsers} /> Contact Details
          </h4>
          <div className="space-y-3">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 shrink-0">
                <span className="text-lg font-bold">
                  {contactDetails.name.charAt(0)}
                </span>
              </div>
              <div className="min-w-0">
                <div className="text-white font-medium truncate">
                  {contactDetails.name}
                </div>
                <div className="text-xs text-slate-500 truncate">
                  {contactDetails.email}
                </div>
                <div className="text-xs text-slate-500 font-mono mt-0.5">
                  {contactDetails.phoneno}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TripSummary;
