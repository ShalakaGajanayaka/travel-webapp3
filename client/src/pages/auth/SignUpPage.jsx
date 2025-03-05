import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
    phone: "",
    pin: "",
    employeeNo: "",
    role: "user" // Set the default role to 'user'
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ open: false, message: "", severity: "" });
  const navigate = useNavigate();

  // auto generate employee number
  useEffect(() => {
    const generateEmployeeNo = () => { 
      return 'EMPU' + Math.floor(10000 + Math.random() * 90000);
    };
    setFormData((prevData) => ({ ...prevData, employeeNo: generateEmployeeNo() }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const response = await axiosInstance.post("/api/auth/register", formData);
      if (response.status === 201) {
        setAlert({ open: true, message: "User registered successfully!", severity: "success" });
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setAlert({ open: true, message: "Registration failed. Please try again.", severity: "error" });
      }
    } catch (error) {
      setAlert({
        open: true,
        message: error.response?.data?.error || "An error occurred. Please try again.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-gray-200 bg-center bg-cover"
      style={{
        backgroundImage:
          "url('https://bookings.intrepidtravel.com/bookings/img/intrepid/intrepid-background.jpg')",
      }}
    >
      <div className="w-full max-w-md p-6 mx-4 bg-white rounded-md shadow-md sm:mx-auto">
        <div className="text-center">
          <h3 className="text-sm font-semibold text-gray-500 uppercase">Create an Account</h3>
          <img
            src="https://bookings.intrepidtravel.com/bookings/intrepid/images/fresh-logo-auth.svg"
            alt="Intrepid Logo"
            className="mx-auto my-4"
          />
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
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="userName" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              id="userName"
              name="userName"
              type="text"
              value={formData.userName}
              onChange={handleChange}
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              pattern="[0-9]*"
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div>
            <label htmlFor="pin" className="block text-sm font-medium text-gray-700">
              Withdrawal Pin
            </label>
            <input
              id="pin"
              name="pin"
              type="password"
              value={formData.pin}
              onChange={handleChange}
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 text-white rounded-md ${loading ? "bg-gray-400" : "bg-black hover:bg-gray-800"}`}
          >
            {loading ? "Registering..." : "Register"}
          </button>

          <div className="mt-4 text-center">
            <a onClick={() => navigate("/login")} className="text-sm text-gray-500 underline cursor-pointer">
              Already have an account? Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;