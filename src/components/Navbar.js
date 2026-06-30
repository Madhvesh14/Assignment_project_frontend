import { Link, useNavigate } from "react-router-dom";

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
    <nav className="bg-blue-600 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4">
        <h2 className="text-2xl font-bold">
          Event Booking System
        </h2>

        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-white font-medium transition-all duration-300 hover:text-yellow-300 hover:scale-110"
          >
            Home
          </Link>

          {token && role !== "Admin" && (
            <>
              <Link
                to="/events"
                className="text-white font-medium transition-all duration-300 hover:text-yellow-300 hover:scale-110"
          >
                Events
              </Link>

              <Link
                to="/my-bookings"
                className="text-white font-medium transition-all duration-300 hover:text-yellow-300 hover:scale-110"
          >
                My Bookings
              </Link>
            </>
          )}

          {!token && (
            <>
              <Link
                to="/register"
                className="text-white font-medium transition-all duration-300 hover:text-yellow-300 hover:scale-110"
          >
                Register
              </Link>

              <Link
                to="/login"
                className="text-white font-medium transition-all duration-300 hover:text-yellow-300 hover:scale-110"
          >
                Login
              </Link>
            </>
          )}

          {token && (
            <button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;