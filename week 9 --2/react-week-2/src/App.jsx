import { useState, useEffect } from "react";

function App() {
  let [counterVisible, setCountervisible] = useState(true);

  useEffect(function () {
    setInterval(function () {
      setCountervisible((c) => !c);
    }, 5000); // after 5 sec it will appear and then after 5 sec it will disappear
  }, []);

  return (
    <div>
      <b>HIII!</b>

      {/* FIX 1: Use counterVisible so the Counter mounts and unmounts */}
      {counterVisible ? <Counter /> : null}
    </div>
  );
}

// mounting, re-rendering, unmounting
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(function () {
    // this logic runs on mount

    // Store the interval ID so it can be cleared later
    const clock = setInterval(function () {
      setCount(function (count) {
        return count + 1;
      });
    }, 1000); // this is a clock

    return function () {
      // cleanup runs on unmount
      clearInterval(clock);
    };
  }, []); // if we didn't use cleanup it will run in the background also

  function increaseCount() {
    setCount(count + 1);
  }

  // function decreaseCount() {
  //   setCount(count - 1);
  // }

  // function resetCount() {
  //   setCount(0);
  // }

  return (
    <div>
      <h1 id="text">{count}</h1>
      <button onClick={increaseCount}>Increase it</button>

      {/* <button onClick={decreaseCount}>decrease it</button>
      <button onClick={resetCount}>reset it</button> */}
    </div>
  );
}

export default App;