import { Link } from "react-router-dom";

import "../styles/Navbar.css";

function Navbar() {

  return (
    <div>

      <nav className="navbar">

        <h2 className="logo">
          Event Booking
        </h2>

        <div className="navbar-right">

        
          <Link to="/register">
            Register
          </Link>


           <Link to="/login">
            Login
          </Link>

        </div>

      </nav>

      

    </div>
  );
}

export default Navbar;