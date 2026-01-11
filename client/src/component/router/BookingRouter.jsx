import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const BookingRouter = () => {
  const location = useLocation();
  const position = location.pathname.split("/").pop();
  const isPayment = position === "payment";

  return (
    <div className="w-full min-h-[calc(100vh-8vh)] flex flex-col items-center bg-slate-950">
      {/* Progress Navigation */}
      <div className="w-full max-w-2xl py-8 px-4">
        <div className="relative flex justify-between items-center z-10">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-800 -z-10 rounded-full" />
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: isPayment ? "100%" : "0%" }}
            transition={{ duration: 0.5, type: "spring" }}
            className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-orange-600 to-orange-400 -z-10 rounded-full"
          />

          {/* Step 1 */}
          <div className="flex flex-col items-center gap-2 bg-slate-950 px-2">
            <motion.div
              animate={{
                scale: isPayment ? 1 : 1.1,
                backgroundColor: isPayment ? "#1e293b" : "#f97316",
                borderColor: isPayment ? "#f97316" : "#f97316",
              }}
              className={`w-12 h-12 rounded-full flex items-center justify-center border-2 font-bold text-lg shadow-lg ${
                isPayment ? "text-orange-500" : "text-white"
              }`}
            >
              1
            </motion.div>
            <span
              className={`text-sm font-medium ${
                !isPayment ? "text-orange-500" : "text-slate-400"
              }`}
            >
              Passenger Details
            </span>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center gap-2 bg-slate-950 px-2">
            <motion.div
              animate={{
                scale: isPayment ? 1.1 : 1,
                backgroundColor: isPayment ? "#f97316" : "#1e293b",
                borderColor: isPayment ? "#f97316" : "#334155",
              }}
              className={`w-12 h-12 rounded-full flex items-center justify-center border-2 font-bold text-lg shadow-lg ${
                isPayment ? "text-white" : "text-slate-500"
              }`}
            >
              2
            </motion.div>
            <span
              className={`text-sm font-medium ${
                isPayment ? "text-orange-500" : "text-slate-400"
              }`}
            >
              Payment
            </span>
          </div>
        </div>
      </div>

      {/* Render Nested Routes */}
      <div className="w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default BookingRouter;
