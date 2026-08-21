import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ReportLost() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    category: "",
    location: "",
    date: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Report submitted! (UI only for now – will connect to Flask later)");
    navigate("/");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#2c2d32",
        color: "#fff",
        padding: "20px 16px",
        maxWidth: "480px",
        margin: "0 auto",
      }}
    >
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

      <h1 style={{ fontSize: "22px", marginBottom: "24px" }}>Report Lost Item</h1>

      {/* Photo Upload Placeholder */}
      <div
        style={{
          backgroundColor: "#263437",
          border: "2px dashed #4b5563",
          borderRadius: "16px",
          height: "140px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "20px",
          color: "#9ca3af",
        }}
      >
        <span style={{ fontSize: "28px" }}>☁️</span>
        <p style={{ margin: "8px 0 0", fontSize: "14px" }}>Upload photos</p>
        <p style={{ margin: 0, fontSize: "12px" }}>Tap to upload</p>
      </div>

      <form onSubmit={handleSubmit}>
        {[
          { name: "name", label: "Item Name", type: "text" },
          { name: "location", label: "Location", type: "text" },
          { name: "date", label: "Date Lost", type: "date" },
        ].map((field) => (
          <div key={field.name} style={{ marginBottom: "14px" }}>
            <label style={{ display: "block", fontSize: "13px", marginBottom: "6px", color: "#9ca3af" }}>
              {field.label}
            </label>
            <input
              type={field.type}
              name={field.name}
              value={form[field.name]}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "#263437",
                border: "1px solid #374151",
                borderRadius: "10px",
                color: "#fff",
                fontSize: "14px",
                boxSizing: "border-box",
              }}
            />
          </div>
        ))}

        <div style={{ marginBottom: "14px" }}>
          <label style={{ display: "block", fontSize: "13px", marginBottom: "6px", color: "#9ca3af" }}>
            Category
          </label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            required
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#263437",
              border: "1px solid #374151",
              borderRadius: "10px",
              color: "#fff",
              fontSize: "14px",
            }}
          >
            <option value="">Select category</option>
            <option value="Electronics">Electronics</option>
            <option value="Bags">Bags</option>
            <option value="Keys">Keys</option>
            <option value="Others">Others</option>
          </select>
        </div>

        <div style={{ marginBottom: "24px" }}>
          <label style={{ display: "block", fontSize: "13px", marginBottom: "6px", color: "#9ca3af" }}>
            Description
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={3}
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#263437",
              border: "1px solid #374151",
              borderRadius: "10px",
              color: "#fff",
              fontSize: "14px",
              boxSizing: "border-box",
              resize: "vertical",
            }}
          />
        </div>

        <button
          type="submit"
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
          Submit Report
        </button>
      </form>
    </div>
  );
}