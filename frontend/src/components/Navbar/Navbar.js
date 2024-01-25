import React, { useContext, useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "context/AuthContext";
import "./Navbar.css";
import axios from "services/axiosConfigs";

function Navbar() {
  const [isSuper, setIsSuper] = useState(false);
  let { user, logoutUser } = useContext(AuthContext);
  const navbar = useRef();

  // Add scroll function on first load
  // Hide navbar on scroll down, show on scroll up
  useEffect(() => {
    const request = axios.get("property/checkGroup/admin");
    request.then((response) => setIsSuper(response.data.isSuper));

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
      <div id="nav-left">
        <Link to="/" className="nav-btn">
          <h3 id="nav-logo">Essentials Estate</h3>
        </Link>
        <Link to="/add-property" className="nav-btn">
          List your property!
        </Link>
        {isSuper ? (
          <Link to="/review" className="nav-btn">
            Review
          </Link>
        ) : (
          <></>
        )}
      </div>

      <div id="nav-right">
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
      </div>
    </nav>
  );
}

export default Navbar;
