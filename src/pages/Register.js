import { useState } from "react";

import { useNavigate } from "react-router-dom";

import axios from "axios";

function Register() {
  const [fullName, setFullName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [roleId, setRoleId] = useState(2);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5226/api/auth/register",
        {
          fullName,
          emailId: email,
          password,
          roleId,
        }
      );

      alert(
        "Registration Successful"
      );

      navigate("/login");
    } catch (error) {
      alert("Registration Failed");
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
          required
        />

        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
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

        <select
          value={roleId}
          onChange={(e) =>
            setRoleId(
              Number(e.target.value)
            )
          }
        >
          <option value={1}>
            Admin
          </option>

          <option value={2}>
            User
          </option>
        </select>

        <button type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;