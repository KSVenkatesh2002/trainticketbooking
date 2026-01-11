import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrainSubway } from "@fortawesome/free-solid-svg-icons";

const Loading = () => {
  return (
    <div className="flex flex-col h-screen w-full items-center justify-center bg-slate-950 z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0.5 }}
        animate={{ scale: 1.1, opacity: 1 }}
        transition={{
          repeat: Infinity,
          repeatType: "reverse",
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex items-center justify-center w-24 h-24 rounded-full bg-orange-500/10 border-2 border-orange-500/50 shadow-[0_0_30px_rgba(249,115,22,0.3)]"
      >
        <FontAwesomeIcon
          icon={faTrainSubway}
          className="text-4xl text-orange-500"
        />
      </motion.div>
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-6 text-xl font-light tracking-[0.2em] text-orange-400/80"
      >
        LOADING
      </motion.h2>
    </div>
  );
};

export default Loading;
