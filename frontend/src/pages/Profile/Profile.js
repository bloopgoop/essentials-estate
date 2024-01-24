import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import "./Profile.css";
import { Outlet } from "react-router-dom";

// Dashboard shows featured and recommended property listings
// Also shows your assets, recent activities, and property review status

export default function Profile() {
  return (
    <>
      <div style={{ display: "flex" }}>
        <Sidebar
          style={{
            display: "flex",
            position: "sticky",
            top: 0,
            maxHeight: "100%",
            overflowY: "auto",
          }}
        />
        <div style={{ width: "100%", minHeight: "100vh" }}>
          <Navbar />
          <div
            id="profile-content"
            style={{ width: "100%", paddingLeft: "2rem", paddingRight: "3rem" }}
          >
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </>
  );
}
