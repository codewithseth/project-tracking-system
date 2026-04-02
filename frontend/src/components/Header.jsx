import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logout } from "../api/auth";

const Header = () => {
  const { user, setUser, setAccessToken } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      setAccessToken(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header>
      <nav>
        {user ? (
          <>
            <Link to="/projects">Projects</Link>
            <Link to="/tasks">Tasks</Link>
            <Link to="/users">Users</Link>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
