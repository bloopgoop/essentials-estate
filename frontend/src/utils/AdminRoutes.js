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
      const request = axios.get("property/checkGroup/admin");
      request.then((response) => {
        setIsAdmin(response.data.isSuper);
        setLoading(false);
      });
    } catch (error) {
      console.log(`ERROR: ${error}`);
      setLoading(false);
    }
  }, [user.username, user.user_id]);

  if (loading) {
    return <p>Loading...</p>;
  } else {
    return isAdmin ? <Outlet /> : <Navigate to="/" />;
  }
};

export default AdminRoutes;
