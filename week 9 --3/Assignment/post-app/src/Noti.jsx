import { useState } from "react";



export function Noti() {

    const [count, setCount] = useState(1);

    function increaseCount() {
        setCount(count + 1);
    }

    setInterval(increaseCount, 1000);

    return (
        <div>
            <div style={{ display: "flex" }}>
                <div
                    style={{
                        background: "red",
                        borderRadius: 20,
                        width: 20,
                        height: 25,
                        paddingLeft: 10,
                        paddintTop: 5
                    }}
                >
                    {count}
                </div>
            </div>

            <img
                style={{ cursor: "pointer" }}
                src="https://static.thenounproject.com/png/1594277-200.png"
                width={60}
            /> </div>
    );
}