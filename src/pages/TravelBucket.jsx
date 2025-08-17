// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../Services/api";

// function TravelBucket() {
//     const [trips, setTrips] = useState([]);
//     const navigate = useNavigate();

//     // Fetch trips
//     const fetchTrips = async () => {
//         try {
//             const res = await API.get("/gettrip", {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem("token")}`,
//                 },
//             });
//             setTrips(res.data);
//         } catch (err) {
//             console.error("Error fetching trips:", err);
//             if (err.response?.status === 401) {
//                 navigate("/login");
//             }
//         }
//     };

//     useEffect(() => {
//         fetchTrips();
//     }, []);

//     // Start/Restart trip
//     const handleStart = async (id) => {
//         try {
//             await API.put(`/trip/start/${id}`, {}, {
//                 headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//             });
//             fetchTrips();
//         } catch (err) {
//             console.error("Error starting trip:", err);
//         }
//     };

//     // Complete trip
//     const handleComplete = async (id) => {
//         try {
//             await API.put(`/trip/complete/${id}`, {}, {
//                 headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//             });
//             fetchTrips();
//         } catch (err) {
//             console.error("Error completing trip:", err);
//         }
//     };

//     // Cancel trip
//     const handleCancel = async (id) => {
//         try {
//             await API.put(`/trip/cancel/${id}`, {}, {
//                 headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//             });
//             fetchTrips();
//         } catch (err) {
//             console.error("Error cancelling trip:", err);
//         }
//     };

//     // Delete trip
//     const handleDelete = async (id) => {
//         if (!window.confirm("Are you sure you want to delete this trip?")) return;
//         try {
//             await API.delete(`/trip/delete/${id}`, {
//                 headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//             });
//             fetchTrips();
//         } catch (err) {
//             console.error("Error deleting trip:", err);
//         }
//     };

//     // Status badge styling
//     const getStatusBadge = (status) => {
//         switch (status.toLowerCase()) {
//             case "active":
//                 return <span className="badge bg-primary">Active</span>;
//             case "completed":
//                 return <span className="badge bg-success">Completed</span>;
//             case "cancelled":
//                 return <span className="badge bg-danger">Cancelled</span>;
//             default:
//                 return <span className="badge bg-secondary">Pending</span>;
//         }
//     };

//     return (
//         <div className="container py-4">
//             <h2 className="mb-4 text-center">🌍 My Travel Bucket</h2>
//             <div className="d-flex flex-wrap gap-3 justify-content-center">
//                 {trips.map((trip) => {
//                     const status = trip.status.toLowerCase();
//                     return (
//                         <div
//                             key={trip._id}
//                             className="card shadow-sm"
//                             style={{ width: "230px" }}
//                         >
//                             <img
//                                 src={trip.destinationImage?.url}
//                                 alt={trip.location}
//                                 className="card-img-top"
//                                 style={{ height: "150px", objectFit: "cover" }}
//                             />
//                             <div className="card-body text-center">
//                                 <h5 className="card-title">{trip.location}</h5>
//                                 <p className="card-text mb-2">
//                                     <strong>Budget:</strong> Rs.{trip.budget} <br />
//                                     <strong>Duration:</strong> {trip.duration} days <br />
//                                     <strong>Status:</strong> {getStatusBadge(status)}
//                                 </p>

//                                 <div className="d-flex flex-column gap-2">
//                                     {/* Pending trips */}
//                                     {status === "pending" && (
//                                         <>
//                                             <button
//                                                 className="btn btn-sm btn-outline-primary w-100"
//                                                 onClick={() => handleStart(trip._id)}
//                                             >
//                                                 🚀 Start Trip
//                                             </button>
//                                             <button
//                                                 className="btn btn-sm btn-outline-danger w-100"
//                                                 onClick={() => handleCancel(trip._id)}
//                                             >
//                                                 ❌ Cancel
//                                             </button>
//                                         </>
//                                     )}

//                                     {/* Active trips */}
//                                     {status === "active" && (
//                                         <>
//                                             <button
//                                                 className="btn btn-sm btn-success w-100"
//                                                 onClick={() => handleComplete(trip._id)}
//                                             >
//                                                 ✅ Complete
//                                             </button>
//                                             <button
//                                                 className="btn btn-sm btn-warning w-100"
//                                                 onClick={() => handleCancel(trip._id)}
//                                             >
//                                                 🛑 Cancel
//                                             </button>
//                                         </>
//                                     )}

