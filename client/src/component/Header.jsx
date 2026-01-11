import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrainSubway } from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";

const profileLink =
  "https://th.bing.com/th/id/OIP.bJpr9jpclIkXQT-hkkb1KQHaHa?w=184&h=184&c=7&r=0&o=5&dpr=1.3&pid=1.7";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  const location = useLocation();
  const [authStyle, setAuthStyle] = useState(true);

  useEffect(() => {
    setAuthStyle(!location.pathname.includes("auth"));
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="sticky top-0 z-[100] w-full min-h-[60px] h-[8vh] flex items-center px-4 md:px-8 bg-slate-900/60 backdrop-blur-xl border-b border-white/5 shadow-lg"
    >
      <nav className="flex justify-between items-center w-full max-w-7xl mx-auto h-full">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="font-bold text-xl md:text-2xl flex items-center"
        >
          <Link to="/" className="flex items-center space-x-2 text-white group">
            <motion.div
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
            >
              <FontAwesomeIcon
                className="text-orange-500 group-hover:text-orange-400 transition-colors"
                icon={faTrainSubway}
              />
            </motion.div>
            <h2 className="tracking-tight">
              Ticket{" "}
              <span className="text-orange-500 bg-clip-text">Booking</span>
            </h2>
          </Link>
        </motion.div>

        <div className="flex items-center space-x-1 md:space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="relative px-3 py-2 text-sm md:text-lg font-medium text-slate-300 hover:text-white transition-colors"
            >
              {link.name}
              {isActive(link.path) && (
                <motion.div
                  layoutId="header-active"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-orange-500 rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </Link>
          ))}

          <AnimatePresence mode="wait">
            {!currentUser ? (
              authStyle && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <Link
                    to="/auth/signup"
                    className="bg-orange-600 hover:bg-orange-500 text-white px-4 py-1.5 rounded-full text-sm md:text-base transition-all shadow-lg shadow-orange-900/20"
                  >
                    Signup
                  </Link>
                </motion.div>
              )
            ) : (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Link
                  to="/profile"
                  className="block h-9 w-9 md:h-10 md:w-10 rounded-full ring-2 ring-orange-500/20 hover:ring-orange-500 transition-all overflow-hidden border-2 border-slate-800"
                >
                  <img
                    className="h-full w-full object-cover"
                    src={currentUser.photoURL || profileLink}
                    alt="profile"
                  />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>
    </motion.header>
  );
};

export default Header;
