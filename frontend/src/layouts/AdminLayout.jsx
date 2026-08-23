import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-[#2C2D32] text-white">
      <AdminNavbar />

      <main className="mx-auto w-full max-w-[1200px] px-4 py-6 pb-10 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
}