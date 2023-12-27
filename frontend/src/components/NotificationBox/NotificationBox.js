import React from 'react'
import "./NotificationBox.css"
import Person from "../../assets/person.jpg"

function NotificationBox() {
  return (
    <div style={{ width: '100%' }}>        
        <div className="notification">
            <img src={Person} height={100} width={100} alt="profile" className="notification-img"/>
            <div>
            <h3>
                Sam rated your property 
            </h3>
            <h3>
                10 mins
            </h3>
            </div>
        </div>
    </div>
  )
}

export default NotificationBox