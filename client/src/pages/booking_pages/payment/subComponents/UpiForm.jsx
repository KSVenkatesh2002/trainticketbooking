import React from "react";
import { motion } from "framer-motion";

const UpiForm = ({
  UPI,
  setUPI,
  upiId,
  setupiID,
  makePayment,
  totalAmount,
}) => {
  return (
    <motion.div
      key="upi"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <p className="text-sm text-slate-400 text-center font-medium bg-slate-800/50 py-2 rounded-lg border border-white/5">
        Select a verified UPI app
      </p>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => setUPI("g")}
          className={`p-6 rounded-2xl border flex flex-col items-center justify-center gap-3 transition-all group ${
            UPI === "g"
              ? "bg-slate-800 border-orange-500 shadow-[0_0_20px_-5px_rgba(249,115,22,0.3)] ring-1 ring-orange-500/50"
              : "bg-slate-950 border-slate-800 hover:border-slate-600 hover:bg-slate-900"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 48 48"
            className={`h-10 w-10 transition-transform ${
              UPI === "g" ? "scale-110" : "group-hover:scale-110"
            }`}
          >
            <path
              fill="#e64a19"
              d="M42.858,11.975c-4.546-2.624-10.359-1.065-12.985,3.481L23.25,26.927 c-1.916,3.312,0.551,4.47,3.301,6.119l6.372,3.678c2.158,1.245,4.914,0.506,6.158-1.649l6.807-11.789 C48.176,19.325,46.819,14.262,42.858,11.975z"
            />
            <path
              fill="#fbc02d"
              d="M35.365,16.723l-6.372-3.678c-3.517-1.953-5.509-2.082-6.954,0.214l-9.398,16.275 c-2.624,4.543-1.062,10.353,3.481,12.971c3.961,2.287,9.024,0.93,11.311-3.031l9.578-16.59 C38.261,20.727,37.523,17.968,35.365,16.723z"
            />
            <path
              fill="#43a047"
              d="M36.591,8.356l-4.476-2.585c-4.95-2.857-11.28-1.163-14.137,3.787L9.457,24.317 c-1.259,2.177-0.511,4.964,1.666,6.22l5.012,2.894c2.475,1.43,5.639,0.582,7.069-1.894l9.735-16.86 c2.017-3.492,6.481-4.689,9.974-2.672L36.591,8.356z"
            />
            <path
              fill="#1e88e5"
              d="M19.189,13.781l-4.838-2.787c-2.158-1.242-4.914-0.506-6.158,1.646l-5.804,10.03 c-2.857,4.936-1.163,11.252,3.787,14.101l3.683,2.121l4.467,2.573l1.939,1.115c-3.442-2.304-4.535-6.92-2.43-10.555l1.503-2.596 l5.504-9.51 C22.083,17.774,21.344,15.023,19.189,13.781z"
            />
          </svg>
          <span
            className={`text-xs font-bold ${
              UPI === "g" ? "text-white" : "text-slate-400"
            }`}
          >
            Google Pay
          </span>
        </button>

        <button
          onClick={() => setUPI("a")}
          className={`p-6 rounded-2xl border flex flex-col items-center justify-center gap-3 transition-all group ${
            UPI === "a"
              ? "bg-slate-800 border-orange-500 shadow-[0_0_20px_-5px_rgba(249,115,22,0.3)] ring-1 ring-orange-500/50"
              : "bg-slate-950 border-slate-800 hover:border-slate-600 hover:bg-slate-900"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            className={`h-10 w-10 transition-transform ${
              UPI === "a" ? "scale-110" : "group-hover:scale-110"
            }`}
          >
            <path
              fill="#ffffff"
              d="M8.871,8 L8.662,8.035 C8.008,8.117 7.378,8.362 6.854,8.758 C6.737,8.828 6.632,8.922 6.516,9.016 C6.504,8.993 6.492,8.968 6.492,8.945 C6.468,8.816 6.457,8.678 6.434,8.549 C6.399,8.339 6.282,8.232 6.072,8.232 L5.523,8.232 C5.185,8.232 5.127,8.304 5.127,8.631 L5.127,18.756 C5.139,18.908 5.231,18.988 5.359,19 L6.375,19 C6.515,19 6.596,18.908 6.607,18.756 C6.619,18.709 6.619,18.662 6.619,18.615 L6.619,15.098 C6.666,15.145 6.702,15.168 6.725,15.191 C7.577,15.903 8.557,16.136 9.631,15.926 C10.611,15.728 11.287,15.133 11.719,14.258 C12.057,13.593 12.195,12.917 12.207,12.182 C12.230,11.377 12.160,10.602 11.822,9.844 C11.425,8.911 10.749,8.292 9.734,8.082 C9.582,8.047 9.420,8.035 9.268,8.012 C9.128,8.000 8.999,8 8.871,8 Z M16.643,8 C16.596,8.012 16.551,8.023 16.504,8.023 C16.037,8.046 15.581,8.105 15.127,8.221 C14.835,8.291 14.555,8.395 14.275,8.488 C14.100,8.546 14.018,8.675 14.018,8.861 C14.030,9.013 14.018,9.176 14.018,9.328 C14.030,9.561 14.124,9.622 14.346,9.563 C14.719,9.470 15.092,9.365 15.465,9.295 C16.048,9.190 16.643,9.143 17.238,9.225 C17.553,9.283 17.845,9.365 18.043,9.633 C18.218,9.855 18.289,10.134 18.301,10.414 C18.313,10.811 18.313,11.125 18.313,11.521 C18.313,11.544 18.313,11.567 18.301,11.578 L18.242,11.578 C17.740,11.450 17.228,11.381 16.715,11.346 C16.178,11.323 15.642,11.346 15.129,11.533 C14.511,11.743 14.008,12.116 13.717,12.723 C13.495,13.190 13.459,13.681 13.529,14.182 C13.634,14.859 13.962,15.371 14.557,15.697 C15.129,16.012 15.735,16.046 16.365,15.953 C17.088,15.848 17.729,15.545 18.289,15.078 C18.312,15.055 18.336,15.044 18.359,15.021 C18.394,15.208 18.418,15.384 18.453,15.547 C18.476,15.699 18.571,15.791 18.711,15.803 L19.492,15.803 C19.609,15.803 19.715,15.698 19.715,15.570 C19.727,15.535 19.727,15.487 19.727,15.441 L19.727,10.463 C19.724,10.264 19.711,10.053 19.676,9.855 C19.583,9.237 19.326,8.723 18.766,8.396 C18.451,8.209 18.102,8.117 17.729,8.059 C17.554,8.035 17.390,8.023 17.215,8 L16.643,8 Z M20.688,8.002 C20.571,8.002 20.512,8.106 20.535,8.223 C20.558,8.317 20.594,8.423 20.629,8.516 C21.562,10.826 22.506,13.134 23.451,15.455 C23.533,15.653 23.544,15.818 23.451,16.016 C23.300,16.365 23.171,16.726 23.008,17.076 C22.868,17.391 22.635,17.626 22.285,17.719 C22.052,17.778 21.796,17.801 21.551,17.766 C21.434,17.754 21.316,17.731 21.199,17.719 C21.035,17.707 20.955,17.776 20.943,17.951 L20.943,18.420 C20.955,18.689 21.037,18.805 21.305,18.852 C21.562,18.898 21.829,18.931 22.109,18.943 C22.925,18.954 23.568,18.630 23.988,17.918 C24.163,17.638 24.304,17.346 24.432,17.043 C25.563,14.185 26.683,11.339 27.803,8.469 C27.838,8.387 27.859,8.304 27.871,8.211 C27.894,8.071 27.824,8.002 27.697,8.004 L26.754,8.004 C26.591,7.992 26.439,8.096 26.381,8.248 C26.358,8.318 26.334,8.375 26.311,8.445 L24.643,13.217 C24.526,13.555 24.396,13.904 24.279,14.277 C24.255,14.218 24.244,14.195 24.232,14.160 C23.614,12.457 23.009,10.756 22.391,9.053 C22.298,8.773 22.193,8.502 22.088,8.234 C22.042,8.105 21.935,8.014 21.783,8.014 C21.421,8.002 21.061,8.002 20.688,8.002 Z"
            ></path>
          </svg>
          <span
            className={`text-xs font-bold ${
              UPI === "a" ? "text-white" : "text-slate-400"
            }`}
          >
            Amazon Pay
          </span>
        </button>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-slate-700"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-slate-900 px-3 text-slate-500 font-medium">
            Or enter UPI ID
          </span>
        </div>
      </div>

      <div className="space-y-2">
        <input
          type="text"
          name="upiID"
          value={upiId}
          onChange={(e) => setupiID(e.target.value)}
          className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3.5 text-white placeholder-slate-600 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all font-mono shadow-sm"
          placeholder="username@bank"
        />
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={(e) => {
          e.preventDefault();
          makePayment("upi");
        }}
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

export default UpiForm;
