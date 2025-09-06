import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { BASE_URL } from "../config";

export default function EditProfile() {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    state: "",
    district: "",
    crops: "",
    age: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  // Fetch existing profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/profile/view`, { withCredentials: true });
        const user = res.data;
        setFormData({
          fullName: user.fullName || "",
          phoneNumber: user.phoneNumber || "",
          state: user.state || "",
          district: user.district || "",
          crops: user.crops?.join(", ") || "",
          age: user.age || "",
        });
      } catch (err) {
        console.error(err);
        setError("❌ Failed to load profile");
      }
    };
    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const payload = {
        ...formData,
        age: Number(formData.age), // convert age to number
        crops: formData.crops.split(",").map((c) => c.trim()).filter(Boolean),
      };

      await axios.patch(`${BASE_URL}/profile/edit`, payload, { withCredentials: true });

      setSuccessMessage("✅ Profile updated successfully!");
      toast.success("Profile updated successfully!");

      // Navigate after 3 seconds
      setTimeout(() => navigate("/myProfile"), 3000);

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "❌ Failed to update profile.");
      toast.error(err.response?.data?.message || "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-50 text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-green-50 pt-24 px-4 flex justify-center items-start pb-20">
        <div className="bg-white text-black rounded-3xl shadow-md max-w-3xl w-full p-10">
          <div className="text-center mb-6">
            <h2 className="text-4xl font-extrabold text-green-700">Edit Your Profile ✏️</h2>
            <p className="text-gray-600 text-sm mt-2">
              Make changes and save to update your info.
            </p>
            {successMessage && (
              <p className="mt-2 text-green-700 font-semibold">{successMessage}</p>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Full Name"
              className="w-full px-4 py-2 rounded border border-gray-300"
              required
            />

            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="Phone Number"
                className="flex-1 px-4 py-2 rounded border border-gray-300"
                required
              />
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                placeholder="State"
                className="flex-1 px-4 py-2 rounded border border-gray-300"
                required
              />
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleInputChange}
                placeholder="District"
                className="flex-1 px-4 py-2 rounded border border-gray-300"
                required
              />
              <input
                type="text"
                name="crops"
                value={formData.crops}
                onChange={handleInputChange}
                placeholder="Crops (comma separated)"
                className="flex-1 px-4 py-2 rounded border border-gray-300"
                required
              />
            </div>

            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              placeholder="Age"
              className="w-full px-4 py-2 rounded border border-gray-300"
              min={18}
              max={100}
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white font-bold py-3 rounded hover:bg-green-700"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
