import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [time, setTime] = useState(new Date());
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const storedGender = localStorage.getItem("gender");
    if (storedUsername) {
      setUser({ username: storedUsername, gender: storedGender });
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("gender");
    setUser(null);
    window.location.reload();
  };

  const getGreeting = () => {
    if (!user) return "";
    const prefix = user.gender === "male" ? "Mr." : user.gender === "female" ? "Ms." : "";
    return `Welcome ${prefix} ${user.username}`;
  };

  const formatTime = () => {
    return time.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div>
      <section className="row">
        <div className="col-md-12">
          <div className="navbar navbar-expand-md navbar-light bg-light">
            <Link to="/" className="navbar-brand">
              <img src="/images/logo.webp" alt="Jaydens Mall" width="130" />
            </Link>
            <button
              className="navbar-toggler"
              data-bs-target="#navbarcollapse"
              data-bs-toggle="collapse"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarcollapse">
              <div className="navbar-nav">
                <Link to="/" className="btn btn-danger mx-2">Home</Link>
                <Link to="/addproduct" className="btn btn-danger mx-2">Add Product</Link>
                <Link to="/chatbox" className="btn btn-danger mx-2">Chat</Link>
                <Link to="/cart" className="btn btn-danger mx-2">Cart</Link>
                <Link to="/about" className="btn btn-danger mx-2">About</Link>
                <Link to="/contact" className="btn btn-danger mx-2">Contact</Link>
                <Link to="/map" className="btn btn-danger mx-2">Map</Link>
              </div>

              <div className="navbar-nav ms-auto align-items-center">
                {user ? (
                  <div className="dropdown">
                    <button
                      className="btn btn-outline-dark dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {getGreeting()}
                    </button>
                    <ul className="dropdown-menu dropdown-menu-end">
                      <li className="dropdown-item text-muted">🕒 {formatTime()}</li>
                      <li><hr className="dropdown-divider" /></li>
                      <li>
                        <button className="dropdown-item text-danger" onClick={logout}>
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <>
                    <Link to="/signin" className="btn btn-info mx-2">Login</Link>
                    <Link to="/signup" className="btn btn-info mx-2">Sign up</Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Navbar;
