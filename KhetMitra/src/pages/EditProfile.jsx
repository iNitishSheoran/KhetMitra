import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { BASE_URL } from "../config";
import { FaUser, FaPhoneAlt, FaLeaf, FaMapMarkerAlt } from "react-icons/fa";

export default function EditProfile() {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    state: "",
    district: "",
    crops: "",
    age: "",
  });
  const [originalData, setOriginalData] = useState({});
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  // ✅ Fetch profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/profile/view`, {
          withCredentials: true,
        });
        const user = res.data;

        const mappedData = {
          fullName: user.fullName || "",
          phoneNumber: user.phoneNumber || "",
          state: user.state || "",
          district: user.district || "",
          crops: Array.isArray(user.crops) ? user.crops.join(", ") : "",
          age: user.age || "",
        };

        setFormData(mappedData);
        setOriginalData(mappedData);

        if (user.photoUrl) setPreview(user.photoUrl);
      } catch (err) {
        console.error(err);
        setError("❌ Failed to load profile");
      }
    };

    fetchProfile();
  }, []);

  // ✅ Input handler
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ File handler
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // ✅ Submit handler (only send changed fields + photo)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const data = new FormData();

      // Append only changed fields
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== originalData[key]) {
          if (key === "crops") {
            data.append(
              "crops",
              value
                .split(",")
                .map((c) => c.trim())
                .filter(Boolean)
            );
          } else {
            data.append(key, value);
          }
        }
      });

      // Append photo only if selected
      if (profilePhoto) {
        data.append("profilePhoto", profilePhoto);
      }

      if ([...data.keys()].length === 0) {
        toast("⚠️ No changes to update");
        setLoading(false);
        return;
      }

      await axios.patch(`${BASE_URL}/profile/edit`, data, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccessMessage("✅ Profile updated successfully!");
      toast.success("Profile updated successfully!");

      setTimeout(() => navigate("/myProfile"), 2500);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "❌ Failed to update profile.");
      toast.error(err.response?.data?.message || "Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Error screen
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-amber-100 text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-amber-100 via-green-100 to-sky-100 pt-24 px-4 flex justify-center items-start pb-20">
        <div className="bg-white/40 backdrop-blur-lg text-green-900 rounded-3xl shadow-2xl max-w-3xl w-full p-10 border border-white/50">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-extrabold bg-gradient-to-r from-green-600 to-amber-600 bg-clip-text text-transparent">
              Edit Your Profile ✏️
            </h2>
            <p className="text-green-700 text-sm mt-2">
              Update your details and save changes.
            </p>
            {successMessage && (
              <p className="mt-3 text-green-700 font-semibold">{successMessage}</p>
            )}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Photo Upload */}
            <div className="flex flex-col items-center">
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-24 h-24 rounded-full object-cover border-4 border-green-300 mb-3"
                />
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="text-sm text-green-700"
              />
            </div>

            {/* Full Name */}
            <InputField
              icon={<FaUser />}
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Full Name"
              required
            />

            {/* Phone + State */}
            <div className="flex flex-col md:flex-row gap-4">
              <InputField
                icon={<FaPhoneAlt />}
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                placeholder="Phone Number"
                required
              />
              <InputField
                icon={<FaMapMarkerAlt />}
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                placeholder="State"
                required
              />
            </div>

            {/* District + Crops */}
            <div className="flex flex-col md:flex-row gap-4">
              <InputField
                icon={<FaMapMarkerAlt />}
                type="text"
                name="district"
                value={formData.district}
                onChange={handleInputChange}
                placeholder="District"
                required
              />
              <InputField
                icon={<FaLeaf />}
                type="text"
                name="crops"
                value={formData.crops}
                onChange={handleInputChange}
                placeholder="Crops (comma separated)"
              />
            </div>

            {/* Age */}
            <InputField
              icon={<FaUser />}
              type="number"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              placeholder="Age"
              min={18}
              max={100}
              required
            />

            {/* Save Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-500 to-green-700 hover:from-green-600 hover:to-green-800 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              {loading ? "Saving..." : "💾 Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

/* ✅ Reusable Input Component */
function InputField({ icon, ...props }) {
  return (
    <div className="relative flex items-center border border-green-300 rounded-xl p-3 bg-white/50 backdrop-blur-md focus-within:ring-2 focus-within:ring-green-500 transition shadow-sm hover:shadow-md">
      <span className="text-green-600 mr-3 text-lg">{icon}</span>
      <input
        {...props}
        className="w-full outline-none bg-transparent placeholder-green-600 text-green-900"
      />
    </div>
  );
}
