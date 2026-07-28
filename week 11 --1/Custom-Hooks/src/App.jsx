import { useState } from 'react'
import { useFetch, usePostTitle } from './hooks/useFetch'
import { usePrev } from "./hooks/use-prev";
import { useDebounce, Deb } from './hooks/useDebounce'
import './App.css'

function useCounter() { // Custom Hook

  const [count, setCount] = useState(0);

  function increaseCount() {
    setCount(count + 1);
  }

  return {
    count: count,
    increaseCount: increaseCount
  };
}

function App() {
  const { count, increaseCount } = useCounter();

  const [currentPost, setCurrentPost] = useState(1);

  // Separate state for usePrev demo
  const [state, setState] = useState(0);
  const prev = usePrev(state);

  const { finalData, loading } = useFetch(
    "https://jsonplaceholder.typicode.com/todos/" + currentPost
  );

  if (loading) {
    return (
      <div>
        Loading..............
      </div>
    );
  }

  return (
    <div>

      <Deb />

      {/* These buttons are only for fetching posts */}
      <button onClick={() => setCurrentPost(1)}>1</button>
      <button onClick={() => setCurrentPost(2)}>2</button>
      <button onClick={() => setCurrentPost(3)}>3</button>

      <br /><br />

      {/* Separate usePrev demo */}
      <p>Current value: {state}</p>
      <button onClick={() => setState((curr) => curr + 1)}>
        Increase State
      </button>
      <p>The previous value was {prev}</p>

      <br />

      {JSON.stringify(finalData)} <br />

      <button onClick={increaseCount}>
        press it {count}
      </button>
    </div>
  );
}

export default App;