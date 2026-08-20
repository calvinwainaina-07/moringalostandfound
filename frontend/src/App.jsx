import { useState } from "react"
import "./App.css"

function App() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [filter, setFilter] = useState("ALL")

  const [items, setItems] = useState([
    {
      status: "LOST",
      name: "Black Backpack",
      location: "Moringa Campus",
      details: "Reported recently",
    },
    {
      status: "FOUND",
      name: "Student ID Card",
      location: "Library",
      details: "Reported recently",
    },
    {
      status: "LOST",
      name: "Blue Water Bottle",
      location: "Cafeteria",
      details: "Reported recently",
    },
  ])

  const [formData, setFormData] = useState({
    status: "LOST",
    name: "",
    location: "",
    details: "",
  })

  const filteredItems = items.filter((item) => {
    const matchesSearch = `${item.name} ${item.location} ${item.status}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())

    const matchesFilter =
      filter === "ALL" || item.status === filter

    return matchesSearch && matchesFilter
  })

  function handleChange(event) {
    const { name, value } = event.target

    setFormData({
      ...formData,
      [name]: value,
    })
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (!formData.name || !formData.location || !formData.details) {
      return
    }

    const newItem = {
      status: formData.status,
      name: formData.name,
      location: formData.location,
      details: formData.details,
    }

    setItems([...items, newItem])

    setFormData({
      status: "LOST",
      name: "",
      location: "",
      details: "",
    })

    setShowForm(false)
    setFilter("ALL")
    setSearchTerm("")
  }

  function openReportForm(event) {
    event.preventDefault()
    setShowForm(true)
    setFilter("ALL")
  }

  return (
    <div className="dashboard">

      {/* SIDEBAR */}

      <aside className="sidebar">
        <h2>Lost & Found</h2>

        <nav>
          <a
            href="#"
            className={filter === "ALL" && !showForm ? "active" : ""}
            onClick={(event) => {
              event.preventDefault()
              setFilter("ALL")
              setShowForm(false)
            }}
          >
            Dashboard
          </a>

          <a
            href="#"
            className={filter === "LOST" ? "active" : ""}
            onClick={(event) => {
              event.preventDefault()
              setFilter("LOST")
              setShowForm(false)
            }}
          >
            Lost Items
          </a>

          <a
            href="#"
            className={filter === "FOUND" ? "active" : ""}
            onClick={(event) => {
              event.preventDefault()
              setFilter("FOUND")
              setShowForm(false)
            }}
          >
            Found Items
          </a>

          <a
            href="#"
            className={showForm ? "active" : ""}
            onClick={openReportForm}
          >
            Report Item
          </a>
        </nav>
      </aside>

      {/* MAIN CONTENT */}

      <main className="main-content">

        {/* HEADER */}

        <header className="dashboard-header">
          <div>
            <h1>Dashboard</h1>

            <p>
              Welcome to the Moringa Lost & Found system.
            </p>
          </div>

          <button
            className="btn btn-primary"
            onClick={() => {
              setShowForm(true)
              setFilter("ALL")
            }}
          >
            + Report Item
          </button>
        </header>

        {/* REPORT FORM */}

        {showForm && (
          <section className="items-section">
            <h2>Report an Item</h2>

            <form onSubmit={handleSubmit}>

              <label>
                Item Status

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="LOST">Lost</option>
                  <option value="FOUND">Found</option>
                </select>
              </label>

              <label>
                Item Name

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Black Backpack"
                />
              </label>

              <label>
                Location

                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="e.g. Library"
                />
              </label>

              <label>
                Description

                <input
                  type="text"
                  name="details"
                  value={formData.details}
                  onChange={handleChange}
                  placeholder="Describe the item"
                />
              </label>

              <button
                type="submit"
                className="btn btn-primary"
              >
                Submit Report
              </button>

              <button
                type="button"
                className="btn"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>

            </form>
          </section>
        )}

        {/* SEARCH */}

        <input
          className="search-bar"
          type="text"
          placeholder="Search for an item..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />

        {/* STATISTICS */}

        <section className="cards">

          <div className="card">
            <h3>Lost Items</h3>

            <div className="number">
              {items.filter(
                (item) => item.status === "LOST"
              ).length}
            </div>
          </div>

          <div className="card">
            <h3>Found Items</h3>

            <div className="number">
              {items.filter(
                (item) => item.status === "FOUND"
              ).length}
            </div>
          </div>

          <div className="card">
            <h3>Items Returned</h3>

            <div className="number">5</div>
          </div>

        </section>

        {/* ITEMS */}

        <section className="items-section">

          <h2>
            {filter === "LOST"
              ? "Lost Items"
              : filter === "FOUND"
              ? "Found Items"
              : "Recent Items"}
          </h2>

          <div className="item-grid">

            {filteredItems.map((item) => (
              <div
                className="item-card"
                key={`${item.name}-${item.location}`}
              >
                <span
                  className={`status ${
                    item.status === "LOST"
                      ? "lost"
                      : "found"
                  }`}
                >
                  {item.status}
                </span>

                <h3>{item.name}</h3>

                <p>
                  Location: {item.location}
                </p>

                <p>
                  {item.details}
                </p>
              </div>
            ))}

          </div>

          {filteredItems.length === 0 && (
            <p>No items found.</p>
          )}

        </section>

      </main>
    </div>
  )
}

export default App