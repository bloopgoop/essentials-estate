import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer"
import "./Profile.css"
import { Outlet } from "react-router-dom";


// Dashboard shows featured and recommended property listings
// Also shows your assets, recent activities, and property review status

export default function Profile() {
    return (
      <>
        <div style={{ display: 'flex', height: '100vh'}}>
        <Sidebar style={{ display: 'flex', position: 'sticky', top: 0, maxHeight: '100%', overflowY: 'auto' }} />
          <div id="profile-content" style={{ width: '100%', marginLeft: '2rem', marginRight: '3rem' }}>
            <Navbar />
            <Outlet></Outlet>
          </div>
        </div>
        <Footer/>
      </>
    );
}
