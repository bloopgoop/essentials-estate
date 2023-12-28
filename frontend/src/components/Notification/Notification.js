import React from 'react'
import "./Notification.css"
import Person from "../../assets/person.jpg"

function Notification() {
  return (
    <div style={{ width: '100%' }}>        
        <div className="notification">
            <img src={Person} height={100} width={100} alt="profile" className="notification-img"/>
            <div>
            <h3>
                Sam rated your property 
            </h3>
            <p>
                10 mins ago
            </p>
            </div>
        </div>
    </div>
  )
}

export default Notification