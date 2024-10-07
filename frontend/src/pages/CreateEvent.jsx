import React, { useState } from "react";
import api from "../api/api"; // Assuming your axios instance is correctly configured
import { useNavigate } from "react-router-dom";

const CreateEvent = () => {
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    maxAttendees: "",
  });
  const [image, setImage] = useState(null); // For storing the selected image file
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handles the input fields change
  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  // Handles file change event
  const handleFileChange = (e) => {
    setImage(e.target.files[0]); // Store the selected file in the state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation for all fields
    if (
      !eventData.title ||
      !eventData.description ||
      !eventData.date ||
      !eventData.location ||
      !eventData.maxAttendees
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    // Create FormData to handle text inputs and image upload
    const formData = new FormData();
    formData.append("title", eventData.title);
    formData.append("description", eventData.description);
    formData.append("date", eventData.date);
    formData.append("location", eventData.location);
    formData.append("maxAttendees", eventData.maxAttendees);
    if (image) {
      formData.append("image", image); // Append the image file only if it exists
    }

    try {
      const response = await api.post("/events/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Ensure multipart data is set
        },
      });
      console.log("Event created successfully:", response.data);
      navigate("/my-events"); // Redirect to "My Events" page after creation
    } catch (error) {
      console.error("Error creating event:", error.response || error.message);
      setError(
        error.response?.data?.message ||
        "An error occurred while creating the event."
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 bg-opacity-80">
      <div className="w-full max-w-md p-8 mx-4 bg-white/20 backdrop-blur-lg rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Create Event
        </h2>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-4">
            <label className="block text-white font-semibold mb-1">
              Event Title
            </label>
            <input
              type="text"
              name="title"
              value={eventData.title}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white/70 text-black border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
              placeholder="Enter event title"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white font-semibold mb-1">
              Event Description
            </label>
            <textarea
              name="description"
              value={eventData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white/70 text-black border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
              placeholder="Enter event description"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white font-semibold mb-1">
              Event Date
            </label>
            <input
              type="date"
              name="date"
              value={eventData.date}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white/70 text-black border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white font-semibold mb-1">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={eventData.location}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white/70 text-black border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
              placeholder="Enter location"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white font-semibold mb-1">
              Max Seats
            </label>
            <input
              type="number"
              name="maxAttendees"
              value={eventData.maxAttendees}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white/70 text-black border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
              placeholder="Enter max attendees"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-white font-semibold mb-1">
              Event Image
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              className="w-full px-4 py-2 bg-white/70 text-black border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500"
              accept="image/*"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-transparent border border-white text-white font-semibold rounded-md hover:bg-gray-900 hover:bg-opacity-80 hover:text-white transition duration-300"
          >
            Create Event
          </button>

        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
