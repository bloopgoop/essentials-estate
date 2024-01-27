import "./Profilemain.css";
import Loading from "components/Loading";
import axios from "services/axiosConfigs";
import { useEffect, useState } from "react";

export default function Profilemain() {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState("");

  useEffect(() => {
    const request = axios.get(`property/user`);
    request
      .then((response) => {
        setUserData(response.data.user_data);
        const originalDate = new Date(response.data.user_data.date_joined);
        const formattedDate = new Intl.DateTimeFormat("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }).format(originalDate);
        setDate(formattedDate);
        setLoading(false);
      })
      .catch((error) => {
        alert(`Error fetching properties: ${error}`);
      });
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div id="profile-box">
          <img src={""} height={200} width={200} alt="profile" />
          <div className="profile-items">
            <h1>{`${userData.first_name} ${userData.last_name}`}</h1>
            <p>Joined On: {date}</p>
            {/* <p>Lives In New York</p> */}
          </div>
        </div>
      )}
      {/* <div>
        <div className="description-box">
          <h1>Description:</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In blandit
            risus nisi, non viverra odio gravida ac. Vivamus malesuada at nulla
            eget varius. Sed congue nisl ut viverra blandit. Sed imperdiet sit
            amet eros elementum lacinia. Donec at justo nec elit viverra
            efficitur. Sed lacinia, mi in commodo commodo, velit neque porta
            massa, at fermentum erat ligula eu dolor. Aenean sit amet
            condimentum dolor, sit amet accumsan lorem.
          </p>
        </div>
      </div> */}

      {/* <div className="notification-box">
        <h1 className="notification-title">Notification:</h1>
        <Notification name="Sam" time="10 mins ago" />
        <Notification name="John" time="25 mins ago" />
        <Notification name="Ryan" time="2 days ago" />
      </div> */}
    </>
  );
}
