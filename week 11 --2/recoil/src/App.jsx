import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil'
import './App.css'
import { counterAtom, evenSelector } from './store/atoms/counter'

function App() {

  return (
    <>
      <RecoilRoot>
        <Counter />

        <Buttons></Buttons>
        <Counter1></Counter1>
        <IsEven></IsEven>
      </RecoilRoot>
    </>
  )
}

function Buttons() {

  const setCount = useSetRecoilState(counterAtom);

  function increase1() {
    setCount(c => c + 2)
  }

  function decrease1() {
    setCount(c => c - 1)
  }

  return <div>
    <button onClick={increase1}>Increase</button>
    <button onClick={decrease1}>decrease</button>
  </div>
}

function Counter1() {
  const count = useRecoilValue(counterAtom);

  return <div>
    {count}
  </div>
}

function IsEven() {
  const even = useRecoilValue(evenSelector);

  return <div>
    {even ? "Even" : "Odd"}
  </div>
}

function Counter() {

  return <div>
    <CurrentCount />
    <Increase />
    <Decrease></Decrease>

  </div>
}

function CurrentCount() {
  const count = useRecoilValue(counterAtom);
  return <div>
    {count}
  </div>
}

function Decrease() {
  const setCount = useSetRecoilState(counterAtom);

  function decrease() {
    setCount(c => c - 1);
  }

  return <div>
    <button onClick={decrease}>Decrease</button>
  </div>
}

function Increase() {
  const setCount = useSetRecoilState(counterAtom);

  function increase() {
    setCount(c => c + 1);
  }

  return <div>
    <button onClick={increase}>Increase</button>
  </div>
}

export default App