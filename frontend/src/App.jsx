import SidebarDesktop from "./components/SidebarDesktop"

function App() {
  const header = ["TESTE", "TESTE", "TESTE"]
  const body = ["DADOS", "DADOS", "DADOS"]
  return (
    <div className='d-flex flex-grow-1 h-100' style={{ minWidth: 0 }}>
      <SidebarDesktop />
    </div>
  )
}

export default App