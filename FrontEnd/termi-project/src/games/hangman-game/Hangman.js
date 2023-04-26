import React, {useEffect, useState, useContext , useCallback} from "react";
import { createLetterMatrix } from "./words";
import LanguageMap from '../../api/LanguageAPI';
import { useTranslation } from 'react-i18next';
import { MdOutlineReplay } from "react-icons/md";
import CategorySelector from "../../components/CategorySelector";
import { AiFillPlayCircle } from "react-icons/ai";

import "./HangmanGame.css";
import hangman1 from "./images/0.jpg";
import hangman2 from "./images/1.jpg";
import hangman3 from "./images/2.jpg";
import hangman4 from "./images/3.jpg";
import hangman5 from "./images/4.jpg";
import hangman6 from "./images/5.jpg";
import hangman7 from "./images/6.jpg";

import correctSound from './sounds/correct.mp3';
import wrongSound from './sounds/wrong.mp3';
import {LoginContext} from "../../components/LoginContext";
import GamesApi from '../../api/GamesAPI';


const Game = ({ actualGuesses = 7, pickedCategory }) => {
  
  const [correctAudio, setCorrectAudio] = useState(new Audio(correctSound));
  const [wrongAudio, setWrongAudio] = useState(new Audio(wrongSound));
 	const { t, i18n } = useTranslation();
  const all_letters_en = 'abcdefghijklmnopqrstuvwxyz';
    const all_letters_he = 'אבגדהוזחטיכלמנסעפצקרשת';
      const all_letters_ar = 'دذرزسشصضطظعغفقكلمنهـوي';
  const [showGame1, setShowGame1] = useState(true);
    const [showGame2, setShowGame2] = useState(false);
        const [showGame3, setShowGame3] = useState(false);
  const [pickedWord1, setPickedWord1] = useState("");
    const [pickedWord2, setPickedWord2] = useState("");
        const [pickedWord3, setPickedWord3] = useState("");
  const [letters1, setLetters1] = useState([]);
    const [letters2, setLetters2] = useState([]);
        const [letters3, setLetters3] = useState([]);
  const [guessedLetters1, setGuessedLetters1] = useState([]);
    const [guessedLetters2, setGuessedLetters2] = useState([]);
        const [guessedLetters3, setGuessedLetters3] = useState([]);
  const [wrongLetters1, setWrongLetters1] = useState([]);
    const [wrongLetters2, setWrongLetters2] = useState([]);
        const [wrongLetters3, setWrongLetters3] = useState([]);
  const [guesses, setGuesses] = useState(7);
  const [letterOptions1, setLetterOptions1] = useState([]);
    const [letterOptions2, setLetterOptions2] = useState([]);
        const [letterOptions3, setLetterOptions3] = useState([]);
  const [hangmanImage, setHangmanImage] = useState(0);
  const [questions, setQuestions] = useState([""]);
  const uniqueLetters1 = Array.from(new Set(letters1));
    const uniqueLetters2 = Array.from(new Set(letters2));
        const uniqueLetters3 = Array.from(new Set(letters3));
  const [score, setScore] = useState(1);
  const [myAnswer, setMyAnswer] = useState([]);
  const [myQuestion, setMyQuestion] = useState([]);

	const [category, setCategory] = useState(0);
  const[showGame,setShowGame] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  	const {userData, setUserData} = useContext(LoginContext);
  
  	const changeCategory = (newCategory) => {
		setCategory(newCategory);
	};
  
  const init = () => {
  

  setPickedWord1("");
  setPickedWord2("");
  setPickedWord3("");
  setLetters1([]);
  setLetters2([]);
  setLetters3([]);
  setGuessedLetters1([]);
  setGuessedLetters2([]);
  setGuessedLetters3([]);
  setWrongLetters1([]);
  setWrongLetters2([]);
  setWrongLetters3([]);
  setGuesses(7);
  setLetterOptions1([]);
  setLetterOptions2([]);
  setLetterOptions3([]);
  setHangmanImage(0);
  setScore(1);
  
  
  
};
  
  
useEffect(() => {
  if (guessedLetters1.length === uniqueLetters1.length && uniqueLetters1.length !== 0) {
    
    setScore((currentScore) => currentScore + 1);
    fetchQuestions2();
  }


}, [guessedLetters1, uniqueLetters1, fetchQuestions2]);

useEffect(() => {
  if (guessedLetters2.length === uniqueLetters2.length && uniqueLetters2.length !== 0) {
    setScore((currentScore) => currentScore + 1);
    fetchQuestions2();
  }


}, [guessedLetters2, uniqueLetters2, fetchQuestions2]);


useEffect(() => {
  if (guessedLetters3.length === uniqueLetters3.length && uniqueLetters3.length !== 0) {
    
    setScore((currentScore) => currentScore + 1);
    fetchQuestions2();
  }


}, [guessedLetters3, uniqueLetters3, fetchQuestions2]);



const setUpGameState1 = (selectedWord) => {
  
  const lowerCaseWord = selectedWord.toLowerCase();
  setPickedWord1(lowerCaseWord);

  const lettersArray = lowerCaseWord.split("");
  setLetters1(lettersArray);

  setLetterOptions1(createLetterMatrix(lettersArray, all_letters_en));
};
const setUpGameState2 = (selectedWord) => {
  const lowerCaseWord = selectedWord.toLowerCase();
  setPickedWord2(lowerCaseWord);

  const lettersArray = lowerCaseWord.split("");
  setLetters2(lettersArray);

  setLetterOptions2(createLetterMatrix(lettersArray, all_letters_he));
};

const setUpGameState3 = (selectedWord) => {
  
  const lowerCaseWord = selectedWord.toLowerCase();
  setPickedWord3(lowerCaseWord);

  const lettersArray = lowerCaseWord.split("");
  setLetters3(lettersArray);

  setLetterOptions3(createLetterMatrix(lettersArray, all_letters_ar));
};





  useEffect(() => {
    if (i18n.language === 'en') {
      
        
          handleShowGame1();
    }
    if (i18n.language === 'he') 
    {
       
          handleShowGame2();
    }
        if (i18n.language === 'ar') 
    {
      
          handleShowGame3();
    } 
  }, [i18n.language ]);


  
  const handleShowGame1 = () => {
  setShowGame1(true);
   setShowGame2(false);
     setShowGame3(false);
};

const handleShowGame2 = () => {
  setShowGame1(false);
    setShowGame2(true);
     setShowGame3(false);

};
const handleShowGame3 = () => {
  setShowGame1(false);
    setShowGame2(false);
      setShowGame3(true);

};
const fetchQuestions2 = async () => {
  try {
    
 
    setPickedWord1("");
      setPickedWord2("");
        setPickedWord3("");
    setLetters1([]);
        setLetters2([]);
                setLetters3([]);
    setGuessedLetters1([]);
        setGuessedLetters2([]);
                setGuessedLetters3([]);
    setWrongLetters1([]);
        setWrongLetters2([]);
          setWrongLetters3([]);
    setLetterOptions1([]);
        setLetterOptions2([]);
          setLetterOptions3([]);
 

    const numOfTerms = 5;
    let allQuestions = [];
    const res = await GamesApi.random(numOfTerms, category, "hangMan");

    if (res.success) {
      const terms = res.body;
      
 

      for (let i = 0; i < terms.length; i++) {
        const numberOfAnswers = 4;
        const answers = new Array(numberOfAnswers);
        const correctIndex = Math.floor(Math.random() * numberOfAnswers);
        const usedIndices = new Set();

        for (let answerIndex = 0; answerIndex < numberOfAnswers; answerIndex++) {
          if (answerIndex === correctIndex) {
            answers[correctIndex] = {
              answerText: terms[i].conceptName,
              isCorrect: true,
            };
          } else {
            let wrongTermIndex;
            do {
              wrongTermIndex = Math.floor(Math.random() * terms.length);
            } while (usedIndices.has(wrongTermIndex) || wrongTermIndex === i);
            answers[answerIndex] = {
              answerText: terms[wrongTermIndex].conceptName,
              isCorrect: false,
            };
            usedIndices.add(wrongTermIndex);
          }
        }

        const newQuestion = {
          questionText: terms[i].shortDefinition,
          answerOptions: answers,
        };
        allQuestions.push(newQuestion);
      }

      setQuestions(allQuestions);

      const question1 = allQuestions[0];
      const answer1 = question1.questionText;
      const correctAnswer1 = question1.answerOptions.find(
        (option) => option.isCorrect
      ).answerText;

      setMyAnswer([correctAnswer1]);
      setMyQuestion(answer1);

     

      setUpGameState1(correctAnswer1.english);
            setUpGameState2(correctAnswer1.hebrew);
                        setUpGameState3(correctAnswer1.arabic);
      return true;
    } else {
      setErrorMessage(res.message);
      return false;
    }
  } catch (error) {
    console.log(error);
    setErrorMessage("An error occurred while fetching questions.");
    return false;
  }
};




const handleSubmit1 = useCallback((l) => {
  if (pickedWord1.includes(l)) {
    if (!guessedLetters1.includes(l)) {
      setGuessedLetters1((actualGuessedLetters) => [ ...actualGuessedLetters, l ]);
    }
  } else {
    if (!wrongLetters1.includes(l)) {
      setWrongLetters1((actualWrongLetters) => [...actualWrongLetters, l]);
      setGuesses((actualGuesses) => actualGuesses - 1);
      setHangmanImage(hangmanImage + 1);
    }
  }
}, [pickedWord1, guessedLetters1, wrongLetters1]);


const handleSubmit2 = useCallback((l) => {
  if (pickedWord2.includes(l)) {
    if (!guessedLetters2.includes(l)) {
      setGuessedLetters2((actualGuessedLetters) => [ ...actualGuessedLetters, l ]);
    }
  } else {
    if (!wrongLetters2.includes(l)) {
      setWrongLetters2((actualWrongLetters) => [...actualWrongLetters, l]);
      setGuesses((actualGuesses) => actualGuesses - 1);
      setHangmanImage(hangmanImage + 1);
    }
  }
}, [pickedWord2, guessedLetters2, wrongLetters2]);

const handleSubmit3 = useCallback((l) => {
  if (pickedWord3.includes(l)) {
    if (!guessedLetters3.includes(l)) {
      setGuessedLetters3((actualGuessedLetters) => [ ...actualGuessedLetters, l ]);
    }
  } else {
    if (!wrongLetters3.includes(l)) {
      setWrongLetters3((actualWrongLetters) => [...actualWrongLetters, l]);
      setGuesses((actualGuesses) => actualGuesses - 1);
      setHangmanImage(hangmanImage + 1);
    }
  }
}, [pickedWord3, guessedLetters3, wrongLetters3]);


  const checkIfAlreadyGuessed1 = (l) =>
    guessedLetters1.includes(l) || wrongLetters1.includes(l);
    const checkIfAlreadyGuessed2 = (l) =>
    guessedLetters2.includes(l) || wrongLetters2.includes(l);

    const checkIfAlreadyGuessed3 = (l) =>
    guessedLetters3.includes(l) || wrongLetters3.includes(l);

return (
  <div className="game">
    {!showGame ? (
      <div className="icon-selector-container">
        <CategorySelector
          category={category}
          categoryChanged={(newCategory) => {
            changeCategory(newCategory);
          }}
        />
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <div className="icon-center">
<AiFillPlayCircle
  className="icon-button"
  onClick={async () => {
    const shouldStart = await fetchQuestions2();
    if (shouldStart) {
      setShowGame(true);
    }
  }}
/>

        </div>
      </div>
    ) : (
      <>
        {hangmanImage === 7 ? (
          <div className="score-box">
            <h4>Congratulations!</h4>
            <h4> number of rounds  survived</h4>
            <h4>{t('games.backword-definition.pg')}: {score}  YOU! survived</h4>
            <MdOutlineReplay
              className="icon-button"
              onClick={() => {
                init();
                fetchQuestions2();
              }}
            />
          </div>
        ) : (
          <>
            <p className="points" style={{ marginTop: '20px' }}>
              <center>
                <span>סיבוב מספר # {score}</span>
              </center>
            </p>
            {showGame1 && (
              <Game1
                      letterOptions1={letterOptions1}
          checkIfAlreadyGuessed1={checkIfAlreadyGuessed1}
          handleSubmit1={handleSubmit1}
          letters1={letters1}
          guessedLetters1={guessedLetters1}
          wrongLetters1 = {wrongLetters1 }
          hangmanImage={hangmanImage}
          pickedWord1 = {pickedWord1}
          correctAudio = {correctAudio}
          wrongAudio = {wrongAudio}
          questions = {questions}
          myQuestion = {myQuestion}
              />
            )}
            {showGame2 && (
              <Game2
                          letterOptions2={letterOptions2}
            checkIfAlreadyGuessed2={checkIfAlreadyGuessed2}
            handleSubmit2={handleSubmit2}
            letters2={letters2}
            guessedLetters2={guessedLetters2}
            hangmanImage={hangmanImage}
            pickedWord2 = {pickedWord2}
            correctAudio = {correctAudio}
            wrongAudio = {wrongAudio}   
            questions = {questions}
            myQuestion = {myQuestion}
              />
            )}
            {showGame3 && (
              <Game3
                          letterOptions3={letterOptions3}
            checkIfAlreadyGuessed3={checkIfAlreadyGuessed3}
            handleSubmit3={handleSubmit3}
            letters3={letters3}
            guessedLetters3={guessedLetters3}
            hangmanImage={hangmanImage}
            pickedWord3 = {pickedWord3}
            correctAudio = {correctAudio}
            wrongAudio = {wrongAudio}   
            questions = {questions}
            myQuestion = {myQuestion}
              />
            )}
          </>
        )}
      </>
    )}
  </div>
);




  };
