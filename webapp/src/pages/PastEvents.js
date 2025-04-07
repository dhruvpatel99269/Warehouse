import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const EmailLogs = () => {
  const [emailLogs, setEmailLogs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("Recent");

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = () => {
    axios
      .get("http://localhost:5000/email-logs")
      .then((response) => {
        setEmailLogs(Array.isArray(response.data.email_logs) ? response.data.email_logs : []);
      })
      .catch((error) => console.error("Error fetching email logs:", error));
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this email log?")) return;

    try {
      await axios.delete(`http://localhost:5000/email-logs/${id}`);
      toast.success("Log deleted successfully");
      fetchLogs();
    } catch (err) {
      toast.error("Failed to delete log");
    }
  };

  const filteredLogs = emailLogs
    .filter((log) =>
      selectedCategory === "All" ? true : log.subject?.toLowerCase().includes(selectedCategory.toLowerCase())
    )
    .filter((log) =>
      log.subject?.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === "Recent"
        ? new Date(b.timestamp_utc) - new Date(a.timestamp_utc)
        : new Date(a.timestamp_utc) - new Date(b.timestamp_utc)
    );

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 px-6 py-10">
      <h2 className="text-4xl font-bold mb-8 text-white text-center drop-shadow-sm">
        📬 Email Logs Dashboard
      </h2>

      {/* 🔍 Search & Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-10">
        <input
          type="text"
          placeholder="Search by subject..."
          className="px-4 py-2 rounded-lg w-72 border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 shadow-sm"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <select
          className="px-4 py-2 rounded-lg border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Fire">Fire</option>
          <option value="PPE">PPE</option>
          <option value="Fall">Fall</option>
        </select>
        <select
          className="px-4 py-2 rounded-lg border-2 border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="Recent">Recent</option>
          <option value="Oldest">Oldest</option>
        </select>
      </div>

      {/* 📜 Logs Display */}
      {filteredLogs.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No email logs found 🕵️‍♂️</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredLogs.map((log) => (
            <div
              key={log._id}
              className="relative bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-transform transform hover:-translate-y-1"
            >
              <button
                onClick={() => handleDelete(log._id)}
                className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition-colors text-sm"
                title="Delete log"
              >
                ❌
              </button>

              <h3 className="text-xl font-semibold text-gray-800 mb-1">{log.subject || "No Subject"}</h3>          
              <p className="text-md text-gray-500 mt-2">
                🕒 {log.timestamp_ist || "N/A"}
              </p>

              {log.attachment?.content && (
                <div className="mt-4 p-3 bg-gray-100 rounded-xl border">
                  <p className="text-sm font-medium text-gray-700">
                    📎 {log.attachment.filename}
                  </p>
                  <img
                    src={`data:${log.attachment.filetype};base64,${log.attachment.content}`}
                    alt={log.attachment.filename}
                    className="mt-3 w-full h-32 object-cover rounded-lg"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmailLogs;
