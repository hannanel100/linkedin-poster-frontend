import { Navigate, Outlet } from "react-router-dom";
import { useUserQuery } from "../hooks/useUserQuery";
const ProtectedRoutes = () => {
  const { user } = useUserQuery();

  return user?.id ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
