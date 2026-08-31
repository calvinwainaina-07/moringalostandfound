import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";

export default function AdminNavbar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const username =
    user?.name || user?.email?.split("@")[0] || "Admin";

  const initial = username.charAt(0).toUpperCase();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login", { replace: true });
  };

  return (
    <header className="border-b border-[#263437] bg-[#1B4B4B] shadow-md">
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <div>
          <h1 className="text-xl font-bold text-white">
            Lost & Found
          </h1>

          <p className="mt-1 text-xs text-gray-300">
            Administration Panel
          </p>
        </div>

        {/* Admin information */}
        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-sm font-semibold text-white">
              {username}
            </p>

            <p className="text-xs text-[#B62779]">
              Administrator
            </p>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#B62779] text-sm font-bold text-white">
            {initial}
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg border border-[#B62779] px-3 py-2 text-xs font-medium text-white transition hover:bg-[#B62779]"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}