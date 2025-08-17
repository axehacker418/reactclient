import React from "react";
import TravelBucket from "./TravelBucket";

function Home() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      {/* Hero Section */}
      <div
        className="hero position-relative text-white text-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/3194519/pexels-photo-3194519.jpeg')",
          height: "80vh",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="overlay position-absolute top-0 start-0 w-100 h-100"
             style={{ backgroundColor: "rgba(0,0,0,0.5)" }}></div>
        <div className="hero-content position-relative d-flex flex-column justify-content-center align-items-center h-100">
          <h1 className="display-3 fw-bold">🌍 Travel Buddy</h1>
          <p className="lead mb-4">
            Plan your adventures, track your trips, and create memories.
          </p>
          {!user && (
            <a href="/login" className="btn btn-lg btn-primary shadow">
              Get Started 🚀
            </a>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div className="container py-5">
        <h2 className="text-center mb-5">Why Choose Travel Buddy?</h2>
        <div className="row text-center g-4">
          <div className="col-md-4">
            <div className="card shadow border-0 h-100 p-4">
              <h3>✈️ Easy Planning</h3>
              <p>Create, manage, and customize your travel bucket list.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow border-0 h-100 p-4">
              <h3>📍 Track Progress</h3>
              <p>Start, pause, or complete trips with just one click.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow border-0 h-100 p-4">
              <h3>💾 Save Memories</h3>
              <p>Upload photos & keep all your trips safe in one place.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Travel Bucket if logged in */}
      {user && (
        <div className="bg-light py-5">
          <div className="container">
            <h2 className="text-center mb-4">Your Travel Bucket</h2>
            <TravelBucket />
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
