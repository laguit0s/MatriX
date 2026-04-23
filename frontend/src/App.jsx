import SidebarDesktop from "./components/SidebarDesktop"
import DataTable from "./components/DataTable"

function App() {

  return (
    <div className='d-flex flex-grow-1 h-100' style={{ minWidth: 0 }}>
      <SidebarDesktop />
    </div>
  )
}

export default App