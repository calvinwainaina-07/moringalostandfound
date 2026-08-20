import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function ProtectedRoute() {
  const { accessToken } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!accessToken) {
    // remembers where the user was headed so you could redirect back post-login
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}