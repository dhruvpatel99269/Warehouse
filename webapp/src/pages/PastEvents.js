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
        <div className="w-full min-h-screen bg-blue-100 p-6">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">📩 Email Logs</h2>

            {/* 🔍 Search & Filter */}
            <div className="mb-4 flex flex-col md:flex-row gap-4">
                <input
                    type="text"
                    placeholder="Search by subject..."
                    className="px-4 py-2 border border-gray-300 rounded-md w-64"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                <select
                    className="px-4 py-2 border border-gray-300 rounded-md"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="All">All</option>
                    <option value="Fire">Fire</option>
                    <option value="PPE">PPE</option>
                    <option value="Fall">Fall</option>
                </select>

                <select
                    className="px-4 py-2 border border-gray-300 rounded-md"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                >
                    <option value="Recent">Recent</option>
                    <option value="Oldest">Oldest</option>
                </select>
            </div>

            {/* 📜 Email Log List */}
            {filteredLogs.length === 0 ? (
                <p className="text-gray-600 text-lg">No email logs found</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredLogs.map((log) => (
                        <div
                            key={log._id}
                            className="bg-white shadow-lg rounded-xl p-5 border border-gray-200 transition-transform transform hover:scale-105 relative"
                        >
                            <button
                                onClick={() => handleDelete(log._id)}
                                className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-sm"
                            >
                                ❌
                            </button>

                            <h3 className="text-xl font-semibold text-gray-700">{log.subject || "No Subject"}</h3>
                            <p className="text-sm text-gray-500"><strong>Recipient:</strong> {log.recipient || "N/A"}</p>
                            <p className="text-sm text-gray-500"><strong>Status:</strong> {log.status || "N/A"}</p>
                            <p className="text-xs text-gray-400">
                                📅 {log.timestamp_ist || "N/A"}
                            </p>

                            {log.attachment?.content && (
                                <div className="mt-4 p-3 border rounded-lg bg-gray-100">
                                    <p className="text-sm font-medium">📎 {log.attachment.filename}</p>
                                    <img
                                        src={`data:${log.attachment.filetype};base64,${log.attachment.content}`}
                                        alt={log.attachment.filename}
                                        className="mt-2 w-full h-32 object-cover rounded-lg"
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
