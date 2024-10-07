import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  HiOutlineCalendar,
  HiOutlineLocationMarker,
  HiOutlineClock,
} from "react-icons/hi"; // Icons for date, location, time
import api from "../api/api"; // Ensure api is configured correctly

const EventDetails = () => {
  const { id } = useParams(); // Extract the event ID from the URL
  const [event, setEvent] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [rsvpStatus, setRsvpStatus] = useState(null); // Track RSVP status
  const [userHasRSVPd, setUserHasRSVPd] = useState(false); // Track if the user has already RSVPed

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await api.get(`/events/${id}`);
        setEvent(response.data);
        setUserHasRSVPd(response.data.attendees.includes("your_user_id")); // Check if the user has already RSVPed
        setLoading(false);
      } catch (err) {
        console.error(err.response?.data || err.message);
        setError("Error fetching event details");
        setLoading(false);
      }
    };

    fetchEventDetails();
  }, [id]);

  // RSVP to the event
  const handleRSVP = async () => {
    try {
      const response = await api.post(`/events/${id}/rsvp`);
      setEvent(response.data.event); // Update the event with the new RSVP
      setUserHasRSVPd(true); // Mark that the user has RSVPed
      setRsvpStatus("Event Enrolled Successfully...!"); // Show success message
    } catch (error) {
      console.error("RSVP failed:", error.response?.data || error.message);
      setRsvpStatus(
        error.response?.data?.message || "Error RSVPing to the event."
      );
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-100/70">
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
          <path
            d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-900"
          ></path>
        </svg>
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!event) {
    return <p>No event details found.</p>;
  }

  const formattedDate = new Date(event.date).toLocaleDateString();
  const formattedTime = new Date(event.date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });


  return (
    <div className="container mx-auto py-8 bg-black">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Event Image */}
        {event.imageUrl && (
          <div className="lg:w-1/2">
            <img
              src={`https://event-management-server-beta.vercel.app/${event.imageUrl}`}
              alt={event.title}
              className="w-full h-64 lg:h-80 object-cover rounded-lg shadow-md"
            />
          </div>
        )}

        {/* Event Info */}
        <div className="lg:w-1/2 bg-black bg-opacity-30 backdrop-blur-md p-6 rounded-lg">
          <div className="mb-6">
            <h2 className="text-4xl font-bold text-white mb-4">{event.title}</h2>
            <div className="flex items-center gap-4 text-gray-400">
              <HiOutlineCalendar className="w-6 h-6 text-white" />
              <span className="text-white">{formattedDate}</span>
              <HiOutlineClock className="w-6 h-6 text-white" />
              <span className="text-white">{formattedTime}</span>
            </div>
          </div>

          {/* Location */}
          <div className="mb-6">
            <div className="flex items-center text-gray-400 gap-4">
              <HiOutlineLocationMarker className="w-6 h-6 text-white" />
              <span className="text-white">{event.location}</span>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-white mb-2">About this event</h3>
            <p className="text-gray-300">{event.description}</p>
          </div>

          {/* RSVP Button */}
          <div>
            {!userHasRSVPd && event.attendees.length < event.maxAttendees ? (
              <button
                className="border border-gray-400 text-orange-500 font-bold px-6 py-3 rounded-md hover:bg-orange-500 hover:text-white w-full lg:w-auto"
                onClick={handleRSVP}
              >
                Reserve a spot
              </button>
            ) : (
              <p className="text-gray-400">
                {userHasRSVPd
                  ? "You have already booked this event."
                  : "This event is fully booked."}
              </p>
            )}

            {/* Show RSVP status message */}
            {rsvpStatus && <p className="text-green-500 mt-4">{rsvpStatus}</p>}
          </div>
        </div>
      </div>

      {/* Event Meta Info */}
      <div className="mt-8 bg-black bg-opacity-30 backdrop-blur-md p-6 rounded-lg">
        <h3 className="text-xl font-semibold text-white mb-2">Event Details</h3>
        <div className="flex items-center gap-4 text-gray-400">
          <HiOutlineClock className="w-6 h-6 text-white" />
          <p className="text-white">
            {formattedTime} | {event.maxAttendees} total seats
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
