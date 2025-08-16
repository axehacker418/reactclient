import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../Services/api"; // axios instance with baseURL

function AddTrip() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        budget: "",
        location: "",
        vehicle: "",
        duration: "",
    });
    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");

    // Handle input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle file change
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    // Submit form
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = new FormData();
            data.append("budget", formData.budget);
            data.append("location", formData.location);
            data.append("vehicle", formData.vehicle);
            data.append("duration", formData.duration);
            if (file) {
                data.append("destinationImage", file);
            }

            const res = await API.post("/trip/add", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${localStorage.getItem("token")}`, 
                },
            });

            setMessage("Trip added successfully!");
            setTimeout(() => navigate("/travelbucket"), 1000);
        } catch (err) {
            console.error("Error adding trip:", err);

            // ✅ If backend says unauthorized → redirect to login
            if (err.response?.status === 401) {
                setMessage("Unauthorized! Please login first.");
                setTimeout(() => navigate("/login"), 1000);
            } else {
                setMessage("Failed to add trip, please try again.");
            }
        }
    };

    return (
        <div className="container py-5" style={{ maxWidth: "600px" }}>
            <h2 className="mb-4 text-center text-primary">Add a New Trip</h2>
            {message && <div className="alert alert-info">{message}</div>}

            <form onSubmit={handleSubmit} encType="multipart/form-data">
                {/* Location */}
                <div className="mb-3">
                    <label className="form-label fw-semibold">Location</label>
                    <input
                        type="text"
                        className="form-control"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Budget */}
                <div className="mb-3">
                    <label className="form-label fw-semibold">Budget (Rs.)</label>
                    <input
                        type="number"
                        className="form-control"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Vehicle */}
                <div className="mb-3">
                    <label className="form-label fw-semibold">Vehicle</label>
                    <input
                        type="text"
                        className="form-control"
                        name="vehicle"
                        value={formData.vehicle}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Duration */}
                <div className="mb-3">
                    <label className="form-label fw-semibold">Duration (days)</label>
                    <input
                        type="number"
                        className="form-control"
                        name="duration"
                        value={formData.duration}
                        onChange={handleChange}
                        required
                    />
                </div>

                {/* Destination Image */}
                <div className="mb-3">
                    <label className="form-label fw-semibold">Destination Image</label>
                    <input
                        type="file"
                        className="form-control"
                        name="destinationImage"
                        accept="image/*"
                        onChange={handleFileChange}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary w-100 fw-bold">
                    Add Trip
                </button>
            </form>
        </div>
    );
}

export default AddTrip;
