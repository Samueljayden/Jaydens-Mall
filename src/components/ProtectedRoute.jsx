import { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const storedUsername = localStorage.getItem("username");

  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (!storedUsername) {
      setShowMessage(true);
      const timer = setTimeout(() => setShowMessage(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [storedUsername]);

  if (!storedUsername) {
    return showMessage ? (
      <div className="text-center mt-5 text-danger">
        <h4>You must be logged in to access this page.</h4>
      </div>
    ) : (
      <Navigate to="/signin" replace state={{ from: location }} />
    );
  }

  return children;
};

export default ProtectedRoute;
