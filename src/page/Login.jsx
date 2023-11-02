import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLoginThunk } from "../redux/reducers/User";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleChange = (e) => {
    let value = e.target.value;
    let inputname = e.target.name;

    if (inputname === "username") {
      setUsername(value);
    } else {
      setPassword(value);
    }
  };

  const handleLogin = async () => {
    await dispatch(
      userLoginThunk({
        username: username,
        password: password,
      })
    );
  };

  return (
    <div style={{ width: "40%", margin: "auto", padding: "50px" }}>
      <h2>Login</h2>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <br></br>
        <input
          type="text"
          name="username"
          placeholder="Enter your username"
          className="form-control"
          onChange={handleChange}
          value={username}
        />
      </div>
      <br></br>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <br></br>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          className="form-control"
          onChange={handleChange}
          value={password}
        />
      </div>
      <br></br>
      <button className="btn btn-danger btn-md" onClick={handleLogin}>
        Login
      </button>
      <div>
        <Link to="/register">Register if you are a new user</Link>
      </div>
    </div>
  );
}

export default Login;
