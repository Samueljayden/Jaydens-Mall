import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    if (!phone.trim()) {
      setError("Phone number is required");
      return;
    }

    // Send a code to the user's phone (you'll integrate with an API here)
    // Assuming the backend sends a verification code.
    setIsCodeSent(true);
    setError("");
    alert("A verification code has been sent to your phone!");
  };

  const handlePasswordResetSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!newPassword || !confirmPassword) {
      setError("Please enter both new password and confirmation password");
      return;
    }

    // Reset the password (call API to update the password)
    alert("Password has been reset successfully!");
    navigate("/signin");
  };

  return (
    <div className="container mt-5">
      <h2>Forgot Password</h2>

      {!isCodeSent ? (
        <form onSubmit={handlePhoneSubmit}>
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input
              type="text"
              className="form-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter your phone number"
            />
          </div>
          <button className="btn btn-primary">Send Code</button>
        </form>
      ) : (
        <form onSubmit={handlePasswordResetSubmit}>
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="mb-3">
            <label className="form-label">Verification Code</label>
            <input
              type="text"
              className="form-control"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter the code sent to your phone"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">New Password</label>
            <input
              type="password"
              className="form-control"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter your new password"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Confirm New Password</label>
            <input
              type="password"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your new password"
            />
          </div>
          <button className="btn btn-primary">Reset Password</button>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
