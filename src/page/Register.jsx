import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userRegisterThunk } from "../redux/reducers/User";

function Register() {
  const initialData = {
    email: "",
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    phone: "",
  };

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({ ...initialData });

  const handleInputChange = (event) => {
    const { value } = event.target;
    const inputName = event.target.name;

    if (inputName === "firstname")
      setFormData({ ...formData, firstname: value });
    else if (inputName === "lastname")
      setFormData({ ...formData, lastname: value });
    else if (inputName === "email") setFormData({ ...formData, email: value });
    else if (inputName === "username")
      setFormData({ ...formData, username: value });
    else if (inputName === "password")
      setFormData({ ...formData, password: value });
    else if (inputName === "phone") setFormData({ ...formData, phone: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
    const obj = {
      email: formData.email,
      username: formData.username,
      password: formData.password,
      phone: formData.phone,
      address: null,
      name: { firstname: formData.firstname, lastname: formData.lastname },
    };
    await dispatch(userRegisterThunk(obj));
  };

  return (
    <div style={{ width: "50%", margin: "auto" }}>
      <h2>Register</h2>
      <div className="form-group">
        <label htmlFor="firstname">First name</label>
        <br />
        <input
          type="text"
          name="firstname"
          className="form-control"
          placeholder="Enter your first name"
          value={formData.firstname}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="lastname">Last name</label>
        <br />
        <input
          type="text"
          name="lastname"
          className="form-control"
          placeholder="Enter your last name"
          value={formData.lastname}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <br />
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          className="form-control"
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <br />
        <input
          type="text"
          name="username"
          className="form-control"
          placeholder="Enter a username"
          value={formData.username}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <br />
        <input
          type="password"
          name="password"
          className="form-control"
          placeholder="Choose a password"
          value={formData.password}
          onChange={handleInputChange}
        />
      </div>
      <div className="form-group">
        <label htmlFor="phone">Contact number</label>
        <br />
        <input
          type="text"
          name="phone"
          placeholder="Enter your contact number"
          className="form-control"
          value={formData.phone}
          onChange={handleInputChange}
        />
      </div>
      <br />
      <button
        className="btn btn-success btn-md"
        onClick={handleRegister}
        type="button"
      >
        Register
      </button>
      <div>
        <Link to="/login">Login if you are an existing user</Link>
      </div>
    </div>
  );
}

export default Register;
