import { useState } from "react";

import { useNavigate, Link } from "react-router-dom";

import { toast } from "react-toastify";

import {loginUser}from "../services/authService";


function Login() {

  const [emailId, setEmailId] = useState("");

  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await loginUser(
          {
            emailId,
            password
          }
        );

      localStorage.setItem("token", response.data.token);

      localStorage.setItem("role", response.data.role);

      toast.success(response.data.message);

      navigate("/events");

    }
    catch (error) {

      console.log(error);

      toast.error(
        error.response?.data || "Invalid email or password"
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-8">
          Login
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-5">
            <label className="mb-2 text-2xl font-semibold text-gray-700">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter email"
              value={emailId}
              onChange={(e) => setEmailId(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              required
            />
          </div>

          <div className="flex flex-col mb-5">
            <label className="mb-2 text-2xl font-semibold text-gray-700">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-md font-semibold hover:bg-gray-800 transition duration-300"
          >
            Login
          </button>

          <p className="text-center mt-5 text-sm">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;