import React, { useEffect, useRef, useState } from "react";
import { createLetterMatrix } from "./words";
import "./HangmanGame.css";

const Game = ({ verifyLetter, pickedWord, pickedCategory, letters, guessedLetters = [], wrongLetters = [], guesses, score }) => {
  const inputLetterRef = useRef(null);
  const [letterOptions, setLetterOptions] = useState(createLetterMatrix(pickedWord));

  const handleSubmit = (guess) => {
    verifyLetter(guess);
    inputLetterRef.current.focus();
  };

  const checkIfAlreadyGuessed = (l) =>
    guessedLetters.includes(l) || wrongLetters.includes(l);

  useEffect(() => {
    setLetterOptions(createLetterMatrix(pickedWord));
  }, [pickedWord]);

  return (
    <div className="game">
      <p className="points">
        <center>
          <span>סהכ ניקוד {score}</span>
        </center>
      </p>

      <h3 className="tip">
        <center>
          <span>{pickedCategory} קטגוריה </span>
        </center>
      </h3>

      <center>
        <p> נסיונות {guesses} נותרו</p>
      </center>

      <div className="wordContainer">
        {letters && letters.map((letter, i) =>
           guessedLetters.includes(letter) ? (
             <span key={i} className="letter">
               <center> {letter} </center>
             </span>
           ) : (
             <span key={i} className="blankSquare"></span>
           )
        )}
      </div>

      <section className="letters-table">
        {letterOptions.map((l) => (
          <span
            className={`letter-opt ${
              checkIfAlreadyGuessed(l) ? "guessed" : ""
            }`}
            onClick={() => handleSubmit(l)}
            key={l}
          >
            {l}
          </span>
        ))}
      </section>

      <div className="wrongLetterContainter">
        <p>האותיות שלא מופיעות במילה באדום </p>

        {wrongLetters.map((letter, i) => (
          <span key={i}>{letter}, </span>
        ))}
        <p>    נסה אות אחרת בבקשה</p>
      </div>
    </div>
  );
};

export default Game;
