import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../Services/api";

function TravelBucket() {
    const [trips, setTrips] = useState([]);
    const navigate = useNavigate();
   

    useEffect(() => {
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
        navigate("/login"); // redirect if unauthorized
      }
    }
  };

  fetchTrips();
}, []);


    return (
        <div className="container py-4">
            <h2 className="mb-4 text-center">My Travel Bucket</h2>
            <div className="d-flex flex-wrap gap-3 justify-content-center">
                {/* Trip cards */}
                {trips.map((trip) => (
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
                                <strong>Duration:</strong> {trip.duration} days
                            </p>
                        </div>
                    </div>
                ))}

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
