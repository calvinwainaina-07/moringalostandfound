import { useEffect, useState } from "react";
import api from "../../services/api";
import ItemCard from "../lostItems/ItemCard";
import SearchBar from "../lostItems/SearchBar";
import CategoryFilter from "../lostItems/CategoryFilter";

function FoundItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchFoundItems = async () => {
      try {
        const response = await api.get("/items");

        const foundItems = response.data.filter(
          (item) => item.type === "found"
        );

        setItems(foundItems);
      } catch (err) {
        setError("Failed to load found items.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFoundItems();
  }, []);

  const filteredItems = items.filter((item) => {
    const query = searchTerm.toLowerCase();

    const matchesSearch =
      item.title.toLowerCase().includes(query) ||
      item.category.toLowerCase().includes(query) ||
      item.location.toLowerCase().includes(query);

    const matchesCategory =
      selectedCategory === "All" ||
      item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return <p>Loading found items...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Found Items</h2>

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <CategoryFilter
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {filteredItems.length === 0 ? (
        <p>No found items found.</p>
      ) : (
        filteredItems.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))
      )}
    </div>
  );
}

export default FoundItems;