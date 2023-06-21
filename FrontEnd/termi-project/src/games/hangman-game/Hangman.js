// React
import React, {useEffect, useState, useContext , useCallback} from "react";

// Logic
import { createLetterMatrix } from "./words";

// Translate
import { useTranslation } from 'react-i18next';

// CSS and Elements
import "./HangmanGame.css";
import "../GamesStyles.css";
import hangman1 from "./images/0.jpg";
import hangman2 from "./images/1.jpg";
import hangman3 from "./images/2.jpg";
import hangman4 from "./images/3.jpg";
import hangman5 from "./images/4.jpg";
import hangman6 from "./images/5.jpg";
import hangman7 from "./images/6.jpg";
import { MdOutlineReplay, MdArrowBack } from "react-icons/md";
import correctSound from './sounds/correct.mp3';
import wrongSound from './sounds/wrong.mp3';
import HangmanGameBG from "./HangmanGameBG/HangmanGameBG";

// Components
import Menu from "../Menu/Menu";
import LanguageSelector from '../../components/LanguageSelector';
import {LoginContext} from "../../components/LoginContext";

// API
import GamesApi from '../../api/GamesAPI';
import LanguageMap from '../../api/LanguageAPI';
import GameHistoryAPI from '../../api/GameHistoryAPI';
import NotificationsAPI from '../../api/NotificationsAPI';


import useInterval from './useInterval';

const Game = ({ actualGuesses = 7, pickedCategory }) => {
  const {userData, setUserData} = useContext(LoginContext);
  
  const [correctAudio, setCorrectAudio] = useState(new Audio(correctSound));
  const [wrongAudio, setWrongAudio] = useState(new Audio(wrongSound));
 	const { t, i18n } = useTranslation();
  const all_letters_en = 'abcdefghijklmnopqrstuvwxyz';
    const all_letters_he = 'אבגדהוזחטיכלמנסעפצקרשת';
      const all_letters_ar = 'أبتثجحخدذرزسشصضطظعغفقلمنهوي';
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
  const [score, setScore] = useState(0);
  const [myAnswer, setMyAnswer] = useState([]);
  const [myQuestion, setMyQuestion] = useState([]);

	const [category, setCategory] = useState(userData.field);
  const[showGame,setShowGame] = useState(false);

	const [musicPlaying, setMusicPlaying] = useState(true);
	const toggleMusic = () => setMusicPlaying(!musicPlaying);
	
const [elapsedTime, setElapsedTime] = useState(5 * 60);

const [timerActive, setTimerActive] = useState(false);
	
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
    setScore(0);
    setElapsedTime(5 * 60);
  };
  



useEffect(() => {
    if (i18n.language === 'en') {
      handleShowGame1();
    }
    if (i18n.language === 'he') {
      handleShowGame2();
    }
    if (i18n.language === 'ar') {
      handleShowGame3();
    } 
  }, [i18n.language]);

const getPointsText = () => {
  if (i18n.language === 'en') {
    return "Points";
  }
  if (i18n.language === 'he') {
    return "נקודות";
  }
  if (i18n.language === 'ar') {
    return "نقاط";
  }
};
  
useEffect(() => {
  if (guessedLetters1.length === uniqueLetters1.length && uniqueLetters1.length !== 0) {
    
    setScore((currentScore) => currentScore + 10);
    fetchQuestions2();
  }


}, [guessedLetters1, uniqueLetters1, fetchQuestions2]);

useEffect(() => {
  if (guessedLetters2.length === uniqueLetters2.length && uniqueLetters2.length !== 0) {
    setScore((currentScore) => currentScore + 10);
    fetchQuestions2();
  }


}, [guessedLetters2, uniqueLetters2, fetchQuestions2]);

