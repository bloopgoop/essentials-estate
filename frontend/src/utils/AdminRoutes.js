import { useContext, useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import AuthContext from "context/AuthContext";
import axios from "services/axiosConfigs";

const AdminRoutes = ({ request }) => {
  let { user } = useContext(AuthContext);
  const [isAdmin, setIsAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const formData = new FormData();
      formData.append("username", user.username);
      formData.append("user_id", user.user_id);

      const request = axios.post("property/checkGroup/admin", formData);
      request.then((response) => {
        setIsAdmin(response.data.group === "admin");
        setLoading(false);
      });
    } catch (error) {
      console.log(`ERROR: ${error}`);
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  } else {
    return isAdmin ? <Outlet /> : <Navigate to="/" />;
  }
};

export default AdminRoutes;
