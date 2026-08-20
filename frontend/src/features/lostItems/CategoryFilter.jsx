function CategoryFilter({ selectedCategory, setSelectedCategory }) {
  const categories = [
    "All",
    "Bags",
    "Electronics",
    "Documents",
    "Clothing",
    "Other",
  ];

  return (
    <div className="flex gap-2 overflow-x-auto mb-4">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setSelectedCategory(category)}
          className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
            selectedCategory === category
              ? "bg-[#b62779] text-white"
              : "bg-white border border-gray-300 text-gray-700"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;