useEffect(() => {
  if (guessedLetters3.length === uniqueLetters3.length && uniqueLetters3.length !== 0) {
    
    setScore((currentScore) => currentScore + 10);
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
    const res = await GamesApi.random(numOfTerms, category, "Hangman Game");

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
      NotificationsAPI.errorNotification(res.message);
      return false;
    }
  } catch (error) {
    console.log(error);
    NotificationsAPI.errorNotification("An error occurred while fetching questions.");
    return false;
  }
};




  const checkIfAlreadyGuessed1 = (l) =>
  guessedLetters1.includes(l) || wrongLetters1.includes(l);
  
  const checkIfAlreadyGuessed2 = (l) =>
  guessedLetters2.includes(l) || wrongLetters2.includes(l);

  const checkIfAlreadyGuessed3 = (l) =>
  guessedLetters3.includes(l) || wrongLetters3.includes(l);
  
  useEffect(() => {
  if (hangmanImage === 7) {
    finishGame(score);
  }
}, [hangmanImage, finishGame, score]);
  
  const finishGame = async(score) => {
    
    console.log(score);
    
  const response = await GamesApi.updatePoints(userData._id, score, 'Hangman', category);
  
  if(response.success) {
    setUserData({...userData, points: userData.points + score});
    
    const addToHistory = await GameHistoryAPI.updateGameHistory(userData._id, 'Hangman', score);

  } else {
    console.log(response.message);
  }
};
  
  const handleGoBack = () => {
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
    setScore(0);
    setShowGame(false);
    setElapsedTime(0);
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

  useEffect(() => {
    
   setHangmanImage(0);
  }, [pickedWord1] ,[pickedWord2] , [pickedWord3]); 
  
  
  
  
const formatTime = (time) => {
  const remainingTime = time; // Start from 3 minutes 
  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

useInterval(() => {
  if (timerActive && elapsedTime > 0) {
    setElapsedTime(elapsedTime - 1);
  } else { 
    setHangmanImage(7);
  }
}, 1000);

useEffect(() => {
  if (letters1.length > 0) {
    setTimerActive(true); // Start the timer when the first letter appears
  }
}, [letters1]);

return (
  <div  className="game">
  <HangmanGameBG/>
    {!showGame ? (
			  <Menu
			    gameName="Hangman"
			    handleMusicToggle={toggleMusic}
			    musicPlaying={musicPlaying}
			    edition={"Ocean Man"}
			    handleStart={async () => {
            const shouldStart = await fetchQuestions2();
            if (shouldStart) {
              setShowGame(true);
              setElapsedTime(5 * 60);
            }
          }}
          settings={
        			{
        				category: {initialCategory: category, categoryChanged: (newCategory => setCategory(newCategory))},
  						}}
			  />
    ) : (
      <>
				<div dir="ltr" className="box">
					<div className="d-flex flex-wrap justify-content-between">
						<a className="exit-button" role='button' onClick={() => handleGoBack()}>
              	<MdArrowBack/>
          	</a>
          	<LanguageSelector/>
        	</div>
              {hangmanImage === 7 ? (
              
                <div dir={LanguageMap[i18n.language].dir} className="score-box">
                  <h4>Congratulations!</h4>
                  <h4> Score is</h4>
                  <h4>{t('games.backword-definition.pg')}: {score}</h4>
                  <MdOutlineReplay
                    className="restart-button"
                    
                    onClick={() => {
                      init();
                      fetchQuestions2();
                    }}
                  
                  />
                  
 
                </div>
              ) : (
                <>
                  <p className="points">
                    <center>
                      <span>
                        {getPointsText()} {score}
                      </span>
                    </center>
                  </p>
                    {showGame1 && (
                      <Game1
                      formatTime={formatTime}
                      elapsedTime = {elapsedTime}
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
                                            formatTime={formatTime}
                      elapsedTime = {elapsedTime}
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
                                            formatTime={formatTime}
                      elapsedTime = {elapsedTime}
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
          </div>
      </>
    )}
  </div>
);




  };
function Game1({ formatTime ,elapsedTime , letterOptions1, checkIfAlreadyGuessed1, handleSubmit1, letters1, guessedLetters1, wrongLetters1,  hangmanImage, pickedWord1, correctAudio, wrongAudio, questions, myQuestion }) {
  const handleAudioPlay = (audio) => {
    audio.currentTime = 0;
    audio.play();
  };



  useEffect(() => {
    handleSubmit1(" ");
  }, [letters1]); 

  return (
    <div className=" d-flex flex-column align-items-center justify-items-center ">
          <div className="timer">
        {formatTime(elapsedTime)}
      </div>
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
      <div className=" mt-3 d-flex flex-wrap">
      {letters1.map((letter1, i) =>
        guessedLetters1.includes(letter1) ? (
<span key={i} className="letter" style={letter1 === " " && guessedLetters1.includes(letter1) ? { backgroundColor: "transparent", borderColor: "transparent" } : { backgroundColor: "white", borderColor: "black" }}>
  <center>
    {letter1}
  </center>
</span>

        ) : (
          <span
            key={i}
            className="blankSquare2"
           
          ></span>
        )
      )}
      </div>

  <center className="text-white">
  <div className = "question-color">
    {letters1.length > 0 && <span>{myQuestion.english} </span>}
    </div>
  </center>


      <section className="letters-table" style={{ marginTop: "0px" }} >
        {letterOptions1.map((l) => {
let buttonClassName = "letter-opt letter-opt-default";
if (!guessedLetters1.includes(l) && !pickedWord1.includes(l)) {
  buttonClassName += " default-guess";
} else if (guessedLetters1.includes(l) && pickedWord1.includes(l)) {
  buttonClassName += " correct-guess";
} else if (guessedLetters1.includes(l) && !pickedWord1.includes(l)) {
  buttonClassName += " wrong-guess";
}

return (
  <span
    className={buttonClassName}
    onClick={() => {
      if (pickedWord1.includes(l)) {
        handleSubmit1(correctAudio);
      } else {

      }
      handleSubmit1(l);
      //console.log(pickedWord1);
    }}
    key={l}
    style={guessedLetters1.includes(l) ? { opacity: "0.5" } : null}
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
  
function Game2({ formatTime ,elapsedTime , letterOptions2, checkIfAlreadyGuessed2, handleSubmit2, letters2, guessedLetters2, wrongLetters2, hangmanImage, pickedWord2, correctAudio, wrongAudio, questions, myQuestion }) {
  const handleAudioPlay = (audio) => {
    audio.currentTime = 0;
    audio.play();
  };
  useEffect(() => {
    handleSubmit2(" ");
  }, [letters2]); 
  return (
    <div className="d-flex flex-column align-items-center justify-items-center ">
              <div className="timer">
        {formatTime(elapsedTime)}
      </div>
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
      <div className="hebrewContainer mt-3 d-flex flex-wrap">
        {letters2.map((letter2, i) =>
          guessedLetters2.includes(letter2) ? (
<span key={i} className="letter" style={letter2 === " " && guessedLetters2.includes(letter2) ? { backgroundColor: "transparent", borderColor: "transparent" } : { backgroundColor: "white", borderColor: "black" }}>
  <center>
    {letter2}
  </center>
</span>
          ) : (
            <span
              key={i}
              className="blankSquare2"
            ></span>
          )
        )}
      </div>
     
        <center className="text-white">
         <div className = "question-color">
          {letters2.length > 0 && <span>{myQuestion.hebrew} </span>}
           </div>
        </center>
     
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
                //console.log(pickedWord2);
              }}
              key={l}
              style={guessedLetters2.includes(l) ? { opacity: "0.5" } : null}
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



  
function Game3({ formatTime ,elapsedTime , letterOptions3, checkIfAlreadyGuessed3, handleSubmit3, letters3, guessedLetters3, wrongLetters3,  hangmanImage, pickedWord3, correctAudio, wrongAudio, questions, myQuestion }) {


  const handleAudioPlay = (audio) => {
    audio.currentTime = 0;
    audio.play();
  };

  useEffect(() => {
    handleSubmit3(" ");
  }, [letters3]); 
  return (
   <div className=" d-flex flex-column align-items-center justify-items-center   ">
             <div className="timer">
        {formatTime(elapsedTime)}
      </div>
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
     <div className="hebrewContainer mt-3 d-flex flex-wrap">
        {letters3.map((letter3, i) =>
          guessedLetters3.includes(letter3) ? (
<span key={i} className="letter" style={letter3 === " " && guessedLetters3.includes(letter3) ? { backgroundColor: "transparent", borderColor: "transparent" } : { backgroundColor: "white", borderColor: "black" }}>
  <center>
    {letter3}
  </center>
</span>
          ) : (
            <span
              key={i}
              className="blankSquare2"
              style={{ marginTop: "0px" }}
            ></span>
          )
        )}
  </div>
  
    <center className="text-white">
     <div className = "question-color">
      {letters3.length > 0 && <span>{myQuestion.arabic} </span>}
       </div>
    </center>

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
                  //console.log(pickedWord3);
                }}
                key={l}
                style={guessedLetters3.includes(l) ? { opacity: "0.5" } : null}
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

