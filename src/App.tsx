"use client"

import { useState } from "react"
import Sidebar from "./components/Sidebar"
import Dashboard from "./components/Dashboard"
import Graficos from "./components/Graficos" // Corregido: G mayúscula

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [activePage, setActivePage] = useState("dashboard")

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar
        collapsed={isSidebarCollapsed}
        setCollapsed={setIsSidebarCollapsed}
        activePage={activePage}
        setActivePage={setActivePage}
      />
      <main className={`flex-1 transition-all duration-300 ${isSidebarCollapsed ? "ml-20" : "ml-64"} md:ml-0`}>
        {activePage === "dashboard" && <Dashboard />}
        {activePage === "graficos" && <Graficos />}
      </main>
    </div>
  )
}

export default App

