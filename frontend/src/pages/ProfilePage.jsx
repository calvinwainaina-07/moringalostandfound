import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../features/auth/authSlice";

export default function ProfilePage() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const username = user?.email?.split("@")[0] || "Moringa User";
  const initial = username.charAt(0).toUpperCase();

  return (
    <div
      style={{
        minHeight: "100vh",
        maxWidth: "480px",
        margin: "0 auto",
        padding: "24px 16px 90px",
        backgroundColor: "#2c2d32",
        color: "#fff",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", marginBottom: 30 }}>
        <button
          onClick={() => navigate("/")}
          style={{
            background: "transparent",
            border: "none",
            color: "#fff",
            fontSize: 20,
            cursor: "pointer",
            marginRight: 12,
          }}
        >
          ←
        </button>

        <h1 style={{ margin: 0, fontSize: 24 }}>My Profile</h1>
      </div>

      {/* Profile Card */}
      <div
        style={{
          backgroundColor: "#263437",
          borderRadius: 20,
          padding: 24,
          textAlign: "center",
          marginBottom: 20,
        }}
      >
        <div
          style={{
            width: 90,
            height: 90,
            borderRadius: "50%",
            backgroundColor: "#b62779",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 36,
            fontWeight: "bold",
            margin: "0 auto 16px",
          }}
        >
          {initial}
        </div>

        <h2 style={{ margin: "0 0 6px" }}>{username}</h2>

        <p style={{ margin: 0, color: "#cbd5e1", fontSize: 14 }}>
          {user?.email}
        </p>
      </div>

      {/* Account Information */}
      <div
        style={{
          backgroundColor: "#263437",
          borderRadius: 20,
          padding: 20,
          marginBottom: 24,
        }}
      >
        <h3 style={{ marginTop: 0, marginBottom: 18 }}>Account Information</h3>

        <div style={{ marginBottom: 16 }}>
          <p style={{ color: "#9ca3af", fontSize: 13, margin: "0 0 4px" }}>
            Username
          </p>
          <p style={{ margin: 0 }}>{username}</p>
        </div>

        <div style={{ marginBottom: 16 }}>
          <p style={{ color: "#9ca3af", fontSize: 13, margin: "0 0 4px" }}>
            Email
          </p>
          <p style={{ margin: 0 }}>{user?.email}</p>
        </div>

        <div>
          <p style={{ color: "#9ca3af", fontSize: 13, margin: "0 0 4px" }}>
            Status
          </p>
          <p style={{ margin: 0, color: "#4ade80" }}>Active</p>
        </div>
      </div>

      {/* Logout Button */}
      <button
        onClick={() => dispatch(logout())}
        style={{
          width: "100%",
          padding: "14px",
          backgroundColor: "#b62779",
          color: "#fff",
          border: "none",
          borderRadius: 12,
          fontSize: 16,
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        Logout
      </button>
    </div>
  );
}