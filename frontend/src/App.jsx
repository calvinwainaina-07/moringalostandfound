import "./App.css";

function App() {
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
            <div className="item-card">
              <span className="status lost">LOST</span>
              <h3>Black Backpack</h3>
              <p>Location: Moringa Campus</p>
              <p>Reported recently</p>
            </div>

            <div className="item-card">
              <span className="status found">FOUND</span>
              <h3>Student ID Card</h3>
              <p>Location: Library</p>
              <p>Reported recently</p>
            </div>

            <div className="item-card">
              <span className="status lost">LOST</span>
              <h3>Blue Water Bottle</h3>
              <p>Location: Cafeteria</p>
              <p>Reported recently</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;