function Game1({ letterOptions1, checkIfAlreadyGuessed1, handleSubmit1, letters1, guessedLetters1, wrongLetters1,  hangmanImage, pickedWord1, correctAudio, wrongAudio, questions, myQuestion }) {


  const handleAudioPlay = (audio) => {
    audio.currentTime = 0;
    audio.play();
  };


  return (
    <div>
<div className="hangman-img">
  {letters1.length > 0 && (
    <img
      src={
        hangmanImage === 0
          ? hangman1
          : hangmanImage === 1
          ? hangman2
          : hangmanImage === 2
          ? hangman3
          : hangmanImage === 3
          ? hangman4
          : hangmanImage === 4
          ? hangman5
          : hangmanImage === 5
          ? hangman6
          : hangman7
      }
      alt={`Hangman stage ${hangmanImage}`}
      className="hangman-img__img"
    />
  )}
</div>

      {letters1.map((letter1, i) =>
        guessedLetters1.includes(letter1) ? (
          <span key={i} className="letter">
            <center> {letter1} </center>
          </span>
        ) : (
          <span
            key={i}
            className="blankSquare"
            style={{ marginTop: "0px" }}
          ></span>
        )
      )}

<div className="left-text">
  <center>
    {letters1.length > 0 && <span>{myQuestion.english}</span>}
  </center>
</div>

      <section className="letters-table" style={{ marginTop: "0px" }}>
        {letterOptions1.map((l) => {
          let buttonClassName = "letter-opt letter-opt-default";
          if (!guessedLetters1.includes(l) && !pickedWord1.includes(l)) {
            buttonClassName += " default-guess";
          } else if (
            guessedLetters1.includes(l) &&
            pickedWord1.includes(l)
          ) {
            buttonClassName += " correct-guess";
          } else if (
            guessedLetters1.includes(l) &&
            !pickedWord1.includes(l)
          ) {
            buttonClassName += " wrong-guess";
          }
          return (
            <span
              className={buttonClassName}
              onClick={() => {
                if (pickedWord1.includes(l)) {
                  handleAudioPlay(correctAudio);
                  
               
                } else {
                 
                }
                handleSubmit1(l);
              }}
              key={l}
            >
              {checkIfAlreadyGuessed1(l) && !pickedWord1.includes(l) ? (
                <span className="wrong-guess">{l}</span>
              ) : (
                <span>{l}</span>
              )}
            </span>
          );
        })}
      </section>
    </div>
  );
}
  
