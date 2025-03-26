const Logo = ({ collapsed }: { collapsed: boolean }) => {
  return (
    <div className={`text-lg font-bold transition-opacity duration-300 ${collapsed ? "opacity-0" : "opacity-100"}`}>
      Cultivos App
    </div>
  )
}

export default Logo

