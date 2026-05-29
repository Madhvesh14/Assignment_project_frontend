import { useState } from "react";

import API from "../services/api";

function Login() {

  const [emailId, setEmailId] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [message, setMessage] =
    useState("");

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
        />

        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
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