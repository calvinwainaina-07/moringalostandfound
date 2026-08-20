import { useState } from "react"
import "./App.css"

function App() {
  const [searchTerm, setSearchTerm] = useState("")

  const items = [
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
  ]

  const filteredItems = items.filter((item) =>
    `${item.name} ${item.location} ${item.status}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  )

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <h2>Lost & Found</h2>

        <nav>
          <a href="#" className="active">Dashboard</a>
          <a href="#">Lost Items</a>
          <a href="#">Found Items</a>
          <a href="#">Report Item</a>
        </nav>
      </aside>

      <main className="main-content">
        <header className="dashboard-header">
          <div>
            <h1>Dashboard</h1>
            <p>Welcome to the Moringa Lost & Found system.</p>
          </div>

          <button className="btn btn-primary">
            + Report Item
          </button>
        </header>

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
            <div className="number">12</div>
          </div>

          <div className="card">
            <h3>Found Items</h3>
            <div className="number">8</div>
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
              <div className="item-card" key={item.name}>
                <span
                  className={`status ${
                    item.status === "LOST" ? "lost" : "found"
                  }`}
                >
                  {item.status}
                </span>

                <h3>{item.name}</h3>
                <p>Location: {item.location}</p>
                <p>{item.details}</p>
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