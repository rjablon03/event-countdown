import AddEventBtn from "./Components/AddEventBtn"
import EventContainer from "./Components/EventContainer"

function App() {
  return (
    <div className="component-container flex flex-col items-center">
      <AddEventBtn />
      <EventContainer title="Test" targetDate="2026-12-31T23:59:59"/>
    </div>
  )
}

export default App
