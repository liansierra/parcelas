"use client"
import { BarChart3, Home, LogOut, Menu, X } from "lucide-react"
import Logo from "./Logo"

interface SidebarProps {
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
  activePage: string
  setActivePage: (page: string) => void
}

const Sidebar = ({ collapsed, setCollapsed, activePage, setActivePage }: SidebarProps) => {
  const toggleSidebar = () => {
    setCollapsed(!collapsed)
  }

  return (
    <aside
      className={`fixed top-0 left-0 z-40 h-screen bg-indigo-600 text-white transition-all duration-300 
      ${collapsed ? "w-20" : "w-64"} md:relative`}
    >
      <div className="flex h-16 items-center justify-between border-b border-indigo-500 px-4">
        <Logo collapsed={collapsed} />
        <button
          className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500 hover:bg-indigo-400 transition-colors"
          onClick={toggleSidebar}
        >
          {collapsed ? <Menu size={20} /> : <X size={20} />}
        </button>
      </div>

      <nav className="py-4">
        <ul>
          <li
            className={`flex cursor-pointer items-center px-4 py-3 mx-2 rounded-md transition-colors
            ${activePage === "dashboard" ? "bg-indigo-500 font-medium" : "hover:bg-indigo-500/30"}`}
            onClick={() => setActivePage("dashboard")}
          >
            <Home size={20} />
            {!collapsed && <span className="ml-3">Dashboard</span>}
          </li>
          <li
            className={`flex cursor-pointer items-center px-4 py-3 mx-2 rounded-md transition-colors
            ${activePage === "graficos" ? "bg-indigo-500 font-medium" : "hover:bg-indigo-500/30"}`}
            onClick={() => setActivePage("graficos")}
          >
            <BarChart3 size={20} />
            {!collapsed && <span className="ml-3">Gráficos</span>}
          </li>
        </ul>
      </nav>

      <div className="absolute bottom-0 left-0 w-full border-t border-indigo-500 p-4">
        <button className="flex w-full items-center rounded-md px-3 py-2 text-white hover:bg-indigo-500/30 transition-colors">
          <LogOut size={20} />
          {!collapsed && <span className="ml-3">Salir</span>}
        </button>
      </div>
    </aside>
  )
}

export default Sidebar

