import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ allowedRole }) {
  const { user, accessToken } = useSelector((state) => state.auth);

  // Not logged in
  if (!accessToken || !user) {
    return <Navigate to="/login" replace />;
  }

  // Role restriction
  if (allowedRole && user.role !== allowedRole) {
    if (user.role === "admin") {
      return <Navigate to="/admin" replace />;
    }

    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
}