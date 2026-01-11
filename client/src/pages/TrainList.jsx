import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { setBooking } from "../redux/slices/trainSlice";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faBan,
  faSpinner,
  faTrain,
  faChair,
  faRupeeSign,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";

function TrainList() {
  const { currentTrainList, sourceName, destinationName, travelDate } =
    useSelector((state) => state.train);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const minDate = new Date();
  const maxDate = new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000);

  const [date, setDate] = useState(new Date(travelDate));
  const [trainsOnDate, setTrainsOnDate] = useState(currentTrainList);
  const [availableSeats, setAvailableSeats] = useState({});
  const [seatsLoading, setSeatsLoading] = useState({});
  const [price, setPrice] = useState({});
  const [selectedClass, setSelectedClass] = useState("");

  const weekNo = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };

  useEffect(() => {
    setAvailableSeats({});
    let list = [];
    currentTrainList.forEach((train) => {
      train.daysOfOperation.forEach((day) => {
        if (weekNo[day] === date.getDay()) {
          list.push(train);
        }
      });
    });
    setTrainsOnDate(list);
  }, [date, currentTrainList]);

  const handleAvailableSeats = async (
    trainId,
    travelDate,
    fromIndex,
    toIndex
  ) => {
    if (availableSeats[trainId]) return;

    setSeatsLoading((prev) => ({ ...prev, [trainId]: true }));
    try {
      const response = await fetch(
        `/api/train/available-seats?trainId=${trainId}&fromIndex=${fromIndex}&toIndex=${toIndex}&date=${travelDate}`
      );
      const data = await response.json();

      if (data.success) {
        setAvailableSeats((prev) => ({
          ...prev,
          [trainId]: data.availableSeats,
        }));
      } else {
        console.log("Error fetching seats:", data);
      }
    } catch (error) {
      console.error("Error fetching available seats:", error);
    }
    setSeatsLoading((prev) => ({ ...prev, [trainId]: false }));
  };

  function handlePrice(t, cls) {
    const price_per_km = t.coach_structure[cls].price_per_km;
    const distance = t.stations[1].distance - t.stations[0].distance;
    setPrice({ [t._id]: price_per_km * distance });
  }

  async function bookTrain(id) {
    if (!selectedClass || !price[id]) return;
    dispatch(
      setBooking({
        train: id,
        class: selectedClass,
        date: date.toISOString().split("T")[0],
        price,
      })
    );
    navigate("/booking");
  }

  const formatDate = (d) => {
    return d.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-[calc(100vh-60px)] w-full flex flex-col items-center pb-20 text-gray-100 font-sans selection:bg-orange-500 selection:text-white bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-black">
      {/* Header / Date Selection */}
      <div className="sticky top-0 z-50 w-full bg-slate-900/80 backdrop-blur-md border-b border-white/10 shadow-xl">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-600 rounded-lg shadow-lg shadow-orange-500/20">
                <FontAwesomeIcon
                  icon={faTrain}
                  className="text-xl text-white"
                />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white leading-tight tracking-wide">
                  {sourceName} <span className="text-orange-400 mx-1">→</span>{" "}
                  {destinationName}
                </h1>
                <p className="text-xs text-slate-400">
                  Select your preferred train
                </p>
              </div>
            </div>

            {/* Date Navigation */}
            <div className="flex items-center bg-slate-800/50 rounded-full p-1.5 border border-white/5 ring-1 ring-white/5 shadow-inner">
              <button
                disabled={
                  minDate.toISOString().split("T")[0] ===
                  date.toISOString().split("T")[0]
                }
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                  minDate.toISOString().split("T")[0] ===
                  date.toISOString().split("T")[0]
                    ? "text-slate-600 cursor-not-allowed"
                    : "text-orange-400 hover:bg-slate-700 hover:text-orange-300 hover:scale-105 active:scale-95"
                }`}
                onClick={() =>
                  setDate(new Date(date.getTime() - 24 * 60 * 60 * 1000))
                }
              >
                <FontAwesomeIcon icon={faArrowLeft} />
              </button>

              <div className="px-6 text-center min-w-[140px]">
                <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
                  Travel Date
                </div>
                <div className="text-sm font-bold text-white flex items-center justify-center gap-2 mt-0.5">
                  <FontAwesomeIcon
                    icon={faCalendarAlt}
                    className="text-orange-500 text-xs"
                  />
                  {formatDate(date)}
                </div>
              </div>

              <button
                disabled={
                  maxDate.toISOString().split("T")[0] ===
                  date.toISOString().split("T")[0]
                }
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                  maxDate.toISOString().split("T")[0] ===
                  date.toISOString().split("T")[0]
                    ? "text-slate-600 cursor-not-allowed"
                    : "text-orange-400 hover:bg-slate-700 hover:text-orange-300 hover:scale-105 active:scale-95"
                }`}
                onClick={() =>
                  setDate(new Date(date.getTime() + 24 * 60 * 60 * 1000))
                }
              >
                <FontAwesomeIcon icon={faArrowRight} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-5xl px-4 mt-8 flex-grow">
        {trainsOnDate.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 bg-slate-800/30 backdrop-blur-md rounded-2xl border border-white/5">
            <FontAwesomeIcon
              icon={faBan}
              className="text-6xl text-slate-700 mb-4"
            />
            <h2 className="text-xl font-semibold text-slate-300">
              No trains available
            </h2>
            <p className="text-slate-500">Try checking a different date</p>
          </div>
        ) : (
          <div className="space-y-6">
            {trainsOnDate.map((t) => (
              <div
                key={t._id}
                className="group relative bg-slate-800/40 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden hover:border-orange-500/30 hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-300"
              >
                {/* Train Info Header */}
                <div className="p-6 border-b border-white/5 bg-white/[0.02] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <div className="flex items-baseline gap-3">
                      <span className="text-2xl font-black text-white tracking-wide group-hover:text-orange-100 transition-colors">
                        {t.name}
                      </span>
                      <span className="px-2 py-0.5 rounded text-xs font-mono bg-slate-700/50 text-slate-300 border border-white/10">
                        #{t.number}
                      </span>
                    </div>
                    <div className="mt-2 flex gap-1 flex-wrap">
                      {Object.entries(weekNo).map(([dayShort, dayIdx]) => (
                        <span
                          key={dayShort}
                          className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full transition-colors ${
                            t.daysOfOperation.includes(dayShort)
                              ? "bg-orange-500/20 text-orange-300 border border-orange-500/30"
                              : "bg-slate-800/50 text-slate-600"
                          }`}
                        >
                          {dayShort.charAt(0)}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Journey Details */}
                <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                  {/* Route Visual - Left */}
                  <div className="md:col-span-8 flex items-center justify-between px-2 text-center md:text-left">
                    <div className="flex-1">
                      <div className="text-3xl font-light text-white">
                        {t.stations[0]?.departure || "N/A"}
                      </div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
                        {sourceName}
                      </div>
                    </div>

                    <div className="flex-1 mx-6 min-w-[120px] flex flex-col items-center relative">
                      {/* Route Timeline Line */}
                      <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-slate-600 to-transparent absolute top-1/2 -translate-y-1/2"></div>
                      {/* Dots */}
                      <div className="w-2.5 h-2.5 bg-orange-500 rounded-full shadow-[0_0_0_4px_rgba(249,115,22,0.2)] absolute left-[10%] top-1/2 -translate-y-1/2"></div>
                      <div className="w-2.5 h-2.5 bg-orange-500 rounded-full shadow-[0_0_0_4px_rgba(249,115,22,0.2)] absolute right-[10%] top-1/2 -translate-y-1/2"></div>

                      {/* Duration Badge */}
                      <div className="relative z-10 bg-slate-900 px-3 py-1 rounded-full border border-slate-700 text-[10px] text-slate-400 uppercase tracking-wider mb-6">
                        Direct
                      </div>

                      <FontAwesomeIcon
                        icon={faTrain}
                        className="text-slate-600 text-xs mt-6"
                      />
                    </div>

                    <div className="flex-1 text-right">
                      <div className="text-3xl font-light text-white">
                        {t.stations[1].arrival || "N/A"}
                      </div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
                        {destinationName}
                      </div>
                    </div>
                  </div>

                  {/* Load Seats Action */}
                  <div className="md:col-span-4 flex justify-center md:justify-end">
                    {!availableSeats[t._id] && !seatsLoading[t._id] && (
                      <button
                        onClick={() =>
                          handleAvailableSeats(
                            t._id,
                            date,
                            t.stations[0].number,
                            t.stations[1].number
                          )
                        }
                        className="px-6 py-2.5 rounded-xl bg-slate-700/30 hover:bg-orange-600/20 text-orange-400 text-sm font-semibold transition-all border border-slate-600/50 hover:border-orange-500/50 hover:shadow-lg hover:shadow-orange-500/10 active:scale-95"
                      >
                        Check Availability
                      </button>
                    )}
                    {seatsLoading[t._id] && (
                      <div className="flex items-center gap-2 text-orange-400 animate-pulse bg-slate-800/50 px-4 py-2 rounded-lg border border-slate-700/50">
                        <FontAwesomeIcon icon={faSpinner} spin />
                        <span className="text-sm font-medium">
                          Fetching seats...
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Seats Selection Container */}
                {availableSeats[t._id] && (
                  <div className="bg-slate-900/30 p-6 border-t border-white/5 animate-[slideDown_0.3s_ease-out]">
                    <div className="flex items-center gap-2 mb-4 text-slate-400 text-xs font-bold uppercase tracking-widest">
                      <FontAwesomeIcon icon={faChair} /> Select Class
                    </div>

                    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-track-slate-800 scrollbar-thumb-slate-600 hover:scrollbar-thumb-slate-500">
                      {Object.entries(availableSeats[t._id]).map(
                        ([cls, count]) => (
                          <div
                            key={cls}
                            onClick={() => {
                              setSelectedClass(cls);
                              handlePrice(t, cls);
                            }}
                            className={`relative min-w-[140px] p-4 rounded-xl cursor-pointer flex flex-col items-start gap-2 transition-all duration-200 border ${
                              selectedClass === cls && price[t._id]
                                ? "bg-orange-500/10 border-orange-500 shadow-[0_0_0_1px_#f97316]"
                                : "bg-slate-800/50 border-white/5 hover:bg-slate-800 hover:border-orange-400/30 hover:-translate-y-0.5"
                            }`}
                          >
                            <div className="flex justify-between w-full">
                              <span
                                className={`font-bold text-lg transition-colors ${
                                  selectedClass === cls
                                    ? "text-orange-400"
                                    : "text-white"
                                }`}
                              >
                                {cls}
                              </span>
                              {selectedClass === cls && (
                                <div className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.8)]"></div>
                              )}
                            </div>
                            <div
                              className={`text-sm font-medium ${
                                count > 0 ? "text-emerald-400" : "text-rose-400"
                              }`}
                            >
                              {count > 0 ? `${count} Seats` : "WL / Full"}
                            </div>
                            <div className="mt-2 text-[10px] text-slate-500 font-mono uppercase">
                              Tap to select
                            </div>
                          </div>
                        )
                      )}
                    </div>

                    {/* Booking Action Footer */}
                    {price[t._id] && selectedClass && (
                      <div className="mt-6 flex items-center justify-between pt-6 border-t border-white/10 animate-[fadeIn_0.3s_ease-in]">
                        <div>
                          <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                            Total Fare
                          </div>
                          <div className="text-3xl font-bold text-white flex items-center gap-0.5">
                            <FontAwesomeIcon
                              icon={faRupeeSign}
                              className="text-xl text-slate-400"
                            />
                            {price[t._id]}
                          </div>
                        </div>
                        <button
                          onClick={() => bookTrain(t._id)}
                          className="group relative overflow-hidden bg-gradient-to-br from-orange-600 to-orange-700 hover:from-orange-500 hover:to-orange-600 text-white font-bold px-8 py-3 rounded-xl shadow-lg shadow-orange-600/20 hover:shadow-orange-600/40 hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-2"
                        >
                          <span className="relative z-10">Book Ticket</span>
                          <FontAwesomeIcon
                            icon={faArrowRight}
                            className="relative z-10 group-hover:translate-x-1 transition-transform"
                          />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <style jsx global>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

export default TrainList;
