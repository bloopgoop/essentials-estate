import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import AuthContext from "context/AuthContext";

const AdminRoutes = () => {
  let { user } = useContext(AuthContext);
  return user.is_staff ? <Outlet /> : <Navigate to="/" />;
};

export default AdminRoutes;
