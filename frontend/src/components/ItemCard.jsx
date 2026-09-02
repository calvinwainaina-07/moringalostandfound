import { Link } from "react-router-dom";
import StatusBadge from "./StatusBadge";

export default function ItemCard({ item }) {
  return (
    <Link
      to={`/items/${item.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div
        style={{
          backgroundColor: "#263437",
          borderRadius: "16px",
          overflow: "hidden",
          display: "flex",
          gap: "14px",
          padding: "12px",
          marginBottom: "12px",
          transition: "transform 0.15s ease",
        }}
      >
        {item.image_url ? (
          <img
            src={item.image_url}
            alt={item.title}
            style={{ width: "90px", height: "90px", objectFit: "cover", borderRadius: "12px", flexShrink: 0 }}
          />
        ) : (
          <div style={{ width: "90px", height: "90px", borderRadius: "12px", flexShrink: 0, display: "grid", placeItems: "center", backgroundColor: "#1b4b4b", color: "#9ca3af", fontSize: "12px" }}>
            No image
          </div>
        )}

        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <h3 style={{ margin: 0, fontSize: "16px", color: "#fff", fontWeight: 600 }}>
                {item.title}
              </h3>
              <StatusBadge status={item.item_type} />
            </div>

            <p style={{ margin: "4px 0 0", fontSize: "13px", color: "#9ca3af" }}>
               {item.location}
            </p>
            <p style={{ margin: "2px 0 0", fontSize: "12px", color: "#6b7280" }}>
               {new Date(item.created_at).toLocaleDateString()}
            </p>
          </div>

        </div>
      </div>
    </Link>
  );
}
