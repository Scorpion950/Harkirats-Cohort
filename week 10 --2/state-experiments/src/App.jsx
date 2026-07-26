import { useState, createContext, useContext } from 'react'
import './App.css'
import TestingApi from './testingapi.jsx'

const BulbContext = createContext();

function App() {
  const [bulbOn, setBulbOn] = useState(true);

  return (
    <div>
      <BulbContext.Provider value={{ bulbOn: bulbOn, setBulbOn }}>
        <Light />
      </BulbContext.Provider>

      <TestingApi />
    </div>
  )

}

function Light() {

  //bulbOn is a prop to the state component
  // bulbOn, setBulbOn are props to the ToggleBulbState component

  return (
    <div>
      <LightBulb />
      <LightSwitch />
    </div>
  )
}

function LightBulb() {
  const { bulbOn } = useContext(BulbContext);

  return (
    <div>
      {bulbOn ? "Bulb is On" : "Bulb is Off"}
    </div>
  )
}

function LightSwitch() {
  const { bulbOn, setBulbOn } = useContext(BulbContext);

  function toggle() {
    setBulbOn(currentState => !currentState)
  }

  return (
    <div>
      <button onClick={toggle}>Toggle Bulb</button>
    </div>
  )
}

export default App