import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import "./Profile.css"
import Person from "../../assets/person.jpg"
import { Outlet } from "react-router-dom";


// Dashboard shows featured and recommended property listings
// Also shows your assets, recent activities, and property review status

export default function Profile() {
    return (
      <>
          <Sidebar />
          <div style={{ width: '100%', marginLeft: '2rem', marginRight: '3rem' }}>
            <Navbar />
            {console.log(<Outlet/>)}
            {<Outlet /> ? <Outlet />: <Index />}
            {console.log(<Outlet/>)}
          </div>
      </>
    );
  }

function Index(){
  return(
  <div id="profile-box">
    <img src={Person} height={260} width={260}/>
    <div className="items">
      <h1>First Last</h1>
      <p>Username:</p>
      <p>Email:</p>
      <p>Phone:</p>
      <p>DOB:</p>
    </div>
  </div>
  )
}