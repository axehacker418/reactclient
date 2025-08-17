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
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top shadow-sm">
      <div className="container">
        {/* Brand */}
        <Link className="navbar-brand fw-bold text-white fs-4" to="/">
          TravelBuckey
        </Link>

        {/* Toggler */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link text-white fw-medium" to="/">
                Home
              </Link>
            </li>

            {/* <li className="nav-item">
              <Link className="nav-link text-white fw-medium" to="/courses">Courses</Link>
            </li> */}

            {user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white fw-medium" to="/travelbucket">
                    Mybucket
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white fw-medium" to="/profile">
                    Profile
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* User actions */}
          <div className="d-flex align-items-center">
            {user ? (
              <>
                <span className="text-white me-3 d-flex align-items-center fw-medium">
                  <FaUserCircle size={22} className="me-1" />
                  Hi, {user.name}
                </span>
                <button
                  className="btn btn-light text-primary fw-bold shadow-sm"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="btn btn-outline-light me-2 fw-medium shadow-sm"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn btn-light text-primary fw-bold shadow-sm"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
