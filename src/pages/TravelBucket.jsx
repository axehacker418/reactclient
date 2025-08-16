import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../Services/api";

function TravelBucket() {
    const [trips, setTrips] = useState([]);
    const navigate = useNavigate();

    // Fetch trips
    const fetchTrips = async () => {
        try {
            const res = await API.get("/gettrip", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            setTrips(res.data);
        } catch (err) {
            console.error("Error fetching trips:", err);
            if (err.response?.status === 401) {
                navigate("/login");
            }
        }
    };

    useEffect(() => {
        fetchTrips();
    }, []);

    // Start trip
    const handleStart = async (id) => {
        try {
            await API.put(`/trip/start/${id}`, {}, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            fetchTrips();
        } catch (err) {
            console.error("Error starting trip:", err);
        }
    };

    // Complete trip
    const handleComplete = async (id) => {
        try {
            await API.put(`/trip/complete/${id}`, {}, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            fetchTrips();
        } catch (err) {
            console.error("Error completing trip:", err);
        }
    };

    // Cancel trip
    const handleCancel = async (id) => {
        try {
            await API.put(`/trip/cancel/${id}`, {}, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            fetchTrips();
        } catch (err) {
            console.error("Error cancelling trip:", err);
        }
    };

    // Delete trip
    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this trip?")) return;
        try {
            await API.delete(`/trip/delete/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            fetchTrips();
        } catch (err) {
            console.error("Error deleting trip:", err);
        }
    };

    return (
        <div className="container py-4">
            <h2 className="mb-4 text-center">My Travel Bucket</h2>
            <div className="d-flex flex-wrap gap-3 justify-content-center">
                {trips.map((trip) => {
                    const status = trip.status.toLowerCase(); // normalize status
                    return (
                        <div
                            key={trip._id}
                            className="card shadow-sm"
                            style={{ width: "220px", cursor: "pointer" }}
                        >
                            <img
                                src={trip.destinationImage?.url}
                                alt={trip.location}
                                className="card-img-top"
                                style={{ height: "150px", objectFit: "cover" }}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{trip.location}</h5>
                                <p className="card-text">
                                    <strong>Budget:</strong> Rs.{trip.budget} <br />
                                    <strong>Duration:</strong> {trip.duration} days <br />
                                    <strong>Status:</strong>{" "}
                                    <span
                                        style={{
                                            color:
                                                status === "completed"
                                                    ? "green"
                                                    : status === "cancelled"
                                                    ? "red"
                                                    : status === "active"
                                                    ? "blue"
                                                    : "orange",
                                        }}
                                    >
                                        {trip.status}
                                    </span>
                                </p>
                                <div className="d-flex gap-2 flex-wrap">
                                    {/* Pending trips */}
                                    {status === "pending" && (
                                        <>
                                            <button
                                                className="btn btn-sm btn-primary"
                                                onClick={() => handleStart(trip._id)}
                                            >
                                                Start Trip
                                            </button>
                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() => handleCancel(trip._id)}
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    )}

                                    {/* Active trips */}
                                    {status === "active" && (
                                        <>
                                            <button
                                                className="btn btn-sm btn-success"
                                                onClick={() => handleComplete(trip._id)}
                                            >
                                                Complete
                                            </button>
                                            <button
                                                className="btn btn-sm btn-danger"
                                                onClick={() => handleCancel(trip._id)}
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    )}

                                    {/* Delete always visible */}
                                    <button
                                        className="btn btn-sm btn-outline-danger"
                                        onClick={() => handleDelete(trip._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}

                {/* + sign card */}
                <div
                    className="d-flex align-items-center justify-content-center border border-2 border-primary rounded shadow-sm"
                    style={{
                        width: "220px",
                        height: "220px",
                        fontSize: "3rem",
                        color: "#0d6efd",
                        cursor: "pointer",
                    }}
                    onClick={() => navigate("/addtrip")}
                >
                    +
                </div>
            </div>
        </div>
    );
}

export default TravelBucket;
