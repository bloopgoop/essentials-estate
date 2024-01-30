import registerBackground from "assets/register-background.jpg";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "services/axiosConfigs.js";
import "./Authenticate.css";
/*
not finished
change <form> to router dom's form.
add client side checking
also style error messages
add check box saying 'agree to terms and conditions'
add icons to the input bars to the right
*/
interface RegisterForm {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password: string;
  verify_password: string;
}

export default function Register() {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");
  const [registerForm, setRegisterForm] = useState<RegisterForm>({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
    verify_password: "",
  });

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setRegisterForm({ ...registerForm, [event.target.name]: event.target.value });

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (registerForm.password !== registerForm.verify_password) {
      setErrorMessage("Passwords do not match");
    } else {
      console.log(registerForm);
    }
    axios.post("/api/register/", registerForm).then((res) => {
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
        <img id="img" src={registerBackground} alt="background" />
      </div>

      <div className="auth-container">
        <h1>Sign Up</h1>
        <p>Create Your Account</p>
        <form
          onSubmit={handleFormSubmit}
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
            value={registerForm.first_name}
            onChange={handleFormChange}
            required
          />

          <label htmlFor="last_name">Last Name</label>
          <input
            type="text"
            placeholder="Last Name"
            name="last_name"
            id="last_name"
            value={registerForm.first_name}
            onChange={handleFormChange}
            required
          />

          <label htmlFor="username">Username</label>
          <input
            type="text"
            placeholder="Username"
            name="username"
            id="username"
            value={registerForm.username}
            onChange={handleFormChange}
            minLength={6}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            id="email"
            value={registerForm.email}
            onChange={handleFormChange}
            required
          />

          <label htmlFor="password">Create a password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            id="password"
            value={registerForm.password}
            onChange={handleFormChange}
            minLength={6}
            required
          />

          <label htmlFor="verify_password">Confirm your password</label>
          <input
            type="password"
            placeholder="Confirm Password"
            name="verify_password"
            id="verify_password"
            value={registerForm.verify_password}
            onChange={handleFormChange}
            minLength={6}
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

