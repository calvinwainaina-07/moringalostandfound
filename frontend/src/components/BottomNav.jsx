import { Link, useLocation } from "react-router-dom";

export default function BottomNav() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
      <div className="max-w-md mx-auto flex justify-around py-3">
        <Link
          to="/"
          className={isActive("/") ? "text-[#B62779]" : "text-gray-500"}
        >
          Home
        </Link>

        <Link
          to="/report-lost"
          className={isActive("/report-lost") ? "text-[#B62779]" : "text-gray-500"}
        >
          Lost
        </Link>

        <Link
          to="/report-found"
          className={isActive("/report-found") ? "text-[#B62779]" : "text-gray-500"}
        >
          Found
        </Link>

        <Link
          to="/dashboard"
          className={isActive("/dashboard") ? "text-[#B62779]" : "text-gray-500"}
        >
          Profile
        </Link>
      </div>
    </nav>
  );
}