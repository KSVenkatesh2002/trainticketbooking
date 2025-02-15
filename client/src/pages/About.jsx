import React from "react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="max-w-3xl bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">
          About Us 🚆
        </h1>
        <p className="text-gray-700 text-lg text-center mb-6">
          Welcome to <strong>Your Website Name</strong>, your one-stop
          destination for hassle-free train ticket booking. Whether you're
          traveling for work, leisure, or a spontaneous adventure, we make
          booking your journey easy and efficient.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6">
          Our Mission 🌍
        </h2>
        <p className="text-gray-700 mt-2">
          We aim to provide a seamless, user-friendly platform that simplifies
          train reservations while ensuring reliability, speed, and
          transparency.
        </p>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6">
          Why Choose Us? ✅
        </h2>
        <ul className="list-disc pl-5 text-gray-700 mt-2">
          <li>🚀 Fast & Secure Booking – Find and book tickets in seconds.</li>
          <li>📅 Real-Time Availability – Get live train schedules and seat availability.</li>
          <li>💳 Easy Cancellations & Refunds – Hassle-free management of your bookings.</li>
          <li>🎨 User-Centric Design – Simple and intuitive interface for a smooth experience.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-800 mt-6">
          Meet the Developer 💻
        </h2>
        <p className="text-gray-700 mt-2">
          Hi, I'm <strong>Your Name</strong>, a passionate MERN Stack Developer
          dedicated to building modern and efficient web applications. This
          project showcases my skills in <strong>React, Node.js, MongoDB, Express.js</strong>, and UI/UX Design.
        </p>

        <p className="text-gray-700 mt-4">
          Feel free to check out my{" "}
          <a href="https://github.com/KSVenkatesh2002" className="text-blue-500 hover:underline">
            GitHub
          </a>{" "}
          or{" "}
          <a href="https://linkedin.com/in/venkatesh-k-s" className="text-blue-500 hover:underline">
            LinkedIn
          </a>
          !
        </p>

        <p className="text-gray-700 mt-6 text-center">
          Have questions or feedback? Contact us at{" "}
          <a href="mailto:kotavenkatesh2002@gmail.com" className="text-blue-500 hover:underline">
            your email
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default About;
