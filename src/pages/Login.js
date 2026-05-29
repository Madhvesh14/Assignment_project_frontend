import { useState } from "react";

import { useNavigate } from "react-router-dom";

import API from "../services/api";

function Login() {

  const [emailId, setEmailId] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [message, setMessage] =
    useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response =
        await API.post(
          "/Auth/login",
          {
            emailId,
            password
          }
        );

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "role",
        response.data.role
      );

      setMessage(
        "Login successful"
      );

      navigate("/events");

    }
    catch (error) {

      console.log(error);

      setMessage(
        "Invalid credentials"
      );
    }
  };

  return (
    <div className="form-container">

      <h2>Login</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="email"
          placeholder="Enter email"
          value={emailId}
          onChange={(e) =>
            setEmailId(e.target.value)
          }
          required
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          required
        />

        <button type="submit">
          Login
        </button>

      </form>

      <p>{message}</p>

    </div>
  );
}

export default Login;