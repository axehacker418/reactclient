import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // navigation ke liye
import API from "../Services/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  // Input change handle
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Form submit handle
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/register", formData);
      setMessage(res.data.message || "Registration successful!");

      // Form reset
      setFormData({ name: "", email: "", password: "" });

      // 1 second ke delay ke baad login page par bhejna
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Something went wrong, please try again."
      );
    }
  };

  return (
  
  <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
    <div className="card shadow-lg p-4" style={{ maxWidth: "500px", width: "100%", borderRadius: "12px" }}>
      <h2 className="mb-4 text-center text-primary">Register</h2>
      
      {message && (
        <div className="alert alert-info text-center">{message}</div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Full Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}   // keep input controlled
            onChange={handleChange}
            required
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Email Address</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* Password */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100 py-2 fw-bold">
          Register
        </button>
      </form>
    </div>
  </div>
);

}

export default Register;