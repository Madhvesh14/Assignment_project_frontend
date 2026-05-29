import { useState } from "react";

import API from "../services/api";

function Register() {

  const [fullName, setFullName] =
    useState("");

  const [emailId, setEmailId] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [roleId, setRoleId] =
    useState("2");

  const [message, setMessage] =
    useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response =
        await API.post(
          "/Auth/register",
          {
            fullName,
            emailId,
            password,
            roleId: parseInt(roleId)
          }
        );

      setMessage(response.data);

      setFullName("");
      setEmailId("");
      setPassword("");

    }
    catch (error) {

      console.log(error);

      setMessage(
        "Registration failed"
      );
    }
  };

  return (
    <div className="form-container">

      <h2>Register</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Enter full name"
          value={fullName}
          onChange={(e) =>
            setFullName(e.target.value)
          }
        />

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

        <select
          value={roleId}
          onChange={(e) =>
            setRoleId(e.target.value)
          }
        >

          <option value="1">
            Admin
          </option>

          <option value="2">
            User
          </option>

        </select>

        <button type="submit">
          Register
        </button>

      </form>

      <p>{message}</p>

    </div>
  );
}

export default Register;