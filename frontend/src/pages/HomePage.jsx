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
    const fetchItems = async () => {
      try {
        const data = await getItems();
        setItems(data);
      } catch (err) {
        console.error("Failed to load items:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.name?.toLowerCase().includes(search.toLowerCase()) ||
      item.location?.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || item.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#2C2D32] px-4 py-6 pb-24 text-white">
      <div className="mx-auto w-full max-w-2xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Hello, {user?.email?.split("@")[0] || "Moringa"}!
            </h1>

            <p className="mt-1 text-sm text-gray-400">
              Find lost & found items
            </p>
          </div>

          <button
            onClick={() => dispatch(logout())}
            className="rounded-lg border border-[#B62779] px-3 py-2 text-sm font-medium text-[#B62779] transition hover:bg-[#B62779] hover:text-white"
          >
            Logout
          </button>
        </div>

        {/* Search */}
        <div className="mb-4">
          <SearchBar value={search} onChange={setSearch} />
        </div>

        {/* Category Filter */}
        <CategoryFilter
          active={category}
          onChange={setCategory}
        />

        {/* Section Header */}
        <div className="mb-4 mt-6">
          <h2 className="text-lg font-semibold text-gray-100">
            Recent Items
          </h2>

          <p className="mt-1 text-sm text-gray-400">
            Recently reported lost and found items
          </p>
        </div>

        {/* Items */}
        {loading ? (
          <div className="rounded-xl border border-[#263437] bg-[#263437] p-6 text-center">
            <p className="text-sm text-gray-400">
              Loading items...
            </p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="rounded-xl border border-[#263437] bg-[#263437] p-6 text-center">
            <p className="text-sm text-gray-400">
              No items found.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}