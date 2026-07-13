import { useNavigate } from "react-router-dom";

import heroImage from "../assets/hero-image.jpg";


function Home(){

  const navigate = useNavigate();

   return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{
        backgroundImage: `url(${heroImage})`,
      }}
    >
      <div className="text-center text-white">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Welcome to Event Booking System
        </h1>

        <p className="text-xl mb-3">
          Discover and book amazing events online.
        </p>

        <p className="text-xl">
          Music, Workshops, Conferences and more.
        </p>

        <button
          onClick={() => navigate("/register")}
          className="mt-8 px-8 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Register Now
        </button>
      </div>
    </div>
  );
}

export default Home;