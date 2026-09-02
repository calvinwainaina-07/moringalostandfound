import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createItem } from "../services/itemService";

export default function ReportLost() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    category: "Others",
    location: "",
    description: "",
    reward: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim()) {
      setError("Please enter the item name.");
      return;
    }

    if (!form.location.trim()) {
      setError("Please enter where you lost the item.");
      return;
    }

    if (!form.description.trim()) {
      setError("Please describe the item.");
      return;
    }

    try {
      setLoading(true);

      const newItem = {
        title: form.name.trim(),
        category: form.category,
        location: form.location.trim(),
        description: form.description.trim(),
        image_url: form.image.trim() || null,
        item_type: "lost",
      };

      await createItem(newItem);

      navigate("/home", { replace: true });
    } catch (err) {
      console.error("Failed to report lost item:", err);
      setError("Could not submit your lost item. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#2C2D32] px-4 py-6 pb-24 text-white">
      <div className="mx-auto w-full max-w-2xl">
        {/* Back Button */}
        <button
          type="button"
          onClick={() => navigate("/home")}
          className="mb-6 text-sm font-medium text-gray-300 transition hover:text-white"
        >
          ← Back to Home
        </button>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-white">
            Report Lost Item
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            Tell us about the item you lost so other users can help find it.
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 rounded-xl border border-[#B62779] bg-[#5A293C]/60 px-4 py-3 text-sm text-pink-100">
            {error}
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-[#263437] bg-[#263437] p-5 shadow-lg sm:p-6"
        >
          {/* Item Name */}
          <div className="mb-5">
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-gray-200"
            >
              Item Name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Black Dell Backpack"
              disabled={loading}
              className="w-full rounded-xl border border-[#1B4B4B] bg-[#1B4B4B] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-400 focus:border-[#B62779] focus:ring-2 focus:ring-[#B62779]/30 disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>

          {/* Category */}
          <div className="mb-5">
            <label
              htmlFor="category"
              className="mb-2 block text-sm font-medium text-gray-200"
            >
              Category
            </label>

            <select
              id="category"
              name="category"
              value={form.category}
              onChange={handleChange}
              disabled={loading}
              className="w-full rounded-xl border border-[#1B4B4B] bg-[#1B4B4B] px-4 py-3 text-sm text-white outline-none transition focus:border-[#B62779] focus:ring-2 focus:ring-[#B62779]/30 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <option value="Bags">Bags</option>
              <option value="Electronics">Electronics</option>
              <option value="Clothing">Clothing</option>
              <option value="Keys">Keys</option>
              <option value="Documents">Documents</option>
              <option value="Accessories">Accessories</option>
              <option value="Others">Others</option>
            </select>
          </div>

          {/* Location */}
          <div className="mb-5">
            <label
              htmlFor="location"
              className="mb-2 block text-sm font-medium text-gray-200"
            >
              Where did you lose it?
            </label>

            <input
              id="location"
              name="location"
              type="text"
              value={form.location}
              onChange={handleChange}
              placeholder="e.g. Room 301"
              disabled={loading}
              className="w-full rounded-xl border border-[#1B4B4B] bg-[#1B4B4B] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-400 focus:border-[#B62779] focus:ring-2 focus:ring-[#B62779]/30 disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>

          {/* Description */}
          <div className="mb-5">
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-medium text-gray-200"
            >
              Description
            </label>

            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Describe the item and include identifying details..."
              rows={5}
              disabled={loading}
              className="w-full resize-y rounded-xl border border-[#1B4B4B] bg-[#1B4B4B] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-400 focus:border-[#B62779] focus:ring-2 focus:ring-[#B62779]/30 disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>

          {/* Reward */}
          <div className="mb-5">
            <label
              htmlFor="reward"
              className="mb-2 block text-sm font-medium text-gray-200"
            >
              Reward
              <span className="ml-1 text-xs text-gray-400">
                (Optional)
              </span>
            </label>

            <input
              id="reward"
              name="reward"
              type="text"
              value={form.reward}
              onChange={handleChange}
              placeholder="e.g. KSh 500"
              disabled={loading}
              className="w-full rounded-xl border border-[#1B4B4B] bg-[#1B4B4B] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-400 focus:border-[#B62779] focus:ring-2 focus:ring-[#B62779]/30 disabled:cursor-not-allowed disabled:opacity-60"
            />
          </div>

          {/* Image URL */}
          <div className="mb-6">
            <label
              htmlFor="image"
              className="mb-2 block text-sm font-medium text-gray-200"
            >
              Image URL
              <span className="ml-1 text-xs text-gray-400">
                (Optional)
              </span>
            </label>

            <input
              id="image"
              name="image"
              type="url"
              value={form.image}
              onChange={handleChange}
              placeholder="Paste an image URL"
              disabled={loading}
              className="w-full rounded-xl border border-[#1B4B4B] bg-[#1B4B4B] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-400 focus:border-[#B62779] focus:ring-2 focus:ring-[#B62779]/30 disabled:cursor-not-allowed disabled:opacity-60"
            />

            <p className="mt-2 text-xs text-gray-400">
              You can leave this blank if you don't have an image.
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#B62779] px-4 py-3 font-bold text-white shadow-lg transition hover:bg-[#5A293C] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Report Lost Item"}
          </button>
        </form>
      </div>
    </div>
  );
}
