import React, { useEffect, useState } from "react";
import API from "../Services/api";

function Profile() {
  const [profile, setProfile] = useState(null);

  // Fetch profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/profile/me", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setProfile(res.data);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };
    fetchProfile();
  }, []);

  // Upload profile picture
  const handleImageUpload = async (e) => {
    const formData = new FormData();
    formData.append("profileImage", e.target.files[0]);

    try {
      const res = await API.put("/profile/image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Profile image updated!");
      setProfile(res.data.profile); // ✅ update React state
    } catch (err) {
      console.error(err);
      alert("Error updating profile image");
    }
  };

  return (
    <div className="container-fluid bg-light py-5 mt-5">
      <div
        className="mx-auto shadow-lg rounded p-5 bg-white"
        style={{ maxWidth: "900px" }}
      >
        <div className="text-center">
          <div className="position-relative d-inline-block">
            {/* Profile Image */}
            <img
              src={
                profile?.profileImage?.url ||
                "https://via.placeholder.com/150"
              }
              alt="Profile"
              className="rounded-circle shadow"
              style={{
                width: "150px",
                height: "150px",
                objectFit: "cover",
                border: "5px solid #f8f9fa",
              }}
            />

            {/* + Icon for upload */}
            <label
              htmlFor="fileUpload"
              className="position-absolute bottom-0 end-0 bg-primary text-white rounded-circle p-2 shadow"
              style={{
                cursor: "pointer",
                fontSize: "20px",
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.2)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              +
            </label>
            <input
              type="file"
              id="fileUpload"
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
          </div>

          {/* Profile Details */}
          <h3 className="mt-3">{profile?.name}</h3>
          <p className="text-muted">User ID: {profile?.userId}</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
