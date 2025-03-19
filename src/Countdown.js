import { useState, useEffect, useRef } from "react";
import { mcqQuestions } from "./questions";

export default function Countdown({timer, setTimer, index}) {

    let interval = useRef(null);

    useEffect(() => {   

        if(index === mcqQuestions.length - 1 && timer === 1) {
            clearInterval(interval.current);
        }

    }, [timer])



    useEffect(() => {

        interval.current = setInterval(() => {

            setTimer(curr => curr - 1);
        }, 1000)
        
        return () => clearInterval(interval.current);

    }, [])

    return (
        <p className="countdown">Time: {timer}</p>
    )


}