//                                     {/* Cancelled or Completed → Restart */}
//                                     {(status === "cancelled" || status === "completed") && (
//                                         <button
//                                             className="btn btn-sm btn-info w-100"
//                                             onClick={() => handleStart(trip._id)}
//                                         >
//                                             🔄 Restart Trip
//                                         </button>
//                                     )}

//                                     {/* Delete always visible */}
//                                     <button
//                                         className="btn btn-sm btn-outline-dark w-100"
//                                         onClick={() => handleDelete(trip._id)}
//                                     >
//                                         🗑️ Delete
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     );
//                 })}

//                 {/* + sign card */}
//                 <div
//                     className="d-flex align-items-center justify-content-center border border-2 border-primary rounded shadow-sm"
//                     style={{
//                         width: "230px",
//                         height: "230px",
//                         fontSize: "3rem",
//                         color: "#0d6efd",
//                         cursor: "pointer",
//                     }}
//                     onClick={() => navigate("/addtrip")}
//                 >
//                     +
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default TravelBucket;





import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../Services/api";

function TravelBucket() {
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();

  // Get user from localStorage
  const user = JSON.parse(localStorage.getItem("user"));

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

  // Start/Restart trip
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

  // Status badge styling
  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return <span className="badge bg-primary">Active</span>;
      case "completed":
        return <span className="badge bg-success">Completed</span>;
      case "cancelled":
        return <span className="badge bg-danger">Cancelled</span>;
      default:
        return <span className="badge bg-secondary">Pending</span>;
    }
  };

  return (
    <div className="container py-5">
      {/* Dynamic title */}
      <h2 className="mb-4 text-center fw-bold">
        {user ? `${user.name}'s Travel Bucket 🌍` : "My Travel Bucket 🌍"}
      </h2>

      <div className="row g-4 justify-content-center">
        {trips.map((trip) => {
          const status = trip.status.toLowerCase();
          return (
            <div key={trip._id} className="col-md-4 col-sm-6">
              <div className="card shadow-lg border-0 h-100">
                <img
                  src={trip.destinationImage?.url || "https://via.placeholder.com/300"}
                  alt={trip.location}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{trip.location}</h5>
                  <p className="card-text mb-3">
                    <strong>Budget:</strong> Rs.{trip.budget} <br />
                    <strong>Duration:</strong> {trip.duration} days <br />
                    <strong>Status:</strong> {getStatusBadge(status)}
                  </p>

                  <div className="d-flex flex-column gap-2">
                    {status === "pending" && (
                      <>
                        <button
                          className="btn btn-sm btn-outline-primary"
                          onClick={() => handleStart(trip._id)}
                        >
                          🚀 Start Trip
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleCancel(trip._id)}
                        >
                          ❌ Cancel
                        </button>
                      </>
                    )}

                    {status === "active" && (
                      <>
                        <button
                          className="btn btn-sm btn-success"
                          onClick={() => handleComplete(trip._id)}
                        >
                          ✅ Complete
                        </button>
                        <button
                          className="btn btn-sm btn-warning"
                          onClick={() => handleCancel(trip._id)}
                        >
                          🛑 Cancel
                        </button>
                      </>
                    )}

                    {(status === "cancelled" || status === "completed") && (
                      <button
                        className="btn btn-sm btn-info"
                        onClick={() => handleStart(trip._id)}
                      >
                        🔄 Restart Trip
                      </button>
                    )}

                    <button
                      className="btn btn-sm btn-outline-dark"
                      onClick={() => handleDelete(trip._id)}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* + sign card */}
        <div
          className="col-md-4 col-sm-6 d-flex align-items-center justify-content-center"
          onClick={() => navigate("/addtrip")}
          style={{ cursor: "pointer" }}
        >
          <div
            className="d-flex align-items-center justify-content-center border border-3 border-primary rounded shadow"
            style={{
              width: "100%",
              height: "250px",
              fontSize: "3rem",
              color: "#0d6efd",
            }}
          >
            +
          </div>
        </div>
      </div>
    </div>
  );
}

export default TravelBucket;
