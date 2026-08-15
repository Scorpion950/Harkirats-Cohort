import './App.css'
import { Button } from "./components/ui/Button";

function App() {
  return (
    <>
      <Button
        variant="primary"
        size="md"
        text="Click me"
        startIcon="-"
        endIcon="+"
        onClick={() => {
          console.log("Button clicked");
        }}
      />
      <br></br> <br></br>
      <Button
        variant="primary"
        size="lg"
        text="Click me"
        startIcon="-"
        endIcon="+"
        onClick={() => {
          console.log("Button clicked");
        }}
      />
    </>
  )
}

export default App