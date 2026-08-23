import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";

export default function MainLayout() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#2c2d32",
      }}
    >
      <Navbar />

      <main
        style={{
          flex: 1,
          width: "100%",
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "20px",
          paddingBottom: "90px",
          boxSizing: "border-box",
        }}
      >
        <Outlet />
      </main>

      <BottomNav />
    </div>
  );
}