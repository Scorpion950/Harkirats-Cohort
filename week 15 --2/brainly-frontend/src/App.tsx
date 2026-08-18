import './App.css'
import { Button } from "./components/ui/Button";
import { PlusIcon } from "./icons/PlusIcon";

function App() {
  return (
    <>
      <Button 
        variant="primary"
        size="md"
        text="Share"
        startIcon={<PlusIcon />}
        endIcon="-"
        onClick={() => {
          console.log("Button clicked");
        }}
      />
      <br></br> <br></br>
      <Button
        variant="primary"
        size="lg"
        text="Add Content"
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