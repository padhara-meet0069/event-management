import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import api from "../api/api";

const BASE_URL = "https://event-management-server-beta.vercel.app/"; // Adjust this as necessary

const MyEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyEvents = async () => {
      try {
        const response = await api.get("/events/my-events");
        setEvents(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error.response?.data || error.message);
        setError("Error fetching events");
        setLoading(false);
      }
    };
    fetchMyEvents();
  }, []);

  const handleDelete = async (eventId) => {
    try {
      if (window.confirm("Are you sure you want to delete this event?")) {
        await api.delete(`/events/${eventId}`);
        setEvents(events.filter((event) => event._id !== eventId));
        alert("Event deleted successfully");
      }
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Failed to delete event");
    }
  };

  const handleEdit = (eventId) => {
    navigate(`/edit-event/${eventId}`);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-100/70">
        {/* Loading Spinner */}
        <svg
          className="w-16 h-16 animate-spin text-gray-900/50"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
        >
          <path
            d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto py-8 bg-black">
      <h2 className="text-4xl font-bold mb-8 text-white">My Events</h2>
      {events.length === 0 ? (
        <p className="text-white">You have not created any events yet.</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {events.map((event) => (
            <li
              key={event._id}
              className="bg-white/10 backdrop-blur-md border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
            >
              {event.imageUrl && (
                <img
                  src={`${BASE_URL}${event.imageUrl}`}
                  alt={event.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              )}
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-white mb-2">
                  {event.title}
                </h2>
                <p className="text-gray-400 mb-2">
                  <span className="font-medium">Date: </span>
                  {new Date(event.date).toLocaleDateString()}
                </p>
                <p className="text-gray-400 mb-4">
                  <span className="font-medium">Location: </span>
                  {event.location}
                </p>
                <p className="text-white font-semibold mb-4">
                  Enrolled Users For this Event:
                </p>
                {event.attendees.length > 0 ? (
                  <ul className="text-gray-400 list-disc list-inside">
                    {event.attendees.map((attendee) => (
                      <li key={attendee._id}>{attendee.username}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No users have RSVPed yet.</p>
                )}
                <div className="flex justify-between mt-6">
                  <button
                    onClick={() => handleEdit(event._id)}
                    className="flex items-center justify-center border text-white border-blue-500 px-4 py-2 rounded-md hover:bg-blue-500 hover:text-white transition duration-300"
                  >
                    <FaEdit /> 
                  </button>
                  <button
                    onClick={() => handleDelete(event._id)}
                    className="flex items-center justify-center border text-white border-red-500 px-4 py-2 rounded-md hover:bg-red-500 hover:text-white transition duration-300"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyEvents;
