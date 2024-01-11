import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Authenticate.css";
import img from "./register-background.jpg";
import axios from "services/axiosConfigs.js";
/*
not finished
change <form> to router dom's form.
add client side checking
also style error messages
add check box saying 'agree to terms and conditions'
add icons to the input bars to the right
*/

const Register = () => {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
    verify_password: "",
  });

  const { name, email, password, verify_password, username } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== verify_password) {
      setErrorMessage("Passwords do not match");
    } else {
      console.log(formData);
    }
    axios.post("/api/register/", formData).then((res) => {
      if (res.status === 201) {
        alert("Registered successfully");
        navigate("/login");
      } else {
        console.log(res);
        alert("Error registering");
      }
    });
  };

  return (
    <div id="authenticate">
      <div id="image-container">
        <img id="img" src={img} alt="background" />
      </div>

      <div className="auth-container">
        <h1>Sign Up</h1>
        <p>Create Your Account</p>
        <form
          onSubmit={(e) => onSubmit(e)}
          name="register-form"
          id="register-form"
          className="auth-form"
        >
          <label htmlFor="first_name">First Name</label>
          <input
            type="text"
            placeholder="First Name"
            name="first_name"
            id="first_name"
            value={name}
            onChange={(e) => onChange(e)}
            required
          />

          <label htmlFor="last_name">Last Name</label>
          <input
            type="text"
            placeholder="Last Name"
            name="last_name"
            id="last_name"
            value={name}
            onChange={(e) => onChange(e)}
            required
          />

          <label htmlFor="username">Username</label>
          <input
            type="text"
            placeholder="Username"
            name="username"
            id="username"
            value={username}
            onChange={(e) => onChange(e)}
            minLength="6"
            required
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            id="email"
            value={email}
            onChange={(e) => onChange(e)}
            required
          />

          <label htmlFor="password">Create a password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => onChange(e)}
            minLength="6"
            required
          />

          <label htmlFor="verify_password">Confirm your password</label>
          <input
            type="password"
            placeholder="Confirm Password"
            name="verify_password"
            id="verify_password"
            value={verify_password}
            onChange={(e) => onChange(e)}
            minLength="6"
            required
          />
          <input type="submit" value="Register" />

          {errorMessage && <p className="error">{errorMessage}</p>}
        </form>
        <div className="footer">
          <p>
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
          <p>
            Just browsing? <Link to="/">Continue as guest</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
