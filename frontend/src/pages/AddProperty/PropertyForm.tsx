import Navbar from "../../components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

// Dashboard shows featured and recommended property listings
// Also shows your assets, recent activities, and property review status

export default function PropertyForm() {
  return (
    <>
      <div style={{ display: "flex" }}>
        <div style={{ width: "100%", minHeight: "100vh", minWidth: "820px" }}>
          <Navbar />
          <div
            id="profile-content"
            style={{ paddingLeft: "2rem", paddingRight: "3rem" }}
          >
            <Outlet></Outlet>
          </div>
          <div style={{ height: "3rem" }}></div>
        </div>
      </div>
    </>
  );
}
