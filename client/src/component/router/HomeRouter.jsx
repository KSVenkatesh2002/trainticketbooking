import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardList,
  faSearch,
  faTrain,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { motion, AnimatePresence } from "framer-motion";

function Home() {
  const location = useLocation();
  const [nav, setNav] = useState("");
  const route = location.pathname.split("/").pop() || "search";

  useEffect(() => {
    setNav(route);
  }, [route]);

  const navItems = [
    { id: "search", label: "Search", icon: faSearch, path: "/search" },
    {
      id: "pnr-status",
      label: "PNR",
      icon: faInfoCircle,
      path: "/pnr-status",
    },
    {
      id: "train-info",
      label: "Info",
      icon: faTrain,
      path: "/train-info",
    },
    {
      id: "my-booking",
      label: "Bookings",
      icon: faClipboardList,
      path: "/my-booking",
    },
  ];

  return (
    <div className="relative flex flex-col items-center w-full min-h-[calc(100vh-8vh)] bg-slate-950 text-slate-100 overflow-hidden">
      {/* Sticky Navigation Bar */}
      {/* Sticky Navigation Bar */}
      <nav className="fixed top-[60px] z-40 w-full md:w-fit md:mx-auto md:mt-4 transition-all duration-300">
        <div className="w-full md:min-w-[500px] px-2 py-2 bg-slate-900/60 backdrop-blur-xl border-b md:border border-white/10 shadow-2xl md:rounded-full">
          <div className="flex justify-around items-center relative gap-1">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className="relative group flex-1 flex flex-col items-center justify-center py-2 px-4 rounded-xl transition-all duration-300"
              >
                {/* Animated Background for Active State */}
                {nav === item.id && (
                  <motion.div
                    layoutId="nav-bg"
                    className="absolute inset-0 bg-orange-500/10 rounded-full border border-orange-500/20"
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}

                <div className="relative flex flex-col items-center gap-1 z-10">
                  <FontAwesomeIcon
                    icon={item.icon}
                    className={`text-lg md:text-xl transition-colors duration-300 ${
                      nav === item.id
                        ? "text-orange-500"
                        : "text-slate-400 group-hover:text-slate-200"
                    }`}
                  />
                  <span
                    className={`text-[10px] md:text-xs font-bold tracking-wider uppercase transition-colors duration-300 ${
                      nav === item.id
                        ? "text-orange-500"
                        : "text-slate-400 group-hover:text-slate-200"
                    }`}
                  >
                    {item.label}
                  </span>
                </div>

                {/* Active Underline - Desktop Only/Modified for Pill */}
                {nav === item.id && (
                  <motion.div
                    layoutId="active-dot"
                    className="absolute -bottom-1 w-1 h-1 rounded-full bg-orange-500"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content Area with Page Transitions */}
      <main className="w-full flex-grow relative mt-[8vh]">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="w-full h-full mx-auto"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default Home;
