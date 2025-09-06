import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import { FaPhoneAlt, FaLeaf, FaMapMarkerAlt, FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { BASE_URL } from "../config";
import { ClipLoader } from "react-spinners";

export default function UserProfile() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`${BASE_URL}/profile/view`, { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch((err) => {
        console.error(err);
        setError("Failed to load profile");
      });
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-950 text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-green-950">
        <ClipLoader color="#22c55e" size={60} />
      </div>
    );
  }

  return (
    <div className="relative">
      <Navbar />

      <div className="min-h-screen bg-green-950 pt-[7rem] px-4 flex justify-center items-start pb-[6rem]">
        <div className="bg-green-900 text-green-50 rounded-3xl shadow-lg max-w-3xl w-full p-10 border border-green-700">
          {/* Header */}
          <div className="text-center mb-10">
            <h2 className="text-4xl font-extrabold text-green-400">
              Welcome, {user.fullName.split(" ")[0]} 🌱
            </h2>
            <p className="text-green-200 text-sm mt-1">
              Here’s your farming dashboard.
            </p>
          </div>

          {/* Profile Info */}
          <div className="flex flex-col items-center gap-4">
            <h3 className="text-2xl font-semibold text-white">{user.fullName}</h3>
            <p className="text-green-400 font-medium mt-1 flex items-center gap-2">
              <MdEmail /> {user.emailId}
            </p>
            <Link to="/editProfile">
              <button className="mt-4 px-5 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold shadow-sm">
                ✏️ Edit Profile
              </button>
            </Link>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            <DetailCard icon={<FaPhoneAlt />} label="Phone" value={user.phoneNumber} />
            <DetailCard icon={<FaMapMarkerAlt />} label="State" value={user.state} />
            <DetailCard icon={<FaMapMarkerAlt />} label="District" value={user.district} />
            <DetailCard icon={<FaLeaf />} label="Crops" value={user.crops?.join(", ")} />
            <DetailCard icon={<FaUser />} label="Age" value={user.age} />
          </div>
        </div>
      </div>
    </div>
  );
}

function DetailCard({ icon, label, value }) {
  return (
    <div className="bg-green-800 border border-green-600 p-4 rounded-xl shadow-sm">
      <div className="flex items-center gap-3 text-green-400 text-sm font-semibold mb-1">
        <span>{icon}</span>
        {label}
      </div>
      <p className="text-white pl-8">{value || "Not provided"}</p>
    </div>
  );
}
