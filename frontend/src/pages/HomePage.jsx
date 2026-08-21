import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { getItems } from "../services/itemService";
import ItemCard from "../components/ItemCard";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";

export default function HomePage() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  useEffect(() => {
    getItems()
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load items:", err);
        setLoading(false);
      });
  }, []);

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.location.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || item.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#2c2d32",
        color: "#fff",
        padding: "20px 16px 80px",
        maxWidth: "480px",
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: "22px", fontWeight: 600 }}>
            Hello, {user?.email?.split("@")[0] || "Moringa"}!
          </h1>
          <p style={{ margin: "4px 0 0", color: "#9ca3af", fontSize: "14px" }}>
            Find lost & found items
          </p>
        </div>
        <button
          onClick={() => dispatch(logout())}
          style={{
            background: "transparent",
            border: "1px solid #b62779",
            color: "#b62779",
            padding: "6px 12px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "13px",
          }}
        >
          Logout
        </button>
      </div>

      <SearchBar value={search} onChange={setSearch} />
      <CategoryFilter active={category} onChange={setCategory} />

      <h2 style={{ fontSize: "16px", margin: "0 0 12px", color: "#e5e7eb" }}>
        Recent Items
      </h2>

      {loading ? (
        <p style={{ color: "#9ca3af" }}>Loading items...</p>
      ) : filteredItems.length === 0 ? (
        <p style={{ color: "#9ca3af" }}>No items found.</p>
      ) : (
        filteredItems.map((item) => <ItemCard key={item.id} item={item} />)
      )}
    </div>
  );
}

