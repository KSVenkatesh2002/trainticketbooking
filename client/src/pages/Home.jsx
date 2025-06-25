import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div className="flex flex-col h-[calc(100vh-16vh)] w-full bg-gray-900 text-white">
            {/* Hero Section */}
            <div className="relative flex flex-col items-center justify-center flex-1 text-center px-6">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">
                    Book Your Train Ticket in Seconds! 🚆
                </h1>
                <p className="text-lg md:text-xl text-gray-300 mb-6">
                    Find your perfect train journey with ease.
                </p>
                <Link to="/search">
                    <div className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition duration-300">
                        Search Trains
                    </div></Link>

                {/* Moving Train Animation */}
                <div className="absolute bottom-10 w-full flex justify-center overflow-hidden">
                    <motion.img
                        src="https://img.icons8.com/ios-filled/100/train.png" // Train icon
                        alt="Moving Train"
                        className="w-20 md:w-32"
                        animate={{ x: ["-100vw", "100vw"] }} // Moves from left to right
                        transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
                    />
                </div>
            </div>

            {/* Footer Section */}
            <footer className="bg-gray-800 py-6 text-center mt-auto">
                <p className="text-gray-400">Made with ❤️ by    VENKATESH</p>
                <div className="flex justify-center gap-6 mt-3">
                    <a href="https://github.com/KSVenkatesh2002" target="_blank" rel="noopener noreferrer">
                        <FaGithub className="text-2xl hover:text-orange-400 transition" />
                    </a>
                    <a href="https://linkedin.com/in/venkatesh-k-s" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin className="text-2xl hover:text-orange-400 transition" />
                    </a>
                    <a href="mailto:kotavenkatesh2002@gmail.com">
                        <FaEnvelope className="text-2xl hover:text-orange-400 transition" />
                    </a>
                </div>
            </footer>
        </div>
    );
};

export default Home;
