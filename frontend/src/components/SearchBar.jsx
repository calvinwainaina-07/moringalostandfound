export default function SearchBar({ value, onChange }) {
  return (
    <div style={{ position: "relative", marginBottom: "16px" }}>
      <input
        type="text"
        placeholder="Search for lost & found items..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          padding: "12px 16px 12px 42px",
          backgroundColor: "#263437",
          border: "1px solid #374151",
          borderRadius: "12px",
          color: "#fff",
          fontSize: "14px",
          outline: "none",
          boxSizing: "border-box",
        }}
      />
      <span
        style={{
          position: "absolute",
          left: "14px",
          top: "50%",
          transform: "translateY(-50%)",
          color: "#9ca3af",
          fontSize: "16px",
        }}
      >
        🔍
      </span>
    </div>
  );
}