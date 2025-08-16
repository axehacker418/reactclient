import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa"; // npm install react-icons
import API from "../Services/api";

function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")); // ya context se le lo

  const handleLogout = async () => {
    await API.get("/logout", {}, { withCredentials: true });
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top shadow">
      <div className="container">
        <Link className="navbar-brand fw-bold text-white" to="/">TravelBuckey</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/courses">Courses</Link>
            </li>

            {user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/mybooking">My Booking</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/profile">Profile</Link>
                </li>
              </>
            )}
          </ul>

          <div className="d-flex align-items-center">
            {user ? (
              <>
                <span className="text-white me-3 d-flex align-items-center">
                  <FaUserCircle size={22} className="me-1" />
                  Hi, {user.name}
                </span>
                <button
                  className="btn btn-light text-primary fw-bold"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline-light me-2">Login</Link>
                <Link to="/register" className="btn btn-light text-primary fw-bold">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;