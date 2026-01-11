import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { start, failure, success } from "../../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../../component/OAuth";
import { motion } from "framer-motion";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formdata, setformdata] = useState({});
  const { loading, error } = useSelector((state) => state.user);

  const handleChange = (e) => {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(start());

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(formdata),
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(failure(data.message));
        return;
      }
      navigate("/");
      dispatch(success(data.other));
    } catch (err) {
      dispatch(failure(err.message));
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="text-3xl font-bold mb-8 text-white text-center">
        Welcome Back
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col w-full gap-4">
        <div className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 placeholder-slate-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
            onChange={handleChange}
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="mt-4 w-full bg-gradient-to-r from-orange-600 to-orange-500 text-white font-bold py-3 px-4 rounded-xl shadow-lg hover:shadow-orange-500/20 transition-all"
          disabled={loading}
        >
          {loading ? "Logging In..." : "Login"}
        </motion.button>
      </form>

      {error && (
        <span className="text-red-400 mt-4 text-sm text-center bg-red-500/10 py-2 px-4 rounded-lg w-full">
          {error}
        </span>
      )}

      <div className="w-full my-6 flex items-center gap-4">
        <div className="h-px bg-slate-700 flex-1" />
        <span className="text-slate-500 text-sm">OR</span>
        <div className="h-px bg-slate-700 flex-1" />
      </div>

      <OAuth />

      <div className="mt-6 text-slate-400 text-sm">
        Don't have an account?{" "}
        <Link
          to="/auth/signup"
          className="text-orange-500 hover:text-orange-400 font-semibold hover:underline"
        >
          Create one
        </Link>
      </div>
    </div>
  );
};

export default Login;
