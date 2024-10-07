import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Register = () => {
  const { register } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(username, email, password);
      navigate("/");
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <div className="bg-white bg-opacity-30 backdrop-blur-md p-8 shadow-lg rounded-lg max-w-md w-full">
        {/* Title */}
        <h1 className="text-center text-2xl font-semibold text-white mb-6">
          Register
        </h1>

        {/* Error Message */}
        {errorMessage && (
          <p className="text-red-500 text-center mb-4">{errorMessage}</p>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-300 font-semibold mb-2"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Username"
              className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-black bg-white bg-opacity-70 placeholder-gray-400"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-300 font-semibold mb-2"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-black bg-white bg-opacity-70 placeholder-gray-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-300 font-semibold mb-2"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 text-black bg-white bg-opacity-70 placeholder-gray-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-teal-800 text-white px-4 py-2 rounded font-semibold hover:bg-teal-700"
          >
            Register
          </button>
        </form>

        {/* Sign In Link */}
        <div className="text-center mt-6">
          <span className="text-gray-500">Already have an account?</span>{" "}
          <Link
            to="/login"
            className="text-[#dc363c] font-semibold hover:underline"
          >
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
