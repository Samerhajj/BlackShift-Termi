import React, {useEffect, useState, useContext} from "react";
import { createLetterMatrix } from "./words";
import LanguageMap from '../../api/LanguageAPI';
import { useTranslation } from 'react-i18next';
import { MdOutlineReplay } from "react-icons/md";
import CategorySelector from "../../components/CategorySelector";


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
  
  
  
  


async function setQuestionsByLanguage(language) {
  try {
    const numOfTerms = 5;
    let allQuestions = [];
    const res = await GamesApi.random(numOfTerms, 0, "Memory Game");
    if (res.success) {
      let terms = res.body;
      for (var i = 0; i < terms.length; i++) {
        let numberOfAnswers = 4;
        let answers = new Array(numberOfAnswers);
        let correctIndex = Math.floor(Math.random() * numberOfAnswers);
        let usedIndexs = new Map();
        for(var answerIndex = 0; answerIndex < numberOfAnswers; answerIndex++){
          if(answerIndex == correctIndex){
            answers[correctIndex] = {answerText: terms[i].conceptName, isCorrect: true};
          } else {
            let wrongTermIndex = Math.floor(Math.random() * terms.length);
            if(usedIndexs.has(wrongTermIndex) || wrongTermIndex == i){
              answerIndex--;
              continue;
            }
            answers[answerIndex] = {answerText: terms[wrongTermIndex].conceptName, isCorrect: false};
            usedIndexs.set(wrongTermIndex);
          }
        }
        let newQuestion = {
          questionText: terms[i].shortDefinition,
          answerOptions: answers
        };
        allQuestions.push(newQuestion);
      }
      setQuestions(allQuestions);
    } else {
      console.log(res.message); 
    }
  } catch (error) {
    console.log(error); 
  }
}
  
  

  
  
  
  
  
  
  const [correctAudio, setCorrectAudio] = useState(new Audio(correctSound));
const [wrongAudio, setWrongAudio] = useState(new Audio(wrongSound));
 	const { t, i18n } = useTranslation();

  const all_letters_en = 'abcdefghijklmnopqrstuvwxyz';
  const all_letters_he = 'אבגדהוזחטיכלמנסעפצקרשת';
  const all_letters_ar = 'أبتثجحخدذرزسشصضطظعغفقكلمنهـوي'
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
  const [language, setLanguage] = useState("he");
  
  const [categories, setCategories] = useState([]);
  const [questions, setQuestions] = useState([]);

  const uniqueLetters1 = Array.from(new Set(letters1));
  
  const uniqueLetters2 = Array.from(new Set(letters2));
  const uniqueLetters3 = Array.from(new Set(letters3));
  const [score, setScore] = useState(-2);
  const [displayLanguage, setDisplayLanguage] = useState('');
  
  const {userData, setUserData} = useContext(LoginContext);
  const [category, setCategory] = useState(userData.field);
  //const [category, setCategory] = useState(userData.field);
  
  
  const ENGLISH_WORDS = ["enter", "left","gone","ok"];
  const ARABIC_WORDS = ["دخل", "يسار", "ذهب", "حسناً"];
  const HEBREW_WORDS = ["כניסה", "שמאלה", "הלך", "בסדר"];
  
const init = () => {

  setShowGame1(true);
  setShowGame2(false);
  setShowGame3(false);
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
  setScore(-2);
  setLanguage("en");
  
};

 



