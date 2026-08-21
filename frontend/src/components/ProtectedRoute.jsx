import { Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  // Temporary bypass so we can test the Home page
  return <Outlet />;
}