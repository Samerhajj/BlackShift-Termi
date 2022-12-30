import React from "react";
import { AppContext } from "../Wordle";
import "../../../styles/GamePage.css";

function Letter({letterPos,attemptVal}){
    const {board,setDisabledLetters,currAttempt,correctWord}=
    React.useContext(AppContext);
    
    const letter=board[attemptVal][letterPos];
    const correct=correctWord.toUpperCase()[letterPos]===letter;
    const almost=
    !correct&&letter !=="" &&correctWord.toUpperCase().includes(letter);
    const letterState =
    currAttempt.attempt > attemptVal &&
    (correct ? "correct" : almost ? "almost" :"error");
    
    React.useEffect(()=>{
        if(letter!=="" &&!correct &&!letter){
            console.log(letter);
            setDisabledLetters((prev)=>[...prev,letter]);
        }
    },[currAttempt.attempt]);
    return(
        <div className="letter" id={letterState}>
        {letter}
        </div>
        );
}
export default Letter;