import { useRef } from "react";

export function useDebounce(originalFn) {
    const currentClock = useRef();

    const fn = () => {
        clearTimeout(currentClock.current);
        currentClock.current = setTimeout(originalFn, 200);
    };

    return fn;
}

export function Deb() {

    function sendDataToBackend() {
        fetch("api.amazon.com/search/");
    }

    const debouncedFn = useDebounce(sendDataToBackend);

    return (
        <div>
            <input type="text" onChange={debouncedFn}></input>
        </div>
    );
}