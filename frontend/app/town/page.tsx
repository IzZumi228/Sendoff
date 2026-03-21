"use client";
import { useState } from "react";

export default function Town(){

    const [counter, setCounter] = useState(0);


    return (
        <div>
            <h1>Counter is: {counter}</h1>
            <button
                onClick={(e) => {
                    setCounter(counter+1)
                }}
            >+</button>
        </div>
    )
}