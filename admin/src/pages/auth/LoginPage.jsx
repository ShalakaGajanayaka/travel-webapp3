import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { checkAuth } from "../../utils/auth";

const LoginPage = () => {
  const [userName, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ open: false, message: "", severity: "info" });
  const navigate = useNavigate();
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [forgotEmail, setForgotEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset error message
    setSuccessMessage(
      "Password reset requested successfully. Please check your inbox for further instructions."
    );
    // Add forgot password logic here
    console.log("Password reset requested for", forgotEmail);
  };

  const toggleForgotPassword = () => {
    setIsForgotPassword(!isForgotPassword);
    setErrorMessage("");
    setSuccessMessage("");
    if (!isForgotPassword && email) setForgotEmail(email);
  };

  useEffect(() => {
    const checkUserAuth = async () => {
      const result = await checkAuth();
      if (result) {
        navigate("/admin");
      }
    };
    checkUserAuth();
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosInstance.post("/api/auth/admin-login", {
        userName,
        password,
    
      });

      if (response.status === 200) {
        console.log(response.data.role);
        setAlert({ open: true, message: "Login successful!", severity: "success" });
        if (response.data.role === "admin" || response.data.role === "superadmin") {
          setTimeout(() => navigate("/admin"), 1500);
        }
        else {
          setTimeout(() => navigate("/login"), 1500);
        }
          setTimeout(() => navigate("/admin"), 1500);
      } else {
        setAlert({ open: true, message: "Invalid credentials", severity: "error" });
      }
    } catch (error) {
      setAlert({ open: true, message: "Login failed. Please try again.", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 bg-center bg-cover">

      <div className="w-full max-w-md p-6 mx-4 bg-white rounded-md shadow-md sm:mx-auto">

        <div className="text-center">
          <h3 className="text-sm font-semibold text-gray-500 uppercase">
            {isForgotPassword ? "Forgot Password" : "Admin Login"}
          </h3>
        </div>

        {alert.open && (
          <div
            className={`mb-4 rounded-lg px-4 py-3 text-sm ${alert.severity === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}
            role="alert"
          >
            {alert.message}
          </div>
        )}
        {isForgotPassword ? (
          <form onSubmit={handleForgotPassword} className="space-y-4">
            {errorMessage && (
              <div className="text-sm text-red-500">{errorMessage}</div>
            )}
            {successMessage && (
              <div className="text-sm text-green-500">{successMessage}</div>
            )}
            <div>
              <label htmlFor="forgot-email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="forgot-email"
                value={forgotEmail}
                onChange={(e) => setForgotEmail(e.target.value)}
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                placeholder="Enter your email"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 text-white bg-black rounded-md hover:bg-gray-800"
            >
              Send Email
            </button>
            <button
              type="button"
              onClick={toggleForgotPassword}
              className="mt-4 text-sm text-gray-500 underline"
            >
              Back
            </button>
          </form>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            {errorMessage && (
              <div className="text-sm text-red-500">{errorMessage}</div>
            )}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                id="email"
                value={userName}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                placeholder="Enter your username"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                placeholder="Enter your password"
                required
              />
            </div>
            <div className="text-right">
              <button
                type="button"
                onClick={toggleForgotPassword}
                className="text-sm text-gray-500 underline"
              >
                Forgot password?
              </button>
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 text-white rounded-md ${loading ? "bg-gray-400" : "bg-black hover:bg-gray-800"
                }`}
            >
              {loading ? "Working..." : "Log In"}
            </button>
            {/* <div className="mt-4 text-center">
              <a
                onClick={() => navigate("/register")}
                className="text-sm text-gray-500 underline cursor-pointer"
              >
                Create account
              </a>
            </div> */}
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
