import Person from "../../assets/person.jpg"
import "./Profilemain.css"
import NotificationBox from "../../components/NotificationBox/NotificationBox"

export default function Profilemain(){
    return(
    <>
      <div id="profile-box">
        <img src={Person} height={260} width={260} alt="profile"/>
        <div className="profile-items">
          <h1>John Smith</h1>

          <p>Created By: 01/01/2023</p>
          <p>Lives In New York</p>
        </div>
      </div>
      
      <div>
        <div className="description-box">
          <h1>Description:</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In blandit risus nisi, 
            non viverra odio gravida ac. Vivamus malesuada at nulla eget varius. Sed congue
            nisl ut viverra blandit. Sed imperdiet sit amet eros elementum lacinia. Donec 
            at justo nec elit viverra efficitur. Sed lacinia, mi in commodo commodo, velit 
            neque porta massa, at fermentum erat ligula eu dolor. Aenean sit amet condimentum 
            dolor, sit amet accumsan lorem.
          </p>
        </div>
      </div>

      <div className="notification-box">
        <h1 className="notification-title">Notification:</h1>
        <NotificationBox/>
        <NotificationBox/>
        <NotificationBox/>
      </div> 
    </>
)}

