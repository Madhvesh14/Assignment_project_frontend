import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import {loginUser}from "../services/authService";

import { Link } from "react-router-dom";

function Login() {

  const [emailId, setEmailId] =
    useState("");

  const [password, setPassword] =
    useState("");

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

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "role",
        response.data.role
      );

      toast.success(
        response.data.message
      );

      navigate("/events");

    }
    catch (error) {

      console.log(error);

      toast.error(
        error.response?.data ||
        "Invalid email or password"
      );
    }
  };

  return (
    <div className="form-container">

      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
          <div className= "form-group">
            <label>Email:</label>


            <input
              type="email"
              placeholder="Enter email"
              value={emailId}
              onChange={(e) =>
                setEmailId(e.target.value)
              }
              required
            />

          </div>

          <div className= "form-group">
            <label>Password:</label>  

            <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />
          </div>

        <button type="submit">
          Login
        </button>

        <p className= "register-link">
          Don't have an account?{" "}
          <Link to= "/register">
            Register
          </Link>
        </p>

        




      </form>

    </div>
  );
}

export default Login;