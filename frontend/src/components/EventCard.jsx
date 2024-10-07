import React from "react";
import { useNavigate } from "react-router-dom";
import { HiCalendar, HiUserGroup, HiBadgeCheck } from "react-icons/hi"; // React Icons

// Base URL for the backend
const BASE_URL = "https://event-management-server-beta.vercel.app/"; // Ensure this matches your backend's URL

const EventCard = ({
  id,
  title,
  date,
  location,
  imageUrl,
  attendeesCount,
  isFree,
}) => {
  const navigate = useNavigate();
  const fullImageUrl = `${BASE_URL}${imageUrl}`;
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const handleViewDetails = () => {
    if (id) {
      navigate(`/event/${id}`);
    } else {
      console.error(
        "Event ID is undefined. Check if the ID is passed correctly."
      );
    }
  };

  return (
    <div className="relative bg-white/30 backdrop-blur-lg border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out p-4 overflow-hidden">
      {imageUrl && (
        <img
          src={fullImageUrl}
          alt={title}
          className="w-full h-40 object-cover rounded-t-lg mb-4"
        />
      )}
      <div className="p-2">
        <h2 className="text-lg font-bold text-white drop-shadow-md mb-2 truncate">
          {title}
        </h2>
        <p className="text-sm text-gray-200 mb-4">
          Hosted by:{" "}
          <span className="font-medium">
            Chennai Tisax Automotive Cybersecurity Meetup Group
          </span>
        </p>

        <div className="flex items-center text-gray-200 text-sm mb-4">
          <HiCalendar className="mr-2 text-gray-300" />
          <p>
            {formattedDate} - {location}
          </p>
        </div>

        <div className="flex justify-between items-center text-gray-200 text-sm">
          <div className="flex items-center">
            <HiUserGroup className="mr-1" />
            <p>{attendeesCount} going</p>
          </div>
          <div className="flex items-center">
            {isFree ? (
              <HiBadgeCheck className="text-green-500 mr-1" />
            ) : (
              <HiBadgeCheck className="text-red-500 mr-1" />
            )}
            <p>{isFree ? "Free" : "Paid"}</p>
          </div>
        </div>

        <button
          className="w-full bg-gray-50/30 border border-gray-400 text-white py-2 mt-4 rounded-md hover:bg-gray-100/50 hover:text-gray-900 transition-colors duration-300"
          onClick={handleViewDetails}
        >
          See more about Event
        </button>
      </div>
    </div>
  );
};

export default EventCard;
