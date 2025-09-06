import React, { useEffect, useState } from "react";
import { BASE_URL } from "../config";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";
import { MdHelpOutline } from "react-icons/md";

export default function MyRequests() {
  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/help/myRequests`, {
        withCredentials: true,
      });
      setRequests(res.data);
    } catch (err) {
      console.error(err);
      showMessage(err.response?.data?.error || "❌ Failed to load your requests");
    }
  };

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000); // auto clear after 3s
  };

  const deleteRequest = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/help/delete/${id}`, {
        withCredentials: true,
      });
      setRequests(requests.filter((r) => r._id !== id));
      showMessage("❌ Help request deleted");
    } catch (err) {
      console.error(err);
      showMessage(err.response?.data || "❌ Cannot delete request");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 py-12 px-4">
      {/* Top Spacing for Navbar */}
      <div className="h-16"></div>

      {/* Page Title */}
      <h2 className="text-4xl font-extrabold text-center text-green-700 mb-10 drop-shadow-sm">
        🌱 My Help Requests
      </h2>

      {/* Success/Error Message */}
      {message && (
        <div className="max-w-md mx-auto mb-6 p-3 text-center text-green-800 bg-green-100 border border-green-300 rounded-lg shadow-sm">
          {message}
        </div>
      )}

      {/* Requests List */}
      {requests.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No requests found</p>
      ) : (
        <div className="space-y-8 max-w-4xl mx-auto">
          {requests.map((req) => (
            <div
              key={req._id}
              className="bg-white shadow-lg rounded-2xl p-6 border border-green-200 hover:shadow-xl transition-all duration-300"
            >
              {/* Request Title */}
              <div className="flex items-center gap-3 mb-4">
                <MdHelpOutline className="text-green-600 text-2xl" />
                <h3 className="text-xl font-semibold text-green-800">
                  {req.help}
                </h3>
              </div>

              {/* Request Status */}
              <p className="text-gray-700 mb-2">
                <span className="font-semibold">Status:</span>{" "}
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium shadow-sm ${
                    req.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : req.status === "in-progress"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {req.status}
                </span>
              </p>

              {/* Submitted Date */}
              <p className="text-gray-500 text-sm">
                📅 Submitted on:{" "}
                {new Date(req.createdAt).toLocaleString("en-IN", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </p>

              {/* Delete Button */}
              <div className="flex justify-end mt-6">
                <button
                  onClick={() => setConfirmDeleteId(req._id)}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-2 rounded-lg shadow-md transition-all"
                >
                  <FaTrashAlt /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmDeleteId && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Are you sure?
            </h3>
            <p className="text-gray-600 mb-6">
              This action cannot be undone. Do you really want to delete this
              help request?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteRequest(confirmDeleteId);
                  setConfirmDeleteId(null);
                }}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
