import { NavLink } from "react-router-dom";

export default function BottomNav() {
  const linkClass = ({ isActive }) =>
    `flex flex-1 flex-col items-center justify-center gap-1 py-2 text-xs font-medium transition ${
      isActive
        ? "text-[#B62779]"
        : "text-gray-500 hover:text-[#B62779]"
    }`;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#263437] bg-[#2C2D32] shadow-[0_-4px_15px_rgba(0,0,0,0.25)]">
      <div className="mx-auto flex w-full max-w-[1100px] px-3">
        <NavLink to="/home" className={linkClass}>
          <span className="text-sm">Home</span>
        </NavLink>

        <NavLink to="/report-lost" className={linkClass}>
          <span className="text-sm">Lost</span>
        </NavLink>

        <NavLink to="/report-found" className={linkClass}>
          <span className="text-sm">Found</span>
        </NavLink>

        <NavLink to="/profile" className={linkClass}>
          <span className="text-sm">Profile</span>
        </NavLink>
      </div>
    </nav>
  );
}