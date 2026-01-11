import {
  setPassengerList,
  setContactDetails,
  setDisplayForm,
  setDisplayContactForm,
  setPnr,
} from "../../redux/slices/trainSlice";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faFloppyDisk,
  faSpinner,
  faTrash,
  faUserCheck,
  faUserEdit,
  faUserMinus,
  faUserPlus,
  faTrain,
  faCalendarAlt,
  faArrowRight,
  faBan,
  faChair,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Booking() {
  const {
    currentTrainList,
    bookingTrain,
    sourceName,
    destinationName,
    finalDate,
    selectedClass,
    passengerList,
    contactDetails,
    displayForm,
    displayContactForm,
    currentBookingPnr,
  } = useSelector((state) => state.train);

  const { currentUser } = useSelector((state) => state.user);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const t = currentTrainList.filter((train) => train._id === bookingTrain)[0];

  const handleBookTicket = async () => {
    setLoading(true);
    setError("");
    const body = {
      user_id: currentUser._id,
      train_id: bookingTrain,
      selectedClass,
      date: finalDate,
      seats_per_coach: t.coach_structure[selectedClass].seats_per_coach,
      from_station: {
        name: sourceName,
        no: t.stations[0].number,
      },
      to_station: {
        name: destinationName,
        no: t.stations[1].number,
      },
      contactDetails,
    };
    let data;
    const newPnrs = [];
    try {
      for (let passenger of passengerList) {
        try {
          const res = await fetch("/api/train/book-ticket", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify({ ...body, passenger }),
          });
          data = await res.json();
          if (data.success) {
            newPnrs.push(data.pnr);
          } else {
            setError(data.message);
          }
        } catch (e) {
          setError(e.message);
        }
      }

      if (newPnrs.length > 0) {
        dispatch(setPnr([...currentBookingPnr, ...newPnrs]));
      }

      if (data?.success) {
        navigate("/booking/payment");
      }
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[calc(100vh-60px)] w-full flex flex-col items-center pb-20 text-gray-100 font-sans selection:bg-orange-500 selection:text-white bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-800 via-slate-900 to-black p-4">
      {/* Train Summary Header */}
      <div className="w-full max-w-5xl mb-8 animate-[fadeIn_0.5s_ease-out]">
        <div className="bg-slate-800/40 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
          <div className="bg-white/[0.03] p-6 border-b border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-600 rounded-2xl shadow-lg shadow-orange-500/20">
                <FontAwesomeIcon
                  icon={faTrain}
                  className="text-2xl text-white"
                />
              </div>
              <div>
                <h1 className="text-3xl font-black text-white tracking-tight uppercase">
                  {t.name}
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-0.5 rounded text-xs font-mono bg-slate-700/50 text-slate-300 border border-white/10">
                    #{t.number}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-slate-600"></span>
                  <span className="text-sm font-semibold text-orange-400 uppercase tracking-widest">
                    {selectedClass}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-end text-right">
              <div className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mb-1">
                Travel Date
              </div>
              <div className="text-xl font-bold text-white flex items-center gap-2 bg-slate-900/50 px-4 py-2 rounded-xl border border-white/5">
                <FontAwesomeIcon
                  icon={faCalendarAlt}
                  className="text-orange-500"
                />
                {finalDate}
              </div>
            </div>
          </div>

          <div className="p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-gradient-to-br from-transparent to-white/[0.02]">
            <div className="md:col-span-12 flex items-center justify-between px-4 text-center md:text-left">
              <div className="flex-1">
                <div className="text-4xl font-light text-white tracking-tight">
                  {t.stations[0].departure}
                </div>
                <div className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mt-2">
                  {sourceName}
                </div>
              </div>

              <div className="flex-1 mx-8 flex flex-col items-center relative min-w-[150px]">
                <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-slate-600 to-transparent absolute top-1/2 -translate-y-1/2"></div>
                <div className="w-3 h-3 bg-orange-500 rounded-full shadow-[0_0_15px_rgba(249,115,22,0.5)] absolute left-[10%] top-1/2 -translate-y-1/2"></div>
                <div className="w-3 h-3 bg-orange-500 rounded-full shadow-[0_0_15px_rgba(249,115,22,0.5)] absolute right-[10%] top-1/2 -translate-y-1/2"></div>
                <FontAwesomeIcon
                  icon={faTrain}
                  className="text-slate-500 text-lg relative z-10 bg-slate-900 px-3 py-1 border border-slate-700 rounded-full mb-2"
                />
              </div>

              <div className="flex-1 text-right">
                <div className="text-4xl font-light text-white tracking-tight">
                  {t.stations[1].arrival}
                </div>
                <div className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mt-2">
                  {destinationName}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-8 items-start">
        {/* Passenger Section */}
        <div className="w-full lg:w-2/3 space-y-6">
          <div className="bg-slate-800/40 backdrop-blur-xl border border-white/5 rounded-3xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={faUserPlus}
                    className="text-orange-400 text-sm"
                  />
                </div>
                Passenger Details
              </h2>
              {!displayForm && passengerList.length > 0 && (
                <button
                  onClick={() => dispatch(setDisplayForm())}
                  className="text-sm font-bold text-orange-400 hover:text-orange-300 transition-colors uppercase tracking-widest flex items-center gap-2"
                >
                  <FontAwesomeIcon icon={faUserPlus} /> Add More
                </button>
              )}
            </div>

            {displayForm ? (
              <form
                className="space-y-6 animate-[slideDown_0.3s_ease-out]"
                onSubmit={(e) => {
                  e.preventDefault();
                  const passenger = {
                    name: e.target.name.value.toLowerCase(),
                    age: e.target.age.value,
                    gender: e.target.gender.value,
                    birth: e.target.birth.value,
                  };
                  dispatch(setPassengerList([...passengerList, passenger]));
                  e.target.reset();
                }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                      Passenger Name
                    </label>
                    <input
                      className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/25 transition-all"
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                      Age
                    </label>
                    <input
                      className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/25 transition-all"
                      type="number"
                      name="age"
                      min="1"
                      max="100"
                      placeholder="Years"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                      Gender
                    </label>
                    <select
                      className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/25 transition-all appearance-none cursor-pointer"
                      name="gender"
                      required
                    >
                      <option value="male" className="bg-slate-900">
                        Male
                      </option>
                      <option value="female" className="bg-slate-900">
                        Female
                      </option>
                      <option value="other" className="bg-slate-900">
                        Other
                      </option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">
                      Berth Preference
                    </label>
                    <select
                      className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/25 transition-all appearance-none cursor-pointer"
                      name="birth"
                      required
                    >
                      <option value="lower" className="bg-slate-900">
                        Lower
                      </option>
                      <option value="middle" className="bg-slate-900">
                        Middle
                      </option>
                      <option value="upper" className="bg-slate-900">
                        Upper
                      </option>
                      <option value="sideLower" className="bg-slate-900">
                        Side Lower
                      </option>
                      <option value="sideUpper" className="bg-slate-900">
                        Side Upper
                      </option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-4 pt-2">
                  <button
                    type="submit"
                    className="flex-1 flex items-center justify-center bg-orange-600 hover:bg-orange-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-orange-500/20 active:scale-[0.98]"
                  >
                    <FontAwesomeIcon className="mr-2" icon={faCheck} /> Add
                    Passenger
                  </button>
                  {passengerList.length > 0 && (
                    <button
                      type="button"
                      onClick={() => dispatch(setDisplayForm())}
                      className="px-6 bg-slate-700/50 hover:bg-slate-700 text-slate-300 font-bold py-3 rounded-xl transition-all border border-white/5 active:scale-[0.98]"
                    >
                      Done
                    </button>
                  )}
                </div>
              </form>
            ) : (
              <div className="space-y-4">
                {passengerList.length === 0 ? (
                  <div className="py-12 flex flex-col items-center justify-center text-slate-500 border-2 border-dashed border-white/5 rounded-2xl">
                    <FontAwesomeIcon
                      icon={faUserPlus}
                      className="text-4xl mb-4 opacity-20"
                    />
                    <p className="font-medium">No passengers added yet</p>
                    <button
                      onClick={() => dispatch(setDisplayForm())}
                      className="mt-4 text-orange-400 font-bold text-sm uppercase tracking-widest hover:text-orange-300 transform transition-all active:scale-95"
                    >
                      Add First Passenger
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-3">
                    {passengerList.map((passenger, index) => (
                      <div
                        key={index}
                        className="group flex items-center justify-between bg-slate-900/50 p-4 rounded-2xl border border-white/5 hover:border-orange-500/30 transition-all"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-400 font-bold text-sm">
                            {index + 1}
                          </div>
                          <div>
                            <div className="font-bold text-white uppercase text-sm tracking-wide">
                              {passenger.name}
                            </div>
                            <div className="text-xs text-slate-500 font-medium space-x-2">
                              <span>{passenger.age} Years</span>
                              <span className="opacity-30">|</span>
                              <span className="capitalize">
                                {passenger.gender}
                              </span>
                              <span className="opacity-30">|</span>
                              <span className="capitalize">
                                {passenger.birth} Berth
                              </span>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => {
                            const updatedList = passengerList.filter(
                              (_, i) => i !== index
                            );
                            dispatch(setPassengerList(updatedList));
                          }}
                          className="w-9 h-9 flex items-center justify-center rounded-lg bg-red-500/10 text-red-400 opacity-0 group-hover:opacity-100 transition-all hover:bg-red-500 hover:text-white"
                        >
                          <FontAwesomeIcon icon={faTrash} className="text-sm" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Contact Section */}
        <div className="w-full lg:w-1/3">
          <div className="bg-slate-800/40 backdrop-blur-xl border border-white/5 rounded-3xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <FontAwesomeIcon
                    icon={faUserEdit}
                    className="text-orange-400 text-sm"
                  />
                </div>
                Contact Details
              </h2>
              {!displayContactForm && (
                <button
                  onClick={() => dispatch(setDisplayContactForm())}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-orange-500/10 text-orange-400 hover:bg-orange-600 transition-all hover:text-white transform active:scale-95"
                >
                  <FontAwesomeIcon icon={faUserEdit} className="text-xs" />
                </button>
              )}
            </div>

            {displayContactForm ? (
              <form
                className="space-y-5 animate-[slideDown_0.3s_ease-out]"
                onSubmit={(e) => {
                  e.preventDefault();
                  dispatch(setDisplayContactForm());
                }}
              >
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">
                    Full Name
                  </label>
                  <input
                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500/50 transition-all"
                    type="text"
                    name="name"
                    value={contactDetails.name}
                    onChange={(e) =>
                      dispatch(
                        setContactDetails({
                          ...contactDetails,
                          [e.target.name]: e.target.value.toLowerCase(),
                        })
                      )
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">
                    Email Address
                  </label>
                  <input
                    className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500/50 transition-all"
                    type="Email"
                    name="email"
                    value={contactDetails.email}
                    onChange={(e) =>
                      dispatch(
                        setContactDetails({
                          ...contactDetails,
                          [e.target.name]: e.target.value,
                        })
                      )
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">
                    Phone Number
                  </label>
                  <div className="flex gap-2">
                    <div className="flex items-center justify-center w-14 bg-slate-900/50 border border-white/10 rounded-xl text-slate-400 font-bold text-sm">
                      +91
                    </div>
                    <input
                      className="flex-1 bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-orange-500/50 transition-all"
                      type="tel"
                      name="phoneno"
                      pattern="[0-9]{10}"
                      value={contactDetails.phoneno}
                      onChange={(e) =>
                        dispatch(
                          setContactDetails({
                            ...contactDetails,
                            [e.target.name]: e.target.value,
                          })
                        )
                      }
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg active:scale-[0.98]"
                >
                  <FontAwesomeIcon icon={faFloppyDisk} className="mr-2" /> Save
                  Details
                </button>
              </form>
            ) : (
              <div className="space-y-4">
                <div className="bg-slate-900/50 p-5 rounded-2xl border border-white/5 space-y-4 shadow-inner">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">
                      Name
                    </span>
                    <span className="font-bold text-white uppercase tracking-wide">
                      {contactDetails.name}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">
                      Email
                    </span>
                    <span className="font-medium text-slate-300">
                      {contactDetails.email}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">
                      Phone
                    </span>
                    <span className="font-bold text-white tracking-widest">
                      +91 {contactDetails.phoneno}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* error message */}
          {error && (
            <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-sm font-medium flex items-center gap-3 animate-[shake_0.5s_ease-in-out]">
              <FontAwesomeIcon icon={faBan} />
              {error}
            </div>
          )}
        </div>
      </div>

      {/* Sticky Bottom Payment Action */}
      <div className="mt-12 w-full max-w-5xl animate-[fadeIn_0.5s_ease-in]">
        <div className="flex flex-col items-center gap-6">
          {passengerList.length > 0 &&
          contactDetails.phoneno &&
          !displayContactForm &&
          !displayForm ? (
            <button
              onClick={handleBookTicket}
              disabled={loading}
              className={`group relative overflow-hidden px-12 py-4 rounded-2xl font-black text-xl tracking-widest uppercase transition-all duration-300 flex items-center gap-4 ${
                loading
                  ? "bg-slate-700 text-slate-500 cursor-not-allowed opacity-50"
                  : "bg-gradient-to-br from-orange-500 to-orange-700 hover:from-orange-400 hover:to-orange-600 text-white shadow-[0_10px_30px_rgba(249,115,22,0.3)] hover:shadow-[0_15px_40px_rgba(249,115,22,0.5)] hover:-translate-y-1 active:scale-95"
              }`}
            >
              {loading ? (
                <>
                  <span>Processing</span>
                  <FontAwesomeIcon className="animate-spin" icon={faSpinner} />
                </>
              ) : (
                <>
                  <span>Proceed to Payment</span>
                  <FontAwesomeIcon
                    icon={faArrowRight}
                    className="group-hover:translate-x-2 transition-transform"
                  />
                </>
              )}
            </button>
          ) : (
            <div className="text-slate-500 text-sm font-bold uppercase tracking-widest flex items-center gap-3 opacity-50 py-4">
              <FontAwesomeIcon icon={faCheck} className="text-orange-500" />
              Complete all details to proceed
            </div>
          )}
        </div>
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
        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-5px);
          }
          75% {
            transform: translateX(5px);
          }
        }
      `}</style>
    </div>
  );
}