function Game2({ letterOptions2, checkIfAlreadyGuessed2, handleSubmit2, letters2, guessedLetters2, wrongLetters2,  hangmanImage, pickedWord2, correctAudio, wrongAudio, questions, myQuestion }) {


  const handleAudioPlay = (audio) => {
    audio.currentTime = 0;
    audio.play();
  };


  return (
    <div>
<div className="hangman-img">
  {letters2.length > 0 && (
    <img
      src={
        hangmanImage === 0
          ? hangman1
          : hangmanImage === 1
          ? hangman2
          : hangmanImage === 2
          ? hangman3
          : hangmanImage === 3
          ? hangman4
          : hangmanImage === 4
          ? hangman5
          : hangmanImage === 5
          ? hangman6
          : hangman7
      }
      alt={`Hangman stage ${hangmanImage}`}
      className="hangman-img__img"
    />
  )}
</div>
      {letters2.map((letter2, i) =>
        guessedLetters2.includes(letter2) ? (
          <span key={i} className="letter">
            <center> {letter2} </center>
          </span>
        ) : (
          <span
            key={i}
            className="blankSquare"
            style={{ marginTop: "0px" }}
          ></span>
        )
      )}

<div className="left-text">
  <center>
    {letters2.length > 0 && <span>{myQuestion.hebrew}</span>}
  </center>
</div>
      <section className="letters-table" style={{ marginTop: "0px" }}>
        {letterOptions2.map((l) => {
          let buttonClassName = "letter-opt letter-opt-default";
          if (!guessedLetters2.includes(l) && !pickedWord2.includes(l)) {
            buttonClassName += " default-guess";
          } else if (
            guessedLetters2.includes(l) &&
            pickedWord2.includes(l)
          ) {
            buttonClassName += " correct-guess";
          } else if (
            guessedLetters2.includes(l) &&
            !pickedWord2.includes(l)
          ) {
            buttonClassName += " wrong-guess";
          }
          return (
            <span
              className={buttonClassName}
              onClick={() => {
                if (pickedWord2.includes(l)) {
                  handleAudioPlay(correctAudio);
                  
            
                } else {
                  // handleAudioPlay(wrongAudio);
                }
                handleSubmit2(l);
              }}
              key={l}
            >
              {checkIfAlreadyGuessed2(l) && !pickedWord2.includes(l) ? (
                <span className="wrong-guess">{l}</span>
              ) : (
                <span>{l}</span>
              )}
            </span>
          );
        })}
      </section>
    </div>
  );
}

  
function Game3({ letterOptions3, checkIfAlreadyGuessed3, handleSubmit3, letters3, guessedLetters3, wrongLetters3,  hangmanImage, pickedWord3, correctAudio, wrongAudio, questions, myQuestion }) {


  const handleAudioPlay = (audio) => {
    audio.currentTime = 0;
    audio.play();
  };


  return (
    <div>
<div className="hangman-img">
  {letters3.length > 0 && (
    <img
      src={
        hangmanImage === 0
          ? hangman1
          : hangmanImage === 1
          ? hangman2
          : hangmanImage === 2
          ? hangman3
          : hangmanImage === 3
          ? hangman4
          : hangmanImage === 4
          ? hangman5
          : hangmanImage === 5
          ? hangman6
          : hangman7
      }
      alt={`Hangman stage ${hangmanImage}`}
      className="hangman-img__img"
    />
  )}
</div>
      {letters3.map((letter3, i) =>
        guessedLetters3.includes(letter3) ? (
          <span key={i} className="letter">
            <center> {letter3} </center>
          </span>
        ) : (
          <span
            key={i}
            className="blankSquare"
            style={{ marginTop: "0px" }}
          ></span>
        )
      )}

<div className="left-text">
  <center>
    {letters3.length > 0 && <span>{myQuestion.arabic}</span>}
  </center>
</div>
      <section className="letters-table" style={{ marginTop: "0px" }}>
        {letterOptions3.map((l) => {
          let buttonClassName = "letter-opt letter-opt-default";
          if (!guessedLetters3.includes(l) && !pickedWord3.includes(l)) {
            buttonClassName += " default-guess";
          } else if (
            guessedLetters3.includes(l) &&
            pickedWord3.includes(l)
          ) {
            buttonClassName += " correct-guess";
          } else if (
            guessedLetters3.includes(l) &&
            !pickedWord3.includes(l)
          ) {
            buttonClassName += " wrong-guess";
          }
          return (
            <span
              className={buttonClassName}
              onClick={() => {
                if (pickedWord3.includes(l)) {
                  handleAudioPlay(correctAudio);
                  
           
                } else {
                  // handleAudioPlay(wrongAudio);
                }
                handleSubmit3(l);
              }}
              key={l}
            >
              {checkIfAlreadyGuessed3(l) && !pickedWord3.includes(l) ? (
                <span className="wrong-guess">{l}</span>
              ) : (
                <span>{l}</span>
              )}
            </span>
          );
        })}
      </section>
    </div>
  );
}


export default Game;