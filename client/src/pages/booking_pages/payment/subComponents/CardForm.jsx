import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

const CardForm = ({
  cardDetails,
  handleCardOnChange,
  makePayment,
  totalAmount,
}) => {
  return (
    <motion.div
      key="card"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="space-y-5"
    >
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-400 ml-1 uppercase tracking-wider">
          Card Holder Name
        </label>
        <input
          type="text"
          name="holderName"
          value={cardDetails.holderName}
          onChange={handleCardOnChange}
          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all shadow-sm"
          placeholder="JOHN DOE"
        />
      </div>
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-slate-400 ml-1 uppercase tracking-wider">
          Card Number
        </label>
        <div className="relative">
          <input
            type="text"
            name="cardNo"
            maxLength={19}
            placeholder="0000 0000 0000 0000"
            value={cardDetails.cardNo}
            onChange={handleCardOnChange}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all font-mono tracking-wide shadow-sm"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">
            <FontAwesomeIcon icon={faCreditCard} />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-400 ml-1 uppercase tracking-wider">
            Expiry
          </label>
          <input
            type="text"
            name="expiry"
            placeholder="MM/YY"
            value={cardDetails.expiry}
            onChange={handleCardOnChange}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all text-center font-mono shadow-sm"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-400 ml-1 uppercase tracking-wider">
            CVV
          </label>
          <input
            type="password"
            name="cvv"
            placeholder="123"
            maxLength="3"
            value={cardDetails.cvv}
            onChange={handleCardOnChange}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all text-center tracking-widest font-mono shadow-sm"
          />
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => makePayment("card")}
        className="w-full mt-6 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-orange-500/25 transition-all flex items-center justify-center gap-3 text-lg"
      >
        <span>Pay</span>
        <span className="font-mono bg-black/20 px-2 py-0.5 rounded text-base">
          ₹{totalAmount}
        </span>
      </motion.button>
    </motion.div>
  );
};

export default CardForm;
