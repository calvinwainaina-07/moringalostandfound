function ItemCard({ item }) {
  const isLost = item.type === "lost";

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden mb-4 border border-gray-200">
      {item.image ? (
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
          <p className="text-gray-500">No image available</p>
        </div>
      )}

      <div className="p-4">
        <div className="flex justify-between items-start gap-3 mb-2">
          <h3 className="text-lg font-semibold text-[#2c2d32]">
            {item.title}
          </h3>

          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              isLost
                ? "bg-[#5a293c] text-white"
                : "bg-[#1b4b4b] text-white"
            }`}
          >
            {isLost ? "Lost" : "Found"}
          </span>
        </div>

        <p className="text-sm text-gray-600 mb-3">
          {item.description}
        </p>

        <div className="space-y-1 text-sm text-gray-700">
          <p>
            <span className="font-medium">Category:</span>{" "}
            {item.category}
          </p>

          <p>
            <span className="font-medium">Location:</span>{" "}
            {item.location}
          </p>

          <p>
            <span className="font-medium">Date:</span>{" "}
            {item.date}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ItemCard;