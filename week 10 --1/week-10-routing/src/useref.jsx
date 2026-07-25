import { useRef } from 'react';
import { useState } from 'react';

function UseRefEg() {

    const [currentCount, setCurrentCount] = useState(1);
    const timer = useRef();

    function startClock() {
        let value = setInterval(function () {
            setCurrentCount(c => c + 1);
        }, 1000);
        timercurrent = value;
    }

    function stopClock() {
        console.log(timer);
        clearInterval(timer.current);
    }

    return (
        <div>
            {currentCount}
            <br />
            <button onClick={startClock}>Start</button>
            <button onClick={stopClock}>Stop</button>
        </div>
    );
}

export default UseRefEg;