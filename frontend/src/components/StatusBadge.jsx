export default function StatusBadge({ status }) {
  const isLost = status?.toLowerCase() === "lost";

  return (
    <span
      style={{
        backgroundColor: isLost ? "#5a293c" : "#1b4b4b",
        color: "#fff",
        fontSize: "11px",
        fontWeight: "600",
        padding: "3px 8px",
        borderRadius: "12px",
        textTransform: "uppercase",
      }}
    >
      {status}
    </span>
  );
}