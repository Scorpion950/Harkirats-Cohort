import './App.css'
import {Button} from './components/buttons'
import {Input} from './components/input'
import {Otp} from './components/otp'
function App() {
  return (

    /*
    <div className = 'bg-red-500 sm:col-span-12 bg-brown-300 rounded-'>
      child 1
    </div>
    <div className = "bg-green-500 sm:col-span-12 bg-black-300 ">
      child 2
    </div>
    <div className = "bg-blue-500 sm:col-span-12 bg-orange-300">
      child 3
    </div>

    <div className='xl: bg-yellow-500 md: bg-green-300 sm:bg-cyan-500 bg-red-700'> Hello this is a color changing!!!!
    </div>*/
    


    <div className='h-screen bg-blue-700'>
      <br />
      <br />
      <br />
<Input
        type="text"
        placeholder="Enter your name"
      />
      <Button disabled={false}>Sign UP</Button>
      <Otp></Otp>
    <div className = "h-screen bg-blue-700"></div>

    </div>

    
  );
}

export default App;

//mobile first approach
/* sm - small
md - bigger than sm smaller than lg (medium)
lg - bigger than md smaller than xl (large)
xl - bigger than lg smaller than 2xl (extra large)
2xl - bigger than xl */