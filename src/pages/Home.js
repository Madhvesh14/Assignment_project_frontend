import { useNavigate } from "react-router-dom";

import heroImage from "../assets/hero-image.jpg";

import "../styles/Home.css";


function Home(){

  const navigate = useNavigate();

  return (
    <div 
      className= "hero-container"
      style={{
        backgroundImage: `url(${heroImage})`
      }}
    >
      <div className= "hero-overlay">

        <h1 className= "hero-title">
          Welcome to Event Booking System
        </h1>

        <p className= "hero-text " >
          Discover and book amazing events online.
        </p> 

        <p className= "hero-text">
          Music, Workshops, Conferences and more.
        </p>

        
            <button 
            className="register-btn"
            onClick={() => navigate("/register")}>
              Register Now
            </button>
        

        


      </div>
    </div>
  );
}

export default Home;