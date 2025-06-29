import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const JoinButton = ({ eventId, userEmail, initialJoined }) => {
  const [joined, setJoined] = useState(initialJoined);
  const [loading, setLoading] = useState(false);

  const handleJoin = async () => {
    if (joined) return;

    try {
      setLoading(true);
      const res = await axios.patch(`http://localhost:5000/events/${eventId}`, {
        email: userEmail,
      });

      if (res.data.message === "Successfully joined the event") {
        setJoined(true);
        window.location.reload();
        Swal.fire({
          icon: "success",
          title: "You have joined!",
          text: "Successfully joined the event.",
          confirmButtonColor: "#3085d6",
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.response?.data?.message || "Failed to join event.",
        confirmButtonColor: "#d33",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleJoin}
      disabled={joined || loading}
      className={`px-4 py-2 rounded font-semibold transition-all duration-200 ${
        joined
          ? "bg-gray-400 text-white cursor-not-allowed"
          : "bg-green-600 hover:bg-green-700 text-white"
      }`}
    >
      {joined ? "Already Joined" : loading ? "Joining..." : "Join Event"}
    </button>
  );
};

export default JoinButton;
