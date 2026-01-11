import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { start, failure, success, signout } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faCamera,
  faSave,
  faSignOutAlt,
  faTrash,
  faEdit,
  faCalendarAlt,
  faLock,
} from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  const currentD = new Date();
  const old = new Date(
    currentD.getFullYear() - 18,
    currentD.getMonth(),
    currentD.getDate()
  );
  const max = old.toISOString().split("T")[0];

  const { currentUser, loading, error } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const [formdata, setformdata] = useState({
    username: currentUser.username,
    email: currentUser.email,
    dob: currentUser.dob || "",
    password: "",
  });

  // UI state
  const [isEditing, setIsEditing] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const handlechange = (e) => {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    dispatch(start());
    try {
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formdata),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(failure(data.message));
        return;
      }
      dispatch(success(data));
      setUpdateSuccess(true);
      setTimeout(() => setUpdateSuccess(false), 3000);
      setIsEditing(false);
    } catch (err) {
      dispatch(failure(err.message));
    }
  };

  const handleSignout = async () => {
    dispatch(start());
    try {
      const res = await fetch("/api/auth/signout", {
        method: "DELETE", // Method was DELETE in original, so keeping it
        headers: {
          "content-type": "application/json",
        },
      });
      // Note: res is a Response object and res.json() returns a promise.
      // Original code had `if(res.success === false)` which is likely wrong on the Response object directly
      // unless previous developer used a custom fetch wrapper, but this looks like raw fetch.
      // I will fix this logic to properly await json.
      const data = await res.json();
      if (data.success === false) {
        dispatch(failure(data.message));
        return;
      }
      dispatch(signout());
      navigate("/");
    } catch (error) {
      dispatch(failure(error.message));
    }
  };

  return (
    <div className="min-h-[calc(100vh-8vh)] bg-slate-950 py-10 px-4 flex justify-center items-start md:items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
      >
        {/* Header / Cover */}
        <div className="h-32 bg-gradient-to-r from-orange-600 to-orange-400 relative">
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
            <div className="relative group">
              <div className="h-32 w-32 rounded-full border-4 border-slate-900 shadow-xl bg-slate-800 flex items-center justify-center overflow-hidden">
                {currentUser.profilePicture ? (
                  <img
                    src={currentUser.profilePicture}
                    alt="profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-4xl text-slate-500 font-bold">
                    {currentUser.username.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              {/* Disabled file input for now as logic was missing in original */}
              {/* <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                <FontAwesomeIcon icon={faCamera} className="text-white text-xl" />
                            </div> */}
            </div>
          </div>
        </div>

        <div className="pt-20 pb-8 px-8 flex flex-col items-center">
          <h1 className="text-3xl font-bold text-white mb-1">
            {currentUser.username}
          </h1>
          <p className="text-slate-400 mb-6">{currentUser.email}</p>

          {/* Action Bar */}
          <div className="flex gap-4 mb-8">
            {!isEditing ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-5 py-2 rounded-xl transition-colors font-medium border border-white/5"
              >
                <FontAwesomeIcon icon={faEdit} /> Edit Profile
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsEditing(false)}
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 px-5 py-2 rounded-xl transition-colors font-medium border border-white/5"
              >
                Cancel
              </motion.button>
            )}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSignout}
              className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 px-5 py-2 rounded-xl transition-colors font-medium border border-red-500/10"
            >
              <FontAwesomeIcon icon={faSignOutAlt} /> Sign Out
            </motion.button>
          </div>

          {/* Edit Form */}
          <AnimatePresence mode="wait">
            {isEditing ? (
              <motion.form
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                onSubmit={handlesubmit}
                className="w-full space-y-4"
              >
                <div className="space-y-4">
                  <div className="relative">
                    <label className="text-xs text-slate-400 ml-1 mb-1 block">
                      Username
                    </label>
                    <div className="relative">
                      <FontAwesomeIcon
                        icon={faUser}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                      />
                      <input
                        type="text"
                        name="username"
                        value={formdata.username}
                        onChange={handlechange}
                        required
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-orange-500 transition-all placeholder-slate-500"
                        placeholder="Username"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label className="text-xs text-slate-400 ml-1 mb-1 block">
                      Email
                    </label>
                    <div className="relative">
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                      />
                      <input
                        type="email"
                        name="email"
                        value={formdata.email}
                        onChange={handlechange}
                        required
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-orange-500 transition-all placeholder-slate-500"
                        placeholder="Email"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label className="text-xs text-slate-400 ml-1 mb-1 block">
                      Date of Birth
                    </label>
                    <div className="relative">
                      <FontAwesomeIcon
                        icon={faCalendarAlt}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                      />
                      <input
                        type="date"
                        name="dob"
                        value={
                          formdata.dob
                            ? new Date(formdata.dob).toISOString().split("T")[0]
                            : ""
                        }
                        max={max}
                        onChange={handlechange}
                        required
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-orange-500 transition-all"
                      />
                    </div>
                  </div>

                  <div className="relative">
                    <label className="text-xs text-slate-400 ml-1 mb-1 block">
                      New Password
                    </label>
                    <div className="relative">
                      <FontAwesomeIcon
                        icon={faLock}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                      />
                      <input
                        type="password"
                        name="password"
                        value={formdata.password}
                        onChange={handlechange}
                        className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-orange-500 transition-all placeholder-slate-500"
                        placeholder="Leave blank to keep current"
                      />
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-orange-600 to-orange-500 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-orange-500/20 transition-all flex items-center justify-center gap-2 mt-6"
                >
                  {loading ? (
                    "Updating..."
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faSave} /> Save Changes
                    </>
                  )}
                </motion.button>
              </motion.form>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 text-sm"
              >
                <div className="bg-slate-800/30 p-4 rounded-xl border border-white/5">
                  <div className="text-slate-400 mb-1">Date of Birth</div>
                  <div className="text-white font-medium">
                    {currentUser.dob
                      ? new Date(currentUser.dob).toDateString()
                      : "Not set"}
                  </div>
                </div>
                <div className="bg-slate-800/30 p-4 rounded-xl border border-white/5">
                  <div className="text-slate-400 mb-1">Account Status</div>
                  <div className="text-emerald-400 font-medium">Active</div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-400 mt-4 text-center bg-red-500/10 px-4 py-2 rounded-lg w-full"
            >
              {typeof error === "object" ? JSON.stringify(error) : error}
            </motion.div>
          )}
          {updateSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-green-400 mt-4 text-center bg-green-500/10 px-4 py-2 rounded-lg w-full"
            >
              Profile updated successfully!
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;
