import { useEffect, useState } from "react";
import api from "../../services/api";
import ItemCard from "./ItemCard";
import SearchBar from "./SearchBar";
import CategoryFilter from "./CategoryFilter";


function LostItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchLostItems = async () => {
      try {
        const response = await api.get("/items");

        const lostItems = response.data.filter(
          (item) => item.type === "lost"
        );

        setItems(lostItems);
      } catch (err) {
        setError("Failed to load lost items.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    
    fetchLostItems();
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
    return <p>Loading lost items...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
  <div className="p-4">
    <h2 className="text-2xl font-bold mb-4">Lost Items</h2>

    <SearchBar
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
    />

    <CategoryFilter
      selectedCategory={selectedCategory}
      setSelectedCategory={setSelectedCategory}
    />

    {filteredItems.length === 0 ? (
      <p>No lost items found.</p>
    ) : (
      filteredItems.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))
    )}
  </div>
);
}

export default LostItems;