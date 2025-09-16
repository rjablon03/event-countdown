import AddEventBtn from "./Components/AddEventBtn"
import EventContainer from "./Components/EventContainer"

function App() {
  return (
    <div className="component-container flex flex-col items-center">
      <AddEventBtn />
      <EventContainer />
      <EventContainer />
    </div>
  )
}

export default App
