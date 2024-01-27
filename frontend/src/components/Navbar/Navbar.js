import React, { useContext, useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthContext from "context/AuthContext";
import "./Navbar.css";
import axios from "services/axiosConfigs";

function Navbar() {
  const [isSuper, setIsSuper] = useState(false);
  let { user, logoutUser } = useContext(AuthContext);
  const navbar = useRef();

  useEffect(() => {
    const request = axios.get("property/checkGroup/admin");
    request.then((response) => setIsSuper(response.data.isSuper));
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
        <Link to="/profile/assets" className="nav-btn">
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
