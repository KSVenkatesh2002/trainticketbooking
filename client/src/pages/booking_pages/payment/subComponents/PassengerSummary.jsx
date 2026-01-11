import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

const PassengerSummary = ({ passengerList, itemVariants }) => {
  return (
    <motion.div
      variants={itemVariants}
      className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-xl"
    >
      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
        <span className="bg-blue-600/20 text-blue-400 p-2.5 rounded-xl border border-blue-500/10">
          <FontAwesomeIcon icon={faUsers} />
        </span>
        Passengers
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {passengerList.map((passenger, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between bg-slate-800/40 p-4 rounded-2xl border border-white/5 hover:bg-slate-800/60 transition-all hover:scale-[1.02]"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-slate-300 font-bold border border-white/5 shadow-inner">
                {passenger.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="text-white font-medium text-lg">
                  {passenger.name}
                </div>
                <div className="text-xs text-slate-400 flex items-center gap-2">
                  <span>{passenger.age} yrs</span>
                  <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
                  <span>{passenger.gender}</span>
                </div>
              </div>
            </div>
            <div className="text-slate-500 text-xs font-mono bg-slate-900 px-3 py-1.5 rounded-lg border border-white/5">
              {passenger.birth}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default PassengerSummary;
