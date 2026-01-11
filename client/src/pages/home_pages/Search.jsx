import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setTrainsList } from "../../redux/slices/trainSlice";
import { useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRightLeft,
  faCalendarAlt,
  faMapMarkerAlt,
  faTrain,
} from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";

function Search() {
  const currentDate = new Date();
  const min = currentDate.toISOString().split("T")[0];

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [sourceSuggestions, setSourceSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [focusedSource, setFocusedSource] = useState(false);
  const [focusedDestination, setFocusedDestination] = useState(false);
  const [searchFormData, setSearchFormData] = useState({
    source: "",
    destination: "",
    date: min,
    classes: "SL",
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const onFocus = (type) => {
    setError("");
    if (type === "source") setFocusedSource(true);
    else setFocusedDestination(true);
  };
  const onBlur = (type) => {
    setTimeout(() => {
      if (type === "source") setFocusedSource(false);
      else setFocusedDestination(false);
    }, 500);
  };

  const handleOnChange = (e) => {
    setSearchFormData({ ...searchFormData, [e.target.name]: e.target.value });
  };

  const handleSumbit = async (e) => {
    setError("");
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(
        `/api/train/search?sourceStation=${source}&destinationStation=${destination}&date=${searchFormData.date}&trainClass=${searchFormData.classes}`,
        { method: "GET" }
      );
      const data = await res.json();
      if (data.success) {
        dispatch(
          setTrainsList({
            trains: data.trains,
            source,
            destination,
            date: searchFormData.date,
          })
        );
        navigate("/train-list", { state: { data } });
      } else {
        setError(data.message);
      }
      setLoading(false);
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  const fetchSuggestions = async (query, type) => {
    try {
      const response = await fetch(`/api/train/address-list?address=${query}`);
      const data = await response.json();
      if (Array.isArray(data)) {
        if (type === "source") setSourceSuggestions(data);
        else setDestinationSuggestions(data);
      } else {
        if (type === "source") setSourceSuggestions([]);
        else setDestinationSuggestions([]);
      }
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      if (type === "source") setSourceSuggestions([]);
      else setDestinationSuggestions([]);
    }
  };

  useEffect(() => {
    fetchSuggestions("", "source");
    fetchSuggestions("", "destination");
  }, []);

  return (
    <div className="min-h-[calc(100vh-50vh)] bg-slate-950 w-full py-10 flex flex-col items-center overflow-y-auto px-4">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-6xl rounded-[2rem] h-64 md:h-80 mx-auto shadow-2xl overflow-hidden flex items-center justify-center mb-[-6rem] z-0"
      >
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-500"
          style={{
            backgroundImage: `url('https://i.etsystatic.com/22260569/r/il/e1c601/3098488926/il_fullxfull.3098488926_7htx.jpg')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />
        <div className="relative text-center z-10 px-4 pb-10">
          <h1 className="text-white text-3xl md:text-5xl font-extrabold tracking-tight drop-shadow-lg">
            Find Your <span className="text-orange-500">Perfect Journey</span>
          </h1>
          <p className="text-slate-200 text-lg md:text-xl mt-2 font-medium">
            Seamless booking across the nation
          </p>
        </div>
      </motion.div>

      {/* Search Form Card */}
      <motion.form
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        onSubmit={(e) => handleSumbit(e)}
        className="w-full max-w-5xl bg-slate-900/80 backdrop-blur-xl border border-white/10 text-white p-6 md:p-10 rounded-3xl shadow-2xl flex flex-col items-center gap-8 z-10"
      >
        <div className="w-full grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] lg:grid-cols-[2fr_auto_2fr_1.5fr_1fr] gap-6 items-end">
          {/* Source Input */}
          <div className="relative group">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block pl-1">
              From
            </label>
            <div className="relative flex items-center">
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                className="absolute left-4 text-orange-500 text-lg"
              />
              <input
                type="text"
                value={source}
                name="source"
                onChange={(e) => {
                  setSource(e.target.value);
                  fetchSuggestions(e.target.value, "source");
                }}
                onFocus={() => onFocus("source")}
                onBlur={() => onBlur("source")}
                className="w-full bg-slate-800/50 border border-slate-700 text-white pl-12 pr-4 h-14 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all font-medium text-lg placeholder-slate-500"
                placeholder="Origin Station"
              />
            </div>
            {focusedSource && Object.keys(sourceSuggestions).length > 0 && (
              <ul className="absolute w-full max-h-60 overflow-auto bg-slate-800 border border-slate-700 text-slate-200 rounded-xl shadow-2xl mt-2 z-50 scroller">
                {sourceSuggestions.map((station) => (
                  <li
                    key={station._id}
                    className="p-3 hover:bg-orange-500/20 hover:text-orange-400 cursor-pointer transition-colors border-b border-white/5 last:border-0"
                    onMouseDown={() => {
                      setSource(station.name);
                      setSourceSuggestions([]);
                    }}
                  >
                    <div className="font-semibold">{station.name}</div>
                    <div className="text-xs text-slate-500">{station.code}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Swap Icon */}
          <motion.button
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            type="button"
            className="flex justify-center items-center w-10 h-10 rounded-full bg-slate-800 border border-slate-700 text-orange-500 hover:border-orange-500 transition-colors md:mb-2"
            onClick={() => {
              const temp = source;
              setSource(destination);
              setDestination(temp);
            }}
          >
            <FontAwesomeIcon icon={faRightLeft} />
          </motion.button>

          {/* Destination Input */}
          <div className="relative group">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block pl-1">
              To
            </label>
            <div className="relative flex items-center">
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                className="absolute left-4 text-orange-500 text-lg"
              />
              <input
                type="text"
                name="destination"
                value={destination}
                onFocus={() => onFocus("destination")}
                onBlur={() => onBlur("destination")}
                onChange={(e) => {
                  setDestination(e.target.value);
                  fetchSuggestions(e.target.value, "destination");
                }}
                className="w-full bg-slate-800/50 border border-slate-700 text-white pl-12 pr-4 h-14 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all font-medium text-lg placeholder-slate-500"
                placeholder="Destination Station"
              />
            </div>
            {focusedDestination &&
              Object.keys(destinationSuggestions).length > 0 && (
                <ul className="absolute w-full max-h-60 overflow-auto bg-slate-800 border border-slate-700 text-slate-200 rounded-xl shadow-2xl mt-2 z-50 scroller">
                  {destinationSuggestions.map((station) => (
                    <li
                      key={station._id}
                      className="p-3 hover:bg-orange-500/20 hover:text-orange-400 cursor-pointer transition-colors border-b border-white/5 last:border-0"
                      onMouseDown={() => {
                        setDestination(station.name);
                        setDestinationSuggestions([]);
                      }}
                    >
                      <div className="font-semibold">{station.name}</div>
                      <div className="text-xs text-slate-500">
                        {station.code}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
          </div>

          {/* Date Input */}
          <div className="relative">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block pl-1">
              Date
            </label>
            <div className="relative flex items-center">
              <FontAwesomeIcon
                icon={faCalendarAlt}
                className="absolute left-4 text-slate-400 text-lg z-10 pointer-events-none"
              />
              <input
                type="date"
                name="date"
                min={min}
                value={searchFormData.date}
                onChange={(e) => handleOnChange(e)}
                className="w-full bg-slate-800/50 border border-slate-700 text-white pl-12 pr-4 h-14 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all font-medium text-lg uppercase appearance-none"
              />
            </div>
          </div>

          {/* Class Select */}
          <div className="relative">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 block pl-1">
              Class
            </label>
            <div className="relative flex items-center">
              <FontAwesomeIcon
                icon={faTrain}
                className="absolute left-4 text-slate-400 text-lg z-10 pointer-events-none"
              />
              <select
                name="classes"
                value={searchFormData.classes}
                onChange={(e) => handleOnChange(e)}
                className="w-full bg-slate-800/50 border border-slate-700 text-white pl-12 pr-4 h-14 rounded-xl focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all font-medium text-lg appearance-none cursor-pointer"
              >
                <option className="bg-slate-900" value="SL">
                  Sleeper
                </option>
                <option className="bg-slate-900" value="AC2">
                  AC 2 Tier
                </option>
                <option className="bg-slate-900" value="AC3">
                  AC 3 Tier
                </option>
              </select>
            </div>
          </div>
        </div>

        {/* Search Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className={`w-full md:w-1/2 lg:w-1/3 py-4 text-xl font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-3 ${
            loading
              ? "bg-slate-700 cursor-not-allowed text-slate-400"
              : "bg-gradient-to-r from-orange-600 to-orange-500 text-white hover:shadow-orange-500/30"
          }`}
          disabled={loading}
        >
          {loading ? (
            "Searching..."
          ) : (
            <>
              SEARCH TRAINS <FontAwesomeIcon icon={faTrain} />
            </>
          )}
        </motion.button>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-400 bg-red-500/10 px-6 py-3 rounded-lg border border-red-500/20 font-medium"
          >
            {error}
          </motion.div>
        )}
      </motion.form>
    </div>
  );
}

export default Search;
