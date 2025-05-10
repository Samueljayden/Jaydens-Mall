import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");  // Updated to password state
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      setError("Username and Password are required");
      return;
    }

    // Store username and password in localStorage (for simplicity, in real apps avoid storing passwords this way)
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);

    // Redirect to the page the user was originally trying to access
    navigate(from, { replace: true });
  };

  return (
    <div className="container mt-5">
      <h2>Signin</h2>
      <form onSubmit={handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="mb-3">
          <input
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username :"
          />
        </div>
        <div className="mb-3">
          <input
            type="password"  // Changed to password input field
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password :"
          />
        </div>
        <button className="btn btn-primary">Login</button>
      </form>

      <div className="mt-3">
        <Link to="/forgot-password">Forgot Password?</Link>
      </div>
    </div>
  );
};

export default SignIn;
