import React, { useContext } from "react";
import { AppContext } from "../Wordle";
import "../../../styles/GamePage.css";

function GameOver(){
    const{
        board,
        setBoard,
        currAttempt,
        gameOver,
        onSelectLetter,
        correctWord,
        onDelete,
    }=useContext(AppContext);
    
    return(
        <div className="gameOver">
        <h3>
        {gameOver.guessedWord
        ? "You Correctly Guessed the word"
        : "You failed to guess the word"}
        </h3>
        <h1>Correct Word:{correctWord}</h1>
        {gameOver.guessedWord &&(
        <h3>You guessed in {currAttempt.attempt} attempts</h3>
        )}
        </div>
        
        );
}

export default GameOver;