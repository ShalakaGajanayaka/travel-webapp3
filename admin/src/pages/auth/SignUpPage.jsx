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
    role: "admin"
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ open: false, message: "", severity: "" });
  const navigate = useNavigate();

  // auto generate employee number
  useEffect(() => {
    const generateEmployeeNo = () => { 
      return 'EMPA' + Math.floor(1000 + Math.random() * 9000);
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
    console.log(formData);
    try {
      const response = await axiosInstance.post("/api/auth/admin-register", formData);
      if (response.status === 201) {
        setAlert({ open: true, message: "Admin registered successfully!", severity: "success" });
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
    <div className="w-full max-w-md p-6 bg-white rounded-md shadow-md">
      <h3 className="mb-4 text-lg font-semibold text-center text-gray-700">Create an Account</h3>

      {alert.open && (
        <div className={`mb-4 px-4 py-3 rounded-lg text-sm ${alert.severity === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
          {alert.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="userName" type="text" placeholder="Username" value={formData.userName} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md" />
        <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md" />
        <input name="phone" type="text" placeholder="Phone" value={formData.phone} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md" />
        <input name="pin" type="text" placeholder="PIN" value={formData.pin} onChange={handleChange} required className="w-full px-3 py-2 border rounded-md" />

        <button type="submit" disabled={loading} className={`w-full py-2 text-white rounded-md ${loading ? "bg-gray-400" : "bg-black hover:bg-gray-800"}`}>
          {loading ? "Working..." : "Register"}
        </button>
      </form>

      <div className="mt-4 text-center">
        <a onClick={() => navigate("/login")} className="text-sm text-gray-500 underline cursor-pointer">
          Already have an account? Login
        </a>
      </div>
    </div>
  </div>
  );
};

export default SignUpPage;
