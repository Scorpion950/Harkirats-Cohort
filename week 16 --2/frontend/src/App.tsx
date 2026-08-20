import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const [messages, setMessages] = useState(["Hello Everyone", "Hii there"])
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");

    ws.onmessage = (event) => {
      setMessages(m => [...m, event.data])
    }

    wsRef.current = ws;

    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: "join",
        payload: {
          roomId: "red"
        }
      }))
    }

  }, [])


  return (
    <div className='h-screen bg-black'>
      <br></br>

      <div className='h-[95vh]'>
        {messages.map(message => <div className='m-8'>
          <span className='bg-white text-black rounded p-4'>
            {message}
          </span>
        </div>)}
      </div>

      <div className='w-full bg-white flex p-4'>
        <input className='flex-1'></input>

        <button
          onClick={() => {
            wsRef.current?.send(JSON.stringify({
              type: "chat",
              payload: {
                message: "Hello"
              }
            }))
          }}
          className='bg-purple-600 text-white p-3'
        >
          Send Message
        </button>
      </div>
    </div>
  )
}

export default App