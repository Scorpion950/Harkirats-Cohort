import { useState, useEffect } from "react";

// useEffect, dependency array, cleanups
function Project() {
  const [count, setCount] = useState(0);

  function increase() {
    setCount((c) => c + 1);
  }

  return (
    <div>
      <Counter count={count}></Counter>
      <button onClick={increase}>Increase Count</button>
      after Counter
    </div>
  );
}

// mounting, re-rendering, unmounting
function Counter(props) {
  // FIX 1: Accept props because Project passes count as a prop

  useEffect(function () {
    console.log("mount");

    return function () {
      console.log("unmount");
    };
  }, []);

  useEffect(function () {
    console.log("count has changed");
  }, [props.count]);

  return (
    <div>
      Counter {props.count}
    </div>
  );
}

export default Project;