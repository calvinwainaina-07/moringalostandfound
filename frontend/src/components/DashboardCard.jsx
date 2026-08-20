function DashboardCard({ title, value, description }) {
  return (
    <div className="dashboard-card">
      <h3>{title}</h3>
      <p className="dashboard-card-value">{value}</p>
      <span>{description}</span>
    </div>
  )
}

export default DashboardCard