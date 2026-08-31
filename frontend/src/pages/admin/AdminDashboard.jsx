import { useEffect, useState } from "react";
import {
  getItems,
  updateItem,
  deleteItem,
} from "../../services/itemService";

export default function AdminDashboard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");

  const fetchItems = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getItems();
      setItems(data);
    } catch (err) {
      console.error("Failed to load reports:", err);
      setError("Could not load reports.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // --------------------------------
  // MARK LOST ITEM AS FOUND
  // --------------------------------
  const handleMarkAsFound = async (item) => {
    try {
      setUpdatingId(item.id);
      setError("");

      const updatedItem = {
        ...item,
        status: "Found",
        adminStatus: "Resolved",
      };

      const result = await updateItem(item.id, updatedItem);

      setItems((currentItems) =>
        currentItems.map((currentItem) =>
          currentItem.id === item.id ? result : currentItem
        )
      );
    } catch (err) {
      console.error("Failed to update item:", err);
      setError("Could not mark this item as found.");
    } finally {
      setUpdatingId(null);
    }
  };

  // --------------------------------
  // RESOLVE FOUND REPORT
  // --------------------------------
  const handleResolveFoundReport = async (foundItem) => {
    try {
      setUpdatingId(foundItem.id);
      setError("");

      /*
       * The found report contains the ID of the
       * original lost report.
       */
      const originalLostItemId = foundItem.originalLostItemId;

      // Update the found report first
      const updatedFoundItem = {
        ...foundItem,
        status: "Found",
        adminStatus: "Resolved",
      };

      const updatedFoundResult = await updateItem(
        foundItem.id,
        updatedFoundItem
      );

      let updatedLostResult = null;

      // If this found report came from a specific lost report,
      // update that lost report too.
      if (originalLostItemId) {
        const originalLostItem = items.find(
          (item) => String(item.id) === String(originalLostItemId)
        );

        if (originalLostItem) {
          const updatedLostItem = {
            ...originalLostItem,
            status: "Found",
            adminStatus: "Resolved",
          };

          updatedLostResult = await updateItem(
            originalLostItem.id,
            updatedLostItem
          );
        }
      }

      // Update the local dashboard
      setItems((currentItems) =>
        currentItems.map((currentItem) => {
          if (currentItem.id === foundItem.id) {
            return updatedFoundResult;
          }

          if (
            updatedLostResult &&
            currentItem.id === updatedLostResult.id
          ) {
            return updatedLostResult;
          }

          return currentItem;
        })
      );
    } catch (err) {
      console.error("Failed to resolve report:", err);
      setError(
        "Could not resolve this report. Please try again."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  // --------------------------------
  // DELETE REPORT
  // --------------------------------
  const handleDelete = async (item) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete the report for "${item.name}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(item.id);
      setError("");

      await deleteItem(item.id);

      setItems((currentItems) =>
        currentItems.filter(
          (currentItem) => currentItem.id !== item.id
        )
      );
    } catch (err) {
      console.error("Failed to delete report:", err);
      setError("Could not delete this report.");
    } finally {
      setDeletingId(null);
    }
  };

  // --------------------------------
  // REPORT FILTERS
  // --------------------------------

  const lostItems = items.filter(
    (item) =>
      item.reportType === "lost" ||
      item.status?.toLowerCase() === "lost"
  );

  const foundItems = items.filter(
    (item) =>
      item.reportType === "found" ||
      item.status?.toLowerCase() === "found"
  );

  const pendingItems = items.filter(
    (item) =>
      !item.adminStatus ||
      item.adminStatus.toLowerCase() === "pending"
  );

  const resolvedItems = items.filter(
    (item) =>
      item.adminStatus?.toLowerCase() === "resolved"
  );

  return (
    <div className="min-h-screen bg-[#2C2D32] px-4 py-6 pb-24 text-white">
      <div className="mx-auto w-full max-w-6xl">

        {/* ================= HEADER ================= */}

        <div className="mb-8">
          <p className="text-sm font-medium tracking-wide text-[#B62779]">
            ADMIN PANEL
          </p>

          <h1 className="mt-1 text-3xl font-bold">
            Admin Dashboard
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            Manage and resolve lost and found reports.
          </p>
        </div>

        {/* ================= STATISTICS ================= */}

        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl border border-[#263437] bg-[#263437] p-5 shadow-lg">
            <p className="text-sm text-gray-400">
              Total Reports
            </p>

            <p className="mt-2 text-3xl font-bold">
              {items.length}
            </p>
          </div>

          <div className="rounded-2xl border border-[#5A293C] bg-[#5A293C]/40 p-5 shadow-lg">
            <p className="text-sm text-gray-300">
              Lost
            </p>

            <p className="mt-2 text-3xl font-bold">
              {lostItems.length}
            </p>
          </div>

          <div className="rounded-2xl border border-[#1B4B4B] bg-[#1B4B4B] p-5 shadow-lg">
            <p className="text-sm text-gray-300">
              Found
            </p>

            <p className="mt-2 text-3xl font-bold">
              {foundItems.length}
            </p>
          </div>

          <div className="rounded-2xl border border-[#263437] bg-[#263437] p-5 shadow-lg">
            <p className="text-sm text-gray-400">
              Resolved
            </p>

            <p className="mt-2 text-3xl font-bold text-green-400">
              {resolvedItems.length}
            </p>
          </div>

        </div>

        {/* ================= ERROR ================= */}

        {error && (
          <div className="mb-6 rounded-xl border border-[#B62779] bg-[#5A293C]/60 px-4 py-3 text-sm text-pink-100">
            {error}
          </div>
        )}

        {/* ================= LOADING ================= */}

        {loading ? (
          <div className="rounded-2xl border border-[#263437] bg-[#263437] p-10 text-center">
            <p className="text-sm text-gray-400">
              Loading reports...
            </p>
          </div>
        ) : (
          <div className="space-y-10">

            {/* ================================================= */}
            {/* LOST REPORTS */}
            {/* ================================================= */}

            <section>
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">
                    Lost Reports
                  </h2>

                  <p className="mt-1 text-sm text-gray-400">
                    Items reported as lost by users.
                  </p>
                </div>

                <span className="rounded-full bg-[#5A293C] px-3 py-1 text-xs font-semibold">
                  {lostItems.length}
                </span>
              </div>

              {lostItems.length === 0 ? (
                <div className="rounded-2xl border border-[#263437] bg-[#263437] p-8 text-center">
                  <p className="text-sm text-gray-400">
                    No lost reports yet.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

                  {lostItems.map((item) => (
                    <div
                      key={item.id}
                      className="overflow-hidden rounded-2xl border border-[#263437] bg-[#263437] shadow-lg"
                    >

                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-48 w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-48 items-center justify-center bg-[#1B4B4B]">
                          <span className="text-sm text-gray-400">
                            No image available
                          </span>
                        </div>
                      )}

                      <div className="p-5">

                        <div className="mb-3 flex items-start justify-between gap-3">
                          <h3 className="text-lg font-bold">
                            {item.name}
                          </h3>

                          <span className="rounded-full bg-[#5A293C] px-3 py-1 text-xs font-semibold">
                            {item.status || "Lost"}
                          </span>
                        </div>

                        <p className="mb-4 text-sm leading-6 text-gray-400">
                          {item.description || "No description provided."}
                        </p>

                        <div className="space-y-2 text-sm">

                          <p>
                            <span className="font-semibold text-gray-200">
                              Category:
                            </span>{" "}
                            <span className="text-gray-400">
                              {item.category || "Not specified"}
                            </span>
                          </p>

                          <p>
                            <span className="font-semibold text-gray-200">
                              Location:
                            </span>{" "}
                            <span className="text-gray-400">
                              {item.location || "Not specified"}
                            </span>
                          </p>

                          <p>
                            <span className="font-semibold text-gray-200">
                              Reported by:
                            </span>{" "}
                            <span className="text-gray-400">
                              {item.reportedBy || "Unknown user"}
                            </span>
                          </p>

                          <p>
                            <span className="font-semibold text-gray-200">
                              Status:
                            </span>{" "}
                            <span
                              className={
                                item.adminStatus === "Resolved"
                                  ? "text-green-400"
                                  : "text-[#B62779]"
                              }
                            >
                              {item.adminStatus || "Pending"}
                            </span>
                          </p>

                          {item.reward && (
                            <p>
                              <span className="font-semibold text-gray-200">
                                Reward:
                              </span>{" "}
                              <span className="text-gray-400">
                                {item.reward}
                              </span>
                            </p>
                          )}

                        </div>

                        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">

                          <button
                            type="button"
                            onClick={() =>
                              handleMarkAsFound(item)
                            }
                            disabled={
                              updatingId === item.id ||
                              deletingId === item.id
                            }
                            className="rounded-xl bg-[#B62779] px-4 py-3 text-sm font-bold transition hover:bg-[#5A293C] disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {updatingId === item.id
                              ? "Updating..."
                              : "Mark as Found"}
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(item)
                            }
                            disabled={
                              deletingId === item.id ||
                              updatingId === item.id
                            }
                            className="rounded-xl border border-[#5A293C] bg-[#5A293C]/40 px-4 py-3 text-sm font-bold transition hover:bg-[#5A293C] disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {deletingId === item.id
                              ? "Deleting..."
                              : "Delete Report"}
                          </button>

                        </div>
                      </div>
                    </div>
                  ))}

                </div>
              )}
            </section>

            {/* ================================================= */}
            {/* FOUND REPORTS */}
            {/* ================================================= */}

            <section>

              <div className="mb-5 flex items-center justify-between">

                <div>
                  <h2 className="text-xl font-bold">
                    Found Reports
                  </h2>

                  <p className="mt-1 text-sm text-gray-400">
                    Items found by users.
                  </p>
                </div>

                <span className="rounded-full bg-[#1B4B4B] px-3 py-1 text-xs font-semibold">
                  {foundItems.length}
                </span>

              </div>

              {foundItems.length === 0 ? (
                <div className="rounded-2xl border border-[#263437] bg-[#263437] p-8 text-center">
                  <p className="text-sm text-gray-400">
                    No found reports yet.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

                  {foundItems.map((item) => {

                    const originalLostItem = item.originalLostItemId
                      ? items.find(
                          (lostItem) =>
                            String(lostItem.id) ===
                            String(item.originalLostItemId)
                        )
                      : null;

                    const isResolved =
                      item.adminStatus?.toLowerCase() ===
                      "resolved";

                    return (
                      <div
                        key={item.id}
                        className="overflow-hidden rounded-2xl border border-[#263437] bg-[#263437] shadow-lg"
                      >

                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-48 w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-48 items-center justify-center bg-[#1B4B4B]">
                            <span className="text-sm text-gray-400">
                              No image available
                            </span>
                          </div>
                        )}

                        <div className="p-5">

                          <div className="mb-3 flex items-start justify-between gap-3">

                            <h3 className="text-lg font-bold">
                              {item.name}
                            </h3>

                            <span className="rounded-full bg-[#1B4B4B] px-3 py-1 text-xs font-semibold">
                              Found
                            </span>

                          </div>

                          {/* Matching information */}
                          {originalLostItem && (
                            <div className="mb-4 rounded-xl border border-[#B62779]/30 bg-[#5A293C]/20 p-4">

                              <p className="text-xs font-semibold uppercase tracking-wide text-[#B62779]">
                                Matches Lost Report
                              </p>

                              <p className="mt-1 text-sm font-semibold text-white">
                                {originalLostItem.name}
                              </p>

                              <p className="mt-1 text-xs text-gray-400">
                                Originally reported by{" "}
                                {originalLostItem.reportedBy ||
                                  "Unknown user"}
                              </p>

                            </div>
                          )}

                          <p className="mb-4 text-sm leading-6 text-gray-400">
                            {item.description ||
                              "No description provided."}
                          </p>

                          <div className="space-y-2 text-sm">

                            <p>
                              <span className="font-semibold text-gray-200">
                                Category:
                              </span>{" "}
                              <span className="text-gray-400">
                                {item.category ||
                                  "Not specified"}
                              </span>
                            </p>

                            <p>
                              <span className="font-semibold text-gray-200">
                                Found at:
                              </span>{" "}
                              <span className="text-gray-400">
                                {item.location ||
                                  "Not specified"}
                              </span>
                            </p>

                            <p>
                              <span className="font-semibold text-gray-200">
                                Found by:
                              </span>{" "}
                              <span className="text-gray-400">
                                {item.reportedBy ||
                                  "Unknown user"}
                              </span>
                            </p>

                            <p>
                              <span className="font-semibold text-gray-200">
                                Status:
                              </span>{" "}
                              <span
                                className={
                                  isResolved
                                    ? "text-green-400"
                                    : "text-[#B62779]"
                                }
                              >
                                {item.adminStatus ||
                                  "Pending"}
                              </span>
                            </p>

                          </div>

                          {/* Resolve */}
                          {!isResolved && (
                            <button
                              type="button"
                              onClick={() =>
                                handleResolveFoundReport(item)
                              }
                              disabled={
                                updatingId === item.id ||
                                deletingId === item.id
                              }
                              className="mt-5 w-full rounded-xl bg-[#B62779] px-4 py-3 text-sm font-bold transition hover:bg-[#5A293C] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              {updatingId === item.id
                                ? "Resolving..."
                                : "Resolve & Return Item"}
                            </button>
                          )}

                          {isResolved && (
                            <div className="mt-5 rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-center text-sm font-semibold text-green-400">
                              Item successfully resolved
                            </div>
                          )}

                          {/* Delete */}
                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(item)
                            }
                            disabled={
                              deletingId === item.id ||
                              updatingId === item.id
                            }
                            className="mt-3 w-full rounded-xl border border-[#5A293C] bg-[#5A293C]/40 px-4 py-3 text-sm font-bold transition hover:bg-[#5A293C] disabled:cursor-not-allowed disabled:opacity-60"
                          >
                            {deletingId === item.id
                              ? "Deleting..."
                              : "Delete Report"}
                          </button>

                        </div>
                      </div>
                    );
                  })}

                </div>
              )}

            </section>

            {/* ================================================= */}
            {/* STATUS SUMMARY */}
            {/* ================================================= */}

            <section>

              <div className="rounded-2xl border border-[#263437] bg-[#263437] p-5 shadow-lg">

                <h2 className="text-lg font-bold">
                  Report Status
                </h2>

                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">

                  <div className="rounded-xl bg-[#2C2D32] p-4">
                    <p className="text-sm text-gray-400">
                      Pending Reports
                    </p>

                    <p className="mt-1 text-2xl font-bold text-[#B62779]">
                      {pendingItems.length}
                    </p>
                  </div>

                  <div className="rounded-xl bg-[#2C2D32] p-4">
                    <p className="text-sm text-gray-400">
                      Resolved Reports
                    </p>

                    <p className="mt-1 text-2xl font-bold text-green-400">
                      {resolvedItems.length}
                    </p>
                  </div>

                </div>
              </div>

            </section>

          </div>
        )}
      </div>
    </div>
  );
}