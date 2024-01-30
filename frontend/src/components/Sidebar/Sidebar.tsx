import { Link } from "react-router-dom";
import gear from "../../assets/gear.svg";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div id="sidebar">
      <h1>Profile</h1>
      <h2 id="logo">
        <Link to="/" style={{ textDecoration: "none" }}>
          ʕ•́ᴥ•̀ʔっ♡
        </Link>
      </h2>
      <nav>
        <ul>
          <div>
            {/* <li>
              <Link to="/profile">Profile</Link>
            </li> */}
            <li>
              <Link to="/profile/assets">Assets</Link>
            </li>
            <li>
              <Link to="/profile/watchlist">Watchlist</Link>
            </li>
            <li>
              <Link to="/profile/status">Status</Link>
            </li>
          </div>

          <div>
            <li>
              <Link to="/settings">
                <img src={gear} alt="Your SVG" />
                Settings
              </Link>
            </li>
            <li>
              <Link to="/logout">Log Out</Link>
            </li>
          </div>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
