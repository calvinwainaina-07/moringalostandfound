import { useState } from "react"
import "./App.css"

function App() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showForm, setShowForm] = useState(false)

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

  const filteredItems = items.filter((item) =>
    `${item.name} ${item.location} ${item.status}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  )

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

    setItems([
      ...items,
      {
        status: formData.status,
        name: formData.name,
        location: formData.location,
        details: formData.details,
      },
    ])

    setFormData({
      status: "LOST",
      name: "",
      location: "",
      details: "",
    })

    setShowForm(false)
  }

  return (
    <div className="dashboard">

      <aside className="sidebar">
        <h2>Lost & Found</h2>

        <nav>
          <a href="#" className="active">Dashboard</a>
          <a href="#">Lost Items</a>
          <a href="#">Found Items</a>

          <a
            href="#"
            onClick={(event) => {
              event.preventDefault()
              setShowForm(true)
            }}
          >
            Report Item
          </a>
        </nav>
      </aside>

      <main className="main-content">

        <header className="dashboard-header">
          <div>
            <h1>Dashboard</h1>
            <p>Welcome to the Moringa Lost & Found system.</p>
          </div>

          <button
            className="btn btn-primary"
            onClick={() => setShowForm(true)}
          >
            + Report Item
          </button>
        </header>

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

        <input
          className="search-bar"
          type="text"
          placeholder="Search for an item..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />

        <section className="cards">

          <div className="card">
            <h3>Lost Items</h3>
            <div className="number">
              {items.filter((item) => item.status === "LOST").length}
            </div>
          </div>

          <div className="card">
            <h3>Found Items</h3>
            <div className="number">
              {items.filter((item) => item.status === "FOUND").length}
            </div>
          </div>

          <div className="card">
            <h3>Items Returned</h3>
            <div className="number">5</div>
          </div>

        </section>

        <section className="items-section">

          <h2>Recent Items</h2>

          <div className="item-grid">

            {filteredItems.map((item) => (

              <div className="item-card" key={`${item.name}-${item.location}`}>

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