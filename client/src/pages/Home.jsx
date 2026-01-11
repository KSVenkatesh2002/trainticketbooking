import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrainSubway } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  return (
    <div className="flex flex-col min-h-[calc(100vh-8vh)] w-full bg-slate-950 text-slate-100 overflow-hidden relative">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-600/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-blue-600/10 rounded-full blur-[100px]" />
      </div>

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-1 text-center px-4 md:px-6 mt-10 md:mt-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-7xl font-extrabold mb-6 tracking-tight">
            Book Your{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              Train Ticket
            </span>{" "}
            <br className="hidden md:block" /> in Seconds!
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-2xl text-slate-400 mb-10 max-w-2xl"
        >
          Experience the fastest, smoothest, and most premium way to find your
          perfect journey.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link to="/search">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-orange-600 to-orange-500 text-white font-bold py-4 px-10 rounded-full shadow-[0_4px_20px_rgba(234,88,12,0.4)] hover:shadow-[0_4px_30px_rgba(234,88,12,0.6)] transition-all"
            >
              Search Trains
            </motion.div>
          </Link>
        </motion.div>

        {/* Moving Train Animation */}
        <div className="absolute bottom-20 w-full overflow-hidden pointer-events-none opacity-20">
          <motion.div
            animate={{ x: ["-10vw", "110vw"] }}
            transition={{ repeat: Infinity, duration: 12, ease: "linear" }}
            className="flex items-center text-slate-600"
          >
            <FontAwesomeIcon icon={faTrainSubway} className="text-9xl" />
            <div className="h-2 w-96 bg-gradient-to-l from-transparent to-slate-600 ml-4 rounded-full blur-sm" />
          </motion.div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="relative z-10 bg-slate-900/50 backdrop-blur-md border-t border-white/5 py-8 text-center mt-auto">
        <p className="text-slate-500 mb-4">
          Made with <span className="text-red-500">❤️</span> by VENKATESH
        </p>
        <div className="flex justify-center gap-8">
          <a
            href="https://github.com/KSVenkatesh2002"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <FaGithub className="text-2xl text-slate-400 group-hover:text-white transition-colors duration-300" />
          </a>
          <a
            href="https://linkedin.com/in/venkatesh-k-s"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
          >
            <FaLinkedin className="text-2xl text-slate-400 group-hover:text-blue-400 transition-colors duration-300" />
          </a>
          <a href="mailto:kotavenkatesh2002@gmail.com" className="group">
            <FaEnvelope className="text-2xl text-slate-400 group-hover:text-orange-400 transition-colors duration-300" />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Home;
