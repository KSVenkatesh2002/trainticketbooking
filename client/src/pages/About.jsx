import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const socialLinks = [
    {
      icon: FaGithub,
      href: "https://github.com/KSVenkatesh2002",
      color: "hover:text-white",
    },
    {
      icon: FaLinkedin,
      href: "https://linkedin.com/in/venkatesh-k-s",
      color: "hover:text-blue-500",
    },
    {
      icon: FaInstagram,
      href: "https://instagram.com",
      color: "hover:text-pink-500",
    },
    {
      icon: FaEnvelope,
      href: "mailto:kotavenkatesh2002@gmail.com",
      color: "hover:text-orange-400",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 p-4 md:p-10 text-slate-200">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-4xl bg-slate-900/60 backdrop-blur-xl border border-white/5 p-8 md:p-12 rounded-3xl shadow-2xl"
      >
        <motion.h1
          variants={itemVariants}
          className="text-4xl md:text-5xl font-bold text-center mb-8 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent"
        >
          About Us
        </motion.h1>

        <motion.div
          variants={itemVariants}
          className="space-y-6 text-lg text-slate-300 leading-relaxed text-center"
        >
          <p>
            Welcome to <strong className="text-white">Venkatesh Railway</strong>
            , your premium destination for hassle-free train ticket booking. We
            blend cutting-edge technology with user-centric design to make your
            journey seamless from the very first click.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <motion.div
            variants={itemVariants}
            className="bg-slate-800/50 p-6 rounded-2xl border border-white/5 hover:border-orange-500/30 transition-all duration-300"
          >
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
              🚀 Our Mission
            </h2>
            <p className="text-slate-400">
              To revolutionize rail travel by providing a platform that is not
              only reliable and fast but also a joy to use.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-slate-800/50 p-6 rounded-2xl border border-white/5 hover:border-orange-500/30 transition-all duration-300"
          >
            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center gap-2">
              ✨ Why Choose Us?
            </h2>
            <ul className="text-slate-400 space-y-2">
              <li className="flex items-center gap-2">
                ⚡ Instant & Secure Booking
              </li>
              <li className="flex items-center gap-2">
                📅 Real-Time Availability
              </li>
              <li className="flex items-center gap-2">
                🎨 Premium User Experience
              </li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          className="mt-12 pt-10 border-t border-white/5 text-center"
        >
          <h2 className="text-2xl font-semibold text-white mb-4">
            Meet the Developer
          </h2>
          <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
            Hi, I'm{" "}
            <strong className="text-white">
              <a
                href={"https://venkatesh-k-s.vercel.app"}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 text-3xl text-blue-200  hover:pointer hover:text-blue-700 hover:underline`}
              >
                Venkatesh .K .S
              </a>
            </strong>
            , a passionate MERN Stack Developer. This project is a showcase of
            modern web development, crafted with React, Node.js, and a lot of
            caffeine.
          </p>

          <div className="flex justify-center gap-6">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`text-3xl text-slate-500 transition-colors duration-300 ${social.color}`}
              >
                <social.icon />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;
