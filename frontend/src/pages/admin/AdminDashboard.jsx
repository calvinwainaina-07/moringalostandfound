import { useEffect, useState } from "react";
import { deleteItem, getItems, updateItem } from "../../services/itemService";

const formatDate = (value) => new Date(value).toLocaleDateString();

export default function AdminDashboard() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadItems = async () => {
      try {
        setItems(await getItems());
      } catch (err) {
        setError(err.response?.data?.detail || "Could not load reports.");
      } finally {
        setLoading(false);
      }
    };
    loadItems();
  }, []);

  const changeStatus = async (item, status) => {
    try {
      setBusyId(item.id);
      setError("");
      const updated = await updateItem(item.id, { status });
      setItems((current) => current.map((entry) => entry.id === item.id ? updated : entry));
    } catch (err) {
      setError(err.response?.data?.detail || "Could not update this report.");
    } finally {
      setBusyId(null);
    }
  };

  const removeItem = async (item) => {
    if (!window.confirm(`Delete the report for "${item.title}"?`)) return;
    try {
      setBusyId(item.id);
      setError("");
      await deleteItem(item.id);
      setItems((current) => current.filter((entry) => entry.id !== item.id));
    } catch (err) {
      setError(err.response?.data?.detail || "Could not delete this report.");
    } finally {
      setBusyId(null);
    }
  };

  const lostItems = items.filter((item) => item.item_type === "lost");
  const foundItems = items.filter((item) => item.item_type === "found");
  const returnedItems = items.filter((item) => item.status === "returned");

  return (
    <div className="min-h-screen bg-[#2C2D32] px-4 py-6 text-white">
      <div className="mx-auto max-w-6xl">
        <p className="text-sm font-medium tracking-wide text-[#B62779]">ADMIN PANEL</p>
        <h1 className="mt-1 text-3xl font-bold">Admin Dashboard</h1>
        <p className="mt-2 text-sm text-gray-400">Manage lost and found reports.</p>

        <div className="my-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[["Total Reports", items.length], ["Lost", lostItems.length], ["Found", foundItems.length], ["Returned", returnedItems.length]].map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-[#263437] bg-[#263437] p-5">
              <p className="text-sm text-gray-400">{label}</p><p className="mt-2 text-3xl font-bold">{value}</p>
            </div>
          ))}
        </div>

        {error && <p className="mb-6 rounded-xl border border-[#B62779] bg-[#5A293C]/60 px-4 py-3 text-sm text-pink-100">{error}</p>}
        {loading ? <p className="text-gray-400">Loading reports...</p> : (
          <div className="grid gap-5 lg:grid-cols-2">
            {items.map((item) => (
              <article key={item.id} className="overflow-hidden rounded-2xl border border-[#263437] bg-[#263437]">
                {item.image_url && <img src={item.image_url} alt={item.title} className="h-44 w-full object-cover" />}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="text-lg font-bold">{item.title}</h2>
                    <span className="rounded-full bg-[#1B4B4B] px-3 py-1 text-xs font-semibold uppercase">{item.item_type}</span>
                  </div>
                  <p className="mt-3 text-sm text-gray-400">{item.description}</p>
                  <dl className="mt-4 space-y-1 text-sm text-gray-300">
                    <div><dt className="inline font-semibold">Category: </dt><dd className="inline">{item.category}</dd></div>
                    <div><dt className="inline font-semibold">Location: </dt><dd className="inline">{item.location}</dd></div>
                    <div><dt className="inline font-semibold">Reported: </dt><dd className="inline">{formatDate(item.created_at)}</dd></div>
                    <div><dt className="inline font-semibold">Status: </dt><dd className="inline capitalize">{item.status}</dd></div>
                  </dl>
                  <div className="mt-5 flex flex-wrap gap-3">
                    {item.status === "open" && <button onClick={() => changeStatus(item, "claimed")} disabled={busyId === item.id} className="rounded-xl bg-[#B62779] px-4 py-2 text-sm font-bold disabled:opacity-60">Mark claimed</button>}
                    {item.status === "claimed" && <button onClick={() => changeStatus(item, "returned")} disabled={busyId === item.id} className="rounded-xl bg-[#B62779] px-4 py-2 text-sm font-bold disabled:opacity-60">Mark returned</button>}
                    <button onClick={() => removeItem(item)} disabled={busyId === item.id} className="rounded-xl border border-[#B62779] px-4 py-2 text-sm font-bold disabled:opacity-60">Delete</button>
                  </div>
                </div>
              </article>
            ))}
            {!items.length && <p className="text-gray-400">No reports yet.</p>}
          </div>
        )}
      </div>
    </div>
  );
}
