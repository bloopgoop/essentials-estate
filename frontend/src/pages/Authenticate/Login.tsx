import loginBackground from "assets/login-background.jpg";
import AuthContext from "context/AuthContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import "./Authenticate.css";

const Login = () => {
  let { loginUser } = useContext(AuthContext);

  return (
    <div id="authenticate">
      <div id="image-container">
        <img id="img" src={loginBackground} alt="background" />
      </div>

      <div className="auth-container">
        <h1>Sign In</h1>
        <p>Welcome back!</p>
        <form
          onSubmit={loginUser}
          name="login-form"
          id="login-form"
          className="auth-form"
        >
          <label htmlFor="flex">Username</label>
          <input
            type="text"
            placeholder="Username"
            name="username"
            id="flex"
            minLength={5}
            required
          />

          <label htmlFor="password">Enter your password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            id="password"
            minLength={6}
            required
          />

          <input type="submit" value="Login" />
        </form>
        <div className="footer">
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
          <p>
            Just browsing? <Link to="/">Continue as guest</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
