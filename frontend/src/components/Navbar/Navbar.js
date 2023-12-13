import React, { useContext, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "context/AuthContext";
import "./Navbar.css";

function Navbar() {
  let { user, logoutUser } = useContext(AuthContext);
  const navbar = useRef();

  // Add scroll function on first load
  // Hide navbar on scroll down, show on scroll up
  useEffect(() => {
    var prevScrollpos = window.scrollY;
    window.onscroll = function () {
      var currentScrollPos = window.scrollY;
      if (prevScrollpos > currentScrollPos) {
        navbar.current.style.top = "0";
      } else {
        navbar.current.style.top = "-4rem";
      }
      prevScrollpos = currentScrollPos;
    };
  }, []);

  return (
    <nav id="navbar" ref={navbar}>
      <Link to="/" className="nav-btn">
        Home
      </Link>
      <Link to="/search" className="nav-btn">
        List your property!
      </Link>

      <div className="search-container">
        <div className="search-bar">
          <input type="text" placeholder="Search" />
          <button>Search</button>
        </div>
      </div>

      <Link to="/profile" className="nav-btn">
        Profile
      </Link>
      {user ? (
        <Link to={"/login"} onClick={logoutUser} className="nav-btn">
          Logout
        </Link>
      ) : (
        <Link to={"/login"} className="nav-btn">
          Login
        </Link>
      )}
    </nav>
  );
}

export default Navbar;
