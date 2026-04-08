import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const { setAccessToken, setUser } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const response = await login({ username, password });
      if (response?.accessToken) {
        setAccessToken(response.accessToken);
        setUser(response.user);
        navigate("/projects");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6 col-lg-5">
        <div className="card shadow-sm border-0">
          <div className="card-body p-5">
            <div className="text-center mb-4">
              <h2 className="h4 fw-bold text-primary mb-2">Welcome Back</h2>
              <p className="text-muted">
                Sign in to your Project Tracker account
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label fw-semibold">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  disabled={loading}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="form-label fw-semibold">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg w-100 fw-semibold"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            <hr className="my-4" />

            <p className="text-center text-muted small">
              Don't have an account?{" "}
              <a
                href="#"
                className="text-primary text-decoration-none fw-semibold"
              >
                Contact administrator
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