function MyComponent() {
  const { i18n } = useTranslation();
  const [displayLanguage, setDisplayLanguage] = useState('');
}
 

  useEffect(() => {
    if (i18n.language === 'en') {
      
          setQuestionsByLanguage('en');
          handleShowGame1();
    } else if (i18n.language === 'he') 
    {
          setQuestionsByLanguage('he');
          handleShowGame2();
    } else {
          setQuestionsByLanguage('ar');
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


	const changeCategory = (newCategory) => {
		setCategory(newCategory);
	};



const handleSubmit1 = (l) => {
  if (pickedWord1.includes(l)) {
    if (!guessedLetters1.includes(l)) {
      setGuessedLetters1((actualGuessedLetters) => [        ...actualGuessedLetters,        l,      ]);
      
    }
  } else {
    if (!wrongLetters1.includes(l)) {
      setWrongLetters1((actualWrongLetters) => [...actualWrongLetters, l]);
      setGuesses((actualGuesses) => actualGuesses - 1);
      setHangmanImage(hangmanImage + 1);
    }
  }
};

const handleSubmit2 = (l) => {
  if (pickedWord2.includes(l)) {
    if (!guessedLetters2.includes(l)) {
      setGuessedLetters2((actualGuessedLetters) => [        ...actualGuessedLetters,        l,      ]);
      
    }
  } else {
    if (!wrongLetters2.includes(l)) {
      setWrongLetters2((actualWrongLetters) => [...actualWrongLetters, l]);
      setGuesses((actualGuesses) => actualGuesses - 1);
      setHangmanImage(hangmanImage + 1);
    }
  }
};
const handleSubmit3 = (l) => {
  if (pickedWord3.includes(l)) {
    if (!guessedLetters3.includes(l)) {
      setGuessedLetters3((actualGuessedLetters) => [        ...actualGuessedLetters,        l,      ]);
      
    }
  } else {
    if (!wrongLetters3.includes(l)) {
      setWrongLetters3((actualWrongLetters) => [...actualWrongLetters, l]);
      setGuesses((actualGuesses) => actualGuesses - 1);
      setHangmanImage(hangmanImage + 1);
    }
  }
};



useEffect(() => {
  if ((guessedLetters1.length === uniqueLetters1.length) || (guessedLetters2.length === uniqueLetters2.length)|| (guessedLetters3.length === uniqueLetters3.length)) {
    //let correctAnswer = questions[0].answerOptions.find(option => option.isCorrect).answerText;
    //const newWord1 = questions[LanguageMap[i18n.language].name]; 
    const newWord1 = ENGLISH_WORDS[Math.floor(Math.random() * ENGLISH_WORDS.length)];
    const newWord2 = HEBREW_WORDS[Math.floor(Math.random() * HEBREW_WORDS.length)];
    const newWord3 = ARABIC_WORDS[Math.floor(Math.random() * ARABIC_WORDS.length)];
      
    setScore((currentScore) => currentScore + 1);
    setPickedWord1(newWord1);
    setPickedWord2(newWord2);
    setPickedWord3(newWord3);
    setLetters1(newWord1.split(""));
    setLetters2(newWord2.split(""));
    setLetters3(newWord3.split(""));
    setGuessedLetters1([]);
    setGuessedLetters2([]);
    setGuessedLetters3([]);
    setWrongLetters1([]);
    setWrongLetters2([]);
    setWrongLetters3([]);
    setLetterOptions1(createLetterMatrix(newWord1,all_letters_en));
    setLetterOptions2(createLetterMatrix(newWord2,all_letters_he));
    setLetterOptions3(createLetterMatrix(newWord3,all_letters_ar));
  }
}, [guessedLetters1, guessedLetters2, guessedLetters3, uniqueLetters1, uniqueLetters2, uniqueLetters3, pickedWord1, pickedWord2, pickedWord3, questions]);
useEffect(() => {
  setLetterOptions1(createLetterMatrix(pickedWord1,all_letters_en));
}, [pickedWord1]);

useEffect(() => {
  setLetterOptions2(createLetterMatrix(pickedWord2,all_letters_he));
}, [pickedWord2]);

useEffect(() => {
  setLetterOptions3(createLetterMatrix(pickedWord3,all_letters_ar));
}, [pickedWord3]);



useEffect(() => {
  
  const letterArr1 = Array.from(pickedWord1.toLocaleLowerCase());
  setGuessedLetters1([]);
  setWrongLetters1([]);
  setLetters1(letterArr1);
  
  
}, [pickedWord1]);

useEffect(() => {
  const letterArr2 = Array.from(pickedWord2.toLocaleLowerCase());
  setGuessedLetters2([]);
  setWrongLetters2([]);
  setLetters2(letterArr2);
}, [pickedWord2]);

useEffect(() => {
  const letterArr3 = Array.from(pickedWord3.toLocaleLowerCase());
  setGuessedLetters3([]);
  setWrongLetters3([]);
  setLetters3(letterArr3);
}, [pickedWord3]);






  const checkIfAlreadyGuessed1 = (l) =>
    guessedLetters1.includes(l) || wrongLetters1.includes(l);
    const checkIfAlreadyGuessed2 = (l) =>
    guessedLetters2.includes(l) || wrongLetters2.includes(l);
    const checkIfAlreadyGuessed3 = (l) =>
    guessedLetters3.includes(l) || wrongLetters3.includes(l);

  
  return (

    
  <div className="game">
      			<div className="banner banner_game">
				<div className="wrapper">
				    						<div className="icon-selector-container">
						
							<div className="icon-center">
							
						</div>
					</div><div className="banner_content"></div>
				</div>
				
			</div>
				<CategorySelector category={category} categoryChanged={(newCategory) => {changeCategory(newCategory)}}/>
    {hangmanImage === 7 ? (
      <div className="score-box">
        <h4>Congratulations!</h4>
        <h4> number of rounds  survived</h4>
        <h4>{t('games.backword-definition.pg')}: {score}  YOU! survived</h4>
        <MdOutlineReplay className="icon-button" onClick={() => init()} />
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
          hangmanImage={hangmanImage}
          pickedWord1 = {pickedWord1}
          correctAudio = {correctAudio}
          wrongAudio = {wrongAudio}
          questions = {questions}
         
          
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
          />
        )}
      </>
    )}
  </div>
);


  };
  
