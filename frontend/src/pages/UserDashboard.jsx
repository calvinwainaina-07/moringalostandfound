import { useEffect, useState } from "react"
import DashboardCard from "../components/DashboardCard"
import DashboardTable from "../components/DashboardTable"
import { getDashboardData } from "../api/mockApi"

function UserDashboard() {
  const [dashboardData, setDashboardData] = useState(null)

  useEffect(() => {
    getDashboardData().then((data) => {
      setDashboardData(data)
    })
  }, [])

  if (!dashboardData) {
    return <p>Loading dashboard...</p>
  }

  const columns = [
    { key: "item", label: "Item" },
    { key: "status", label: "Status" },
    { key: "date", label: "Date" },
  ]

  return (
    <div className="user-dashboard">
      <div className="dashboard-header">
        <h1>User Dashboard</h1>
        <p>
          Welcome back! Here's an overview of your lost and found activity.
        </p>
      </div>

      <div className="dashboard-cards">
        <DashboardCard
          title="Lost Items"
          value={dashboardData.lostItems}
          description="Items reported lost"
        />

        <DashboardCard
          title="Found Items"
          value={dashboardData.foundItems}
          description="Items reported found"
        />

        <DashboardCard
          title="My Claims"
          value={dashboardData.claims}
          description="Claims submitted"
        />

        <DashboardCard
          title="Rewards"
          value={dashboardData.rewards}
          description="Points earned"
        />
      </div>

      <div className="dashboard-section">
        <h2>Recent Activity</h2>

        <DashboardTable
          columns={columns}
          data={dashboardData.recentItems}
        />
      </div>
    </div>
  )
}

export default UserDashboard