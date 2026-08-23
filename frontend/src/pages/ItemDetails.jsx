import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getItemById } from "../services/itemService";

export default function ItemDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchItem = async () => {
      try {
        setLoading(true);

        const data = await getItemById(id);
        setItem(data);
      } catch (err) {
        console.error("Failed to load item:", err);
        setError("Could not load this item.");
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const handleFoundItem = () => {
    navigate("/report-found", {
      state: {
        lostItem: item,
      },
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#2C2D32] px-4 py-8 text-white">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-gray-400">Loading item...</p>
        </div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="min-h-screen bg-[#2C2D32] px-4 py-8 text-white">
        <div className="mx-auto max-w-2xl">
          <button
            type="button"
            onClick={() => navigate("/home")}
            className="mb-6 text-sm font-medium text-gray-400 hover:text-white"
          >
            Back to Home
          </button>

          <div className="rounded-2xl border border-[#263437] bg-[#263437] p-6 text-center">
            <p className="text-gray-400">
              {error || "Item not found."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#2C2D32] px-4 py-6 pb-24 text-white">
      <div className="mx-auto w-full max-w-2xl">

        {/* Back */}
        <button
          type="button"
          onClick={() => navigate("/home")}
          className="mb-6 text-sm font-medium text-gray-400 transition hover:text-white"
        >
          Back to Home
        </button>

        {/* Image */}
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="h-64 w-full rounded-2xl object-cover"
          />
        ) : (
          <div className="flex h-64 w-full items-center justify-center rounded-2xl bg-[#1B4B4B]">
            <p className="text-sm text-gray-400">
              No image available
            </p>
          </div>
        )}

        {/* Details */}
        <div className="mt-5 rounded-2xl border border-[#263437] bg-[#263437] p-6 shadow-lg">

          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white">
                {item.name}
              </h1>

              <p className="mt-1 text-sm text-gray-400">
                {item.category}
              </p>
            </div>

            <span className="rounded-full bg-[#5A293C] px-3 py-1 text-xs font-semibold text-white">
              Lost
            </span>
          </div>

          {/* Description */}
          <div className="mb-5">
            <h2 className="mb-2 text-sm font-semibold text-gray-200">
              Description
            </h2>

            <p className="text-sm leading-6 text-gray-400">
              {item.description || "No description provided."}
            </p>
          </div>

          {/* Location */}
          <div className="mb-5">
            <h2 className="mb-2 text-sm font-semibold text-gray-200">
              Last Seen
            </h2>

            <p className="text-sm text-gray-400">
              {item.location || "Location not provided."}
            </p>
          </div>

          {/* Reward */}
          {item.reward && (
            <div className="mb-6 rounded-xl bg-[#1B4B4B] p-4">
              <p className="text-xs text-gray-400">
                Reward
              </p>

              <p className="mt-1 font-semibold text-white">
                {item.reward}
              </p>
            </div>
          )}

          {/* Found Button */}
          <button
            type="button"
            onClick={handleFoundItem}
            className="w-full rounded-xl bg-[#B62779] px-4 py-3.5 text-sm font-bold text-white transition hover:bg-[#5A293C]"
          >
            I Found This Item
          </button>

        </div>
      </div>
    </div>
  );
}