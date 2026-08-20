const dashboardData = {
  lostItems: 12,
  foundItems: 8,
  claims: 5,
  rewards: 250,

  recentItems: [
    {
      item: "Black Backpack",
      status: "Lost",
      date: "18 Aug 2026",
    },
    {
      item: "Samsung Phone",
      status: "Found",
      date: "17 Aug 2026",
    },
    {
      item: "Student ID",
      status: "Claimed",
      date: "16 Aug 2026",
    },
  ],
}

export function getDashboardData() {
  return Promise.resolve(dashboardData)
}