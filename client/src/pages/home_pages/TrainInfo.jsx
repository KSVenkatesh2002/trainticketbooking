import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faTrain,
  faClock,
  faMapMarkerAlt,
  faExclamationCircle,
  faRoute,
} from "@fortawesome/free-solid-svg-icons";

const TrainInfo = () => {
  const [query, setQuery] = useState("");
  const [trains, setTrains] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setError("");
    setLoading(true);
    setTrains([]);

    try {
      const res = await fetch(`/api/train/getTrainInfo?query=${query}`);
      const data = await res.json();

      if (!data.success) {
        setError(data.message || "No trains found");
        setTrains([]);
      } else {
        setTrains(data.result);
      }
    } catch (err) {
      setError("Failed to fetch train data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white py-12 px-4 md:px-8 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <span className="inline-block p-3 rounded-2xl bg-orange-500/10 text-orange-500 mb-4 border border-orange-500/20">
          <FontAwesomeIcon icon={faTrain} className="text-2xl" />
        </span>
        <h1 className="text-3xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400 mb-3">
          Search Train Information
        </h1>
        <p className="text-slate-400 max-w-lg mx-auto">
          Enter train name or number to get detailed route and schedule
          information.
        </p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        onSubmit={handleSearch}
        className="w-full max-w-2xl bg-slate-900/50 backdrop-blur-xl p-2 rounded-2xl border border-white/10 shadow-2xl flex flex-col md:flex-row gap-2"
      >
        <div className="relative flex-1">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
            <FontAwesomeIcon icon={faSearch} />
          </div>
          <input
            type="text"
            placeholder="Enter train name or number (e.g., 12626)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700/50 rounded-xl py-4 pl-12 pr-4 text-white placeholder-slate-600 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all shadow-inner"
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading}
          className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-orange-500/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto min-w-[120px]"
        >
          {loading ? (
            <span className="animate-pulse">Searching...</span>
          ) : (
            "Search"
          )}
        </motion.button>
      </motion.form>

      <div className="w-full max-w-4xl mt-12">
        <AnimatePresence mode="wait">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-center flex items-center justify-center gap-2"
            >
              <FontAwesomeIcon icon={faExclamationCircle} /> {error}
            </motion.div>
          )}

          {trains.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.1 }}
              className="space-y-6"
            >
              {trains.map((train, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-slate-900 border border-white/10 rounded-3xl overflow-hidden shadow-xl"
                >
                  {/* Header */}
                  <div className="bg-slate-800/50 p-6 border-b border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                        {train.train_name}
                        <span className="bg-slate-950 text-slate-400 text-sm py-1 px-3 rounded-lg border border-slate-800 font-mono">
                          {train.train_number}
                        </span>
                      </h2>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {train.daysOfOperation.map((day, i) => (
                          <span
                            key={i}
                            className="text-xs font-medium bg-slate-950 text-slate-400 px-2 py-1 rounded border border-slate-800"
                          >
                            {day}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {train.classes.map((cls, i) => (
                        <span
                          key={i}
                          className="bg-orange-500/10 text-orange-400 text-sm font-bold px-3 py-1.5 rounded-lg border border-orange-500/20"
                        >
                          {cls}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Stations */}
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                      <FontAwesomeIcon
                        icon={faRoute}
                        className="text-orange-500"
                      />
                      Route Information
                    </h3>

                    <div className="relative">
                      {/* Vertical line connecting stations */}
                      <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-slate-800 md:left-[23px]"></div>

                      <div className="space-y-6">
                        {train.stations.map((station, idx) => (
                          <div
                            key={idx}
                            className="relative flex items-start gap-4 group"
                          >
                            <div className="z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-slate-900 border-2 border-slate-700 group-hover:border-orange-500 transition-colors flex items-center justify-center shrink-0">
                              <div className="w-3 h-3 bg-slate-600 rounded-full group-hover:bg-orange-500 transition-colors"></div>
                            </div>

                            <div className="flex-1 bg-slate-950/50 p-4 rounded-xl border border-white/5 hover:bg-slate-800/50 hover:border-orange-500/30 transition-all">
                              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2 md:gap-4">
                                <h4 className="flex-1 text-lg font-bold text-white group-hover:text-orange-400 transition-colors">
                                  {station.name}
                                </h4>
                                <div className="grid grid-cols-9 flex-4 gap-4 text-sm font-mono shrink-0 w-full">
                                  <div className="col-span-4 flex flex-col items-center">
                                    <span className="text-xs text-slate-500 uppercase">
                                      Arr
                                    </span>
                                    <span className="text-emerald-400">
                                      {station.arrival || "--:--"}
                                    </span>
                                  </div>
                                  <div className="col-span-1 w-px bg-slate-800"></div>
                                  <div className="col-span-4 flex flex-col items-center">
                                    <span className="text-xs text-slate-500 uppercase">
                                      Dep
                                    </span>
                                    <span className="text-orange-400">
                                      {station.departure || "--:--"}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TrainInfo;
