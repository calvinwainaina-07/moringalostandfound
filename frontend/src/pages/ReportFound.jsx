import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { createItem } from "../services/itemService";

export default function ReportFound() {
  const navigate = useNavigate();
  const location = useLocation();

  const lostItem = location.state?.lostItem;

  const [form, setForm] = useState({
    name: lostItem?.title || "",
    category: lostItem?.category || "",
    location: "",
    date: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const foundItem = {
        title: form.name.trim(),
        category: form.category,
        location: form.location.trim(),
        description: form.description.trim(),
        item_type: "found",
      };

      await createItem(foundItem);

      navigate("/home", { replace: true });
    } catch (err) {
      console.error("Failed to report found item:", err);

      setError(
        "Unable to submit the report. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#2C2D32] px-4 py-6 pb-24 text-white">
      <div className="mx-auto w-full max-w-lg">

        {/* Back */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-5 text-sm font-medium text-gray-400 transition hover:text-white"
        >
          Back
        </button>

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">
            Report Found Item
          </h1>

          <p className="mt-2 text-sm leading-6 text-gray-400">
            Tell us where you found this item and provide
            any additional information that can help the admin
            return it to its owner.
          </p>
        </div>

        {/* Linked item notice */}
        {lostItem && (
          <div className="mb-5 rounded-xl border border-[#1B4B4B] bg-[#1B4B4B]/60 p-4">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Reporting this lost item
            </p>

            <p className="mt-1 text-base font-bold text-white">
              {lostItem.title}
            </p>

            <p className="mt-1 text-xs text-gray-400">
              Originally reported lost at{" "}
              {lostItem.location || "an unknown location"}
            </p>
          </div>
        )}

        {/* Form */}
        <div className="rounded-2xl border border-[#263437] bg-[#263437] p-5 shadow-lg sm:p-6">

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            {/* Item Name */}
            <div>
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
                required
                disabled={loading || !!lostItem}
                className="w-full rounded-xl border border-[#374151] bg-[#2C2D32] px-4 py-3 text-sm text-white outline-none transition placeholder:text-gray-500 focus:border-[#B62779] focus:ring-2 focus:ring-[#B62779]/30 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>

            {/* Category */}
            <div>
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
                required
                disabled={loading || !!lostItem}
                className="w-full rounded-xl border border-[#374151] bg-[#2C2D32] px-4 py-3 text-sm text-white outline-none transition focus:border-[#B62779] focus:ring-2 focus:ring-[#B62779]/30 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <option value="">
                  Select category
                </option>

                <option value="Electronics">
                  Electronics
                </option>

                <option value="Bags">
                  Bags
                </option>

                <option value="Clothing">
                  Clothing
                </option>

                <option value="Keys">
                  Keys
                </option>

                <option value="Documents">
                  Documents
                </option>

                <option value="Accessories">
                  Accessories
                </option>

                <option value="Others">
                  Others
                </option>
              </select>
            </div>

            {/* Found Location */}
            <div>
              <label
                htmlFor="location"
                className="mb-2 block text-sm font-medium text-gray-200"
              >
                Where did you find it?
              </label>

              <input
                id="location"
                name="location"
                type="text"
                value={form.location}
                onChange={handleChange}
                placeholder="e.g. Computer Lab"
                required
                disabled={loading}
                className="w-full rounded-xl border border-[#374151] bg-[#2C2D32] px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition focus:border-[#B62779] focus:ring-2 focus:ring-[#B62779]/30 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>

            {/* Date */}
            <div>
              <label
                htmlFor="date"
                className="mb-2 block text-sm font-medium text-gray-200"
              >
                Date Found
              </label>

              <input
                id="date"
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full rounded-xl border border-[#374151] bg-[#2C2D32] px-4 py-3 text-sm text-white outline-none transition focus:border-[#B62779] focus:ring-2 focus:ring-[#B62779]/30 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>

            {/* Additional Description */}
            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-medium text-gray-200"
              >
                Additional Information
              </label>

              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={5}
                placeholder="Where exactly did you find it? Is there anything else the admin should know?"
                required
                disabled={loading}
                className="w-full resize-none rounded-xl border border-[#374151] bg-[#2C2D32] px-4 py-3 text-sm text-white placeholder-gray-500 outline-none transition focus:border-[#B62779] focus:ring-2 focus:ring-[#B62779]/30 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>

            {/* Information */}
            <div className="rounded-xl border border-[#1B4B4B] bg-[#1B4B4B]/60 p-4">
              <p className="text-sm font-medium text-white">
                What happens next?
              </p>

              <p className="mt-2 text-xs leading-5 text-gray-300">
                Your report will be sent to the admin. The admin
                can verify the item and help return it to the
                person who reported it lost.
              </p>
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-xl border border-[#5A293C] bg-[#5A293C]/50 p-4 text-sm text-pink-200">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#B62779] px-4 py-3.5 text-sm font-bold text-white transition hover:bg-[#5A293C] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading
                ? "Submitting Report..."
                : "Submit Found Report"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}
