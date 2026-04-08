import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logout } from "../api/auth";
import { toast } from "react-toastify";

const Header = () => {
  const { user, setUser, setAccessToken } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      setAccessToken(null);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        {/* Left: Brand */}
        <Link to={"/projects"} className="navbar-brand">
          Welcome, {user ? user.username : "Guest"}
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          {user ? (
            <>
              {/* Center: Menu */}
              <ul className="navbar-nav mx-auto">
                <li className="nav-item">
                  <NavLink
                    to="/users"
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    User
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/projects"
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    Project
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/tasks"
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    Task
                  </NavLink>
                </li>
              </ul>

              {/* Right: Logout */}
              <div className="ms-auto">
                <button className="btn btn-danger" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="ms-auto">
              <Link to="/login" className="btn btn-primary">
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
