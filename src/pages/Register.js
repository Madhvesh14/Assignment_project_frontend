import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { registerUser } from "../services/authService";

import { toast } from "react-toastify";

function Register() {

  const [fullName, setFullName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [roleId, setRoleId] = useState(2);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await registerUser(
        {
          fullName,
          emailId: email,
          password,
          roleId,
        }
      );

      toast.success(response.data);

      navigate("/login");

    }
    catch (error) {

      console.log(error);

      toast.error(
        error.response?.data || "Registration Failed"
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-8">
          Register
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col mb-5">
            <label className="mb-2 text-2xl font-semibold text-gray-700">
              Full Name
            </label>

            <input
              type="text"
              placeholder="Enter full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              required
            />
          </div>

          <div className="flex flex-col mb-5">
            <label className="mb-2 text-2xl font-semibold text-gray-700">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

          <div className="flex flex-col mb-6">
            <label className="mb-2 text-2xl font-semibold text-gray-700">
              Role
            </label>

            <select
              value={roleId}
              onChange={(e) => setRoleId(Number(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            >
              <option value={1}>Admin</option>
              <option value={2}>User</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-md font-semibold hover:bg-gray-800 transition duration-300"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;