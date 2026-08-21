const categories = ["All", "Electronics", "Bags", "Keys", "Others"];

export default function CategoryFilter({ active, onChange }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "8px",
        overflowX: "auto",
        paddingBottom: "8px",
        marginBottom: "20px",
      }}
    >
      {categories.map((cat) => {
        const isActive = active === cat;
        return (
          <button
            key={cat}
            onClick={() => onChange(cat)}
            style={{
              padding: "8px 16px",
              borderRadius: "20px",
              border: "none",
              backgroundColor: isActive ? "#b62779" : "#263437",
              color: isActive ? "#fff" : "#9ca3af",
              fontSize: "13px",
              fontWeight: 500,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            {cat}
          </button>
        );
      })}
    </div>
  );
}