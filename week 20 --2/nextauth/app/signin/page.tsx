"use client";
import axios from "axios";


export default function(){
    return <div>
        Sign In Page <br/>

        <input></input>
        <input></input>
        <button onClick={async () => {
            const res = await axios.post("http://localhost:3000/api/signin",{
                username: "Yash",
                Password: "1223123133"
            })

            localStorage.setItem("token",res.data.token)
        }}>Sign In</button>
    </div>
}