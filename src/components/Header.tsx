import { Bell, Settings } from "lucide-react"
import UserAvatar from "./UserAvatar"


const Header = () => {
  return (
    <header className="h-16 flex items-center justify-between px-6 bg-indigo-700 shadow-md">
      <div>
        <h2 className="text-lg font-medium">Cultivos del Sur</h2>
      </div>

      <div className="flex items-center gap-4">
        <button className="flex items-center justify-center w-9 h-9 rounded-full bg-indigo-600 hover:bg-indigo-500 transition-colors">
          <Bell size={20} />
        </button>
        <button className="flex items-center justify-center w-9 h-9 rounded-full bg-indigo-600 hover:bg-indigo-500 transition-colors">
          <Settings size={20} />
        </button>
        <UserAvatar />
      </div>
    </header>
  )
}

export default Header

