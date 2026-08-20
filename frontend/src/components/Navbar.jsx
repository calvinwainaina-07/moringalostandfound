import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="bg-[#2C2D32] text-white px-5 py-4 shadow-md">
      <div className="max-w-md mx-auto flex items-center justify-between">
        <Link to="/" className="text-lg font-bold">
          Lost & Found
        </Link>

        <div className="w-9 h-9 rounded-full bg-[#B62779] flex items-center justify-center font-semibold">
          U
        </div>
      </div>
    </header>
  );
}