function Game1({ letterOptions1, checkIfAlreadyGuessed1, handleSubmit1, letters1, guessedLetters1, hangmanImage,  pickedWord1 ,correctAudio ,wrongAudio , questions  }) {

  const handleAudioPlay = (audio) => {
    audio.currentTime = 0;
    audio.play();
  }
  
  return (
   
    <div>
      
        
      <div className="hangman-img" >
        <img src={hangmanImage === 0 ? hangman1 : hangmanImage === 1 ? hangman2 : hangmanImage === 2 ? hangman3 : hangmanImage === 3 ? hangman4 : hangmanImage === 4 ? hangman5 : hangmanImage === 5 ? hangman6 : hangman7} alt={`Hangman stage ${hangmanImage}`} className="hangman-img__img" />
 
      </div>
      {letters1.map((letter1, i) =>
        guessedLetters1.includes(letter1) ? (
          <span key={i} className="letter" >
            <center> {letter1} </center>
          </span>
        ) : (
       
          <span key={i} className="blankSquare" style={{ marginTop: '0px' }}></span>
        )
      )}
           
       <div className="left-text"> <center><span></span> </center></div>
      <section className="letters-table" style={{ marginTop: '0px' }}>
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
                  handleAudioPlay(correctAudio);
                  console.log(questions[0]);
                  
                  
                } else {
                 // handleAudioPlay(wrongAudio);
                }
                handleSubmit1(l);
              }}
              key={l}
            >
              {checkIfAlreadyGuessed1(l) && !pickedWord1.includes(l)  ? (
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





 
  function Game2({ letterOptions2, checkIfAlreadyGuessed2, handleSubmit2, letters2, guessedLetters2, hangmanImage,  pickedWord2,correctAudio ,wrongAudio ,questions}) {
      const handleAudioPlay = (audio) => {
    audio.currentTime = 0;
    audio.play();
  }
    return (

      <div>
        <div className="hangman-img" >
          <img src={hangmanImage === 0 ? hangman1 : hangmanImage === 1 ? hangman2 : hangmanImage === 2 ? hangman3 : hangmanImage === 3 ? hangman4 : hangmanImage === 4 ? hangman5 : hangmanImage === 5 ? hangman6 : hangman7} alt={`Hangman stage ${hangmanImage}`} className="hangman-img__img" />
        </div>
        {letters2.map((letter2, i) =>
          guessedLetters2.includes(letter2) ? (
            <span key={i} className="letter">
              <center> {letter2} </center>
            </span>
          ) : (
            <span key={i} className="blankSquare" style={{ marginTop: '20px' }}></span>
          )
        )}
        <div className="left-text"> <center><span>משאבי אנוש, מתייחס לניהול של אנשים בתוך ארגון. זוהי מחלקה בתוך חברה או עסק שאחראית לגיוס, גיוס, הכשרה</span> </center></div>
        <section className="letters-table">
          {letterOptions2.map((l) => {
            let buttonClassName = "letter-opt letter-opt-default";
            if (!guessedLetters2.includes(l) && !pickedWord2.includes(l)) {
              buttonClassName += " default-guess";
            } else if (guessedLetters2.includes(l) && pickedWord2.includes(l)) {
              buttonClassName += " correct-guess";
            } else if (guessedLetters2.includes(l) && !pickedWord2.includes(l)) {
              buttonClassName += " wrong-guess";
            }
            return (
              <span
                className={buttonClassName}
              onClick={() => {
                if (pickedWord2.includes(l)) {
                  handleAudioPlay(correctAudio);
                   console.log(questions[0]);
                } else {
                 // handleAudioPlay(wrongAudio);
                }
                handleSubmit2(l);
              }}
                key={l}
              >
                {checkIfAlreadyGuessed2(l) && !pickedWord2.includes(l)  ? (
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
  
  
  function Game3({ letterOptions3, checkIfAlreadyGuessed3, handleSubmit3, letters3, guessedLetters3, hangmanImage,  pickedWord3,correctAudio ,wrongAudio }) {
      const handleAudioPlay = (audio) => {
    audio.currentTime = 0;
    audio.play();
  }
    return (
      <div>
        <div className="hangman-img">
          <img src={hangmanImage === 0 ? hangman1 : hangmanImage === 1 ? hangman2 : hangmanImage === 2 ? hangman3 : hangmanImage === 3 ? hangman4 : hangmanImage === 4 ? hangman5 : hangmanImage === 5 ? hangman6 : hangman7} alt={`Hangman stage ${hangmanImage}`} className="hangman-img__img" />
        </div>
        {letters3.map((letter3, i) =>
          guessedLetters3.includes(letter3) ? (
            <span key={i} className="letter">
              <center> {letter3} </center>
            </span>
          ) : (
            <span key={i} className="blankSquare" style={{ marginTop: '20px' }}></span>
          )
        )}
        <div className="left-text"> <center><span>الموارد البشرية ، تشير إلى إدارة الأشخاص داخل المنظمة. إنه قسم داخل شركة أو شركة مسؤولة عن التوظيف والتوظيف والتدريب</span> </center></div>
        <section className="letters-table">
          {letterOptions3.map((l) => {
            let buttonClassName = "letter-opt letter-opt-default";
            if (!guessedLetters3.includes(l) && !pickedWord3.includes(l)) {
              buttonClassName += " default-guess";
            } else if (guessedLetters3.includes(l) && pickedWord3.includes(l)) {
              buttonClassName += " correct-guess";
            } else if (guessedLetters3.includes(l) && !pickedWord3.includes(l)) {
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
                {checkIfAlreadyGuessed3(l) && !pickedWord3.includes(l)  ? (
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