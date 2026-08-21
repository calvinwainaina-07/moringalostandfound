import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getItemById } from "../services/itemService";
import StatusBadge from "../components/StatusBadge";

export default function ItemDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getItemById(id)
      .then((data) => {
        setItem(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", background: "#2c2d32", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
        Loading...
      </div>
    );
  }

  if (!item) {
    return (
      <div style={{ minHeight: "100vh", background: "#2c2d32", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
        Item not found
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#2c2d32",
        color: "#fff",
        padding: "20px 16px 40px",
        maxWidth: "480px",
        margin: "0 auto",
      }}
    >
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        style={{
          background: "none",
          border: "none",
          color: "#fff",
          fontSize: "18px",
          marginBottom: "16px",
          cursor: "pointer",
        }}
      >
        ← Back
      </button>

      {/* Image */}
      <img
        src={item.image}
        alt={item.name}
        style={{
          width: "100%",
          height: "260px",
          objectFit: "cover",
          borderRadius: "16px",
          marginBottom: "20px",
        }}
      />

      {/* Title + Badge */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
        <h1 style={{ margin: 0, fontSize: "24px", fontWeight: 600 }}>{item.name}</h1>
        <StatusBadge status={item.status} />
      </div>

      {/* Location & Date */}
      <p style={{ margin: "0 0 6px", color: "#9ca3af", fontSize: "14px" }}>
        {item.location}
      </p>
      <p style={{ margin: "0 0 16px", color: "#6b7280", fontSize: "13px" }}>
        {item.date}
      </p>

      {/* Description */}
      <p style={{ margin: "0 0 20px", lineHeight: 1.5, color: "#e5e7eb" }}>
        {item.description}
      </p>

      {/* Reward */}
      {item.reward && (
        <p style={{ margin: "0 0 28px", fontSize: "18px", fontWeight: 600, color: "#b62779" }}>
          Reward: {item.reward}
        </p>
      )}

      {/* Action Button */}
      <button
        onClick={() => alert("Claim / Found action will be connected later")}
        style={{
          width: "100%",
          padding: "14px",
          backgroundColor: "#b62779",
          color: "#fff",
          border: "none",
          borderRadius: "12px",
          fontSize: "16px",
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        {item.status === "Lost" ? "I Found This Item" : "This is Mine"}
      </button>
    </div>
  );
}