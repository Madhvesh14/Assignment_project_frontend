import { Link, useNavigate } from "react-router-dom";

import "../styles/Navbar.css";

function Navbar() {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const role = localStorage.getItem("role");

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/login");
  };

  return (

    <nav className="navbar">

      <h2 className="logo">
        Event Booking
      </h2>

      <div className="navbar-right">

        <Link to="/">
          Home
        </Link>

        {
         token && role !== "Admin" && (
             <>
                <Link to="/events">
                     Events
                </Link>

                <Link to="/my-bookings">
                   My Bookings
                </Link>
            </>
          )
        }

        {
          !token && (
            <>
              <Link to="/register">
                Register
              </Link>

              <Link to="/login">
                Login
              </Link>
            </>
          )
        }

        {
          token && (
            <button
              className="logout-btn"
              onClick={logout}
            >
              Logout
            </button>
          )
        }

      </div>

    </nav>
  );
}

export default Navbar;