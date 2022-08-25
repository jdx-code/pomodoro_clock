import React, { useState, useEffect } from 'react';
import './App.css'

function App() {

    const[breakValue, setBreakValue] = useState(5);
    const[sessionValue, setSessionValue] = useState(25);
    const[displayTime, setDisplayTime] = useState(25 * 60);

    const[timeType, setTimeType] = useState("SESSION");
    const[play, setPlay] = useState(false);

    const timeout = setTimeout(() => {
        if(displayTime && play){
            setDisplayTime(displayTime - 1)
        }
    }, 1000);

    const incrementBreakValue = () => {
        if(breakValue < 60) {
            setBreakValue(breakValue + 1)
        }
    }

    const decrementBreakValue = () => {
        if(breakValue > 1) {
            setBreakValue(breakValue - 1)
        }
    }

    const incrementSessionValue = () => {
        if(sessionValue < 60) {
            setSessionValue(sessionValue + 1)
            setDisplayTime(displayTime + 60)
        }
    }

    const decrementSessionValue = () => {
        if(sessionValue > 1) {
            setSessionValue(sessionValue - 1)
            setDisplayTime(displayTime - 60)
        }
    }

    const handlePlay = () => {
        clearTimeout(timeout);
        setPlay(!play);
    }   
    
    const resetTimer = () => {
        const audio = document.getElementById("beep");
        if(!displayTime && timeType === "SESSION"){
          setDisplayTime(breakValue * 60)
          setTimeType("BREAK")
          audio.play()
        }
        if(!displayTime && timeType === "BREAK"){
          setDisplayTime(sessionValue * 60)
          setTimeType("SESSION")
          audio.pause()
          audio.currentTime = 0;
        }
      }
    
    const handleReset = () => {
        clearTimeout(timeout)
        setBreakValue(5)
        setSessionValue(25)
        setDisplayTime(25 * 60)
    }

    const clock = () => {
        if(play){
            timeout
            resetTimer()
        } else {
           clearTimeout(timeout)       
        }
      }
      
     useEffect(() => {
        clock()
      }, [play, displayTime, timeout])


    const formatTime = (time) => {
        let minutes = Math.floor(time / 60);
        let seconds = time % 60;

        return (
            (minutes < 10 ? '0' + minutes : minutes) + ":" +
            (seconds < 10 ? '0' + seconds : seconds)
        )
    }      

    return(
        <div className="App">
            <div id="break-label">
                Break Length 
                <button disabled={play} id="break-increment" onClick={()=>incrementBreakValue()}> + </button>
                    <div id="break-length">
                        {breakValue}
                    </div>
                <button disabled={play} id="break-decrement" onClick={()=>decrementBreakValue()}> - </button>   
                            
            </div>

            <div id="session-label">
                Session Length
                <button disabled={play} id="session-increment" onClick={()=>incrementSessionValue()}> + </button>
                    <div id="session-length">
                        {sessionValue}
                    </div>
                <button disabled={play} id="session-decrement" onClick={()=>decrementSessionValue()}> - </button>                
            </div>

            <div id="timer-label">
                {timeType === "SESSION" ? "Session" : "Break"}
                
                <div id="time-left">
                    {formatTime(displayTime)}
                </div>              
            </div>

            
            

            <button id="start_stop" onClick={handlePlay}>Start/Stop</button>
            <button id="reset" onClick={handleReset}>Reset</button>

            <audio
            id="beep" 
            preload="auto"
            src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
            />
        </div>
    )
}

export default App;