import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Navbar() {
  const { user } = useSelector((state) => state.auth);

  const username = user?.email?.split("@")[0] || "User";
  const initial = username.charAt(0).toUpperCase();

  return (
    <header className="border-b border-[#263437] bg-[#2C2D32] px-5 py-4 text-white shadow-md">
      <div className="mx-auto flex w-full max-w-[1100px] items-center justify-between">
        {/* Logo */}
        <Link
          to="/home"
          className="text-xl font-bold tracking-tight text-white transition hover:text-[#B62779]"
        >
          Lost & Found
        </Link>

        {/* User */}
        <Link
          to="/profile"
          className="flex items-center gap-3 rounded-xl px-2 py-1 transition hover:bg-[#263437]"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#B62779] text-sm font-bold text-white">
            {initial}
          </div>

          <div className="hidden text-right sm:block">
            <p className="text-sm font-medium text-white">
              {username}
            </p>

            <p className="text-xs text-gray-400">
              User
            </p>
          </div>
        </Link>
      </div>
    </header>
  );
}