import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import "./Profile.css"
import { Outlet } from "react-router-dom";


// Dashboard shows featured and recommended property listings
// Also shows your assets, recent activities, and property review status

export default function Profile() {
    return (
      <>
          <Sidebar />
          <div style={{ width: '100%', marginLeft: '2rem', marginRight: '3rem' }}>
            <Navbar />
            <Outlet></Outlet>
          </div>
      </>
    );
}