// React
import React, {useEffect, useState, useContext, useRef} from "react";

// Translate
import { useTranslation } from 'react-i18next';

// Components
import Menu from "../Menu/Menu";
import LanguageSelector from '../../components/LanguageSelector';
import {LoginContext} from "../../components/LoginContext";
import useInterval from "./useInterval";

// Css and Elements
import "./BackDefinition.css";
import "../GamesStyles.css";
import { MdOutlineReplay, MdArrowBack } from "react-icons/md";
import DefinitionGameBG from "./DefinitionGameBG/DefinitionGameBG";
import Image from "react-bootstrap/Image";

// APIs
import LanguageMap from '../../api/LanguageAPI';
import GamesApi from '../../api/GamesAPI';
import GameHistoryAPI from '../../api/GameHistoryAPI';
import AchievementsAPI from '../../api/AchievementsAPI';
import NotificationsAPI from '../../api/NotificationsAPI';


const BackwordDefinition = () =>{
	  //localStorage.setItem('currentPage', 'BackDefinition')//test
	const {userData, setUserData} = useContext(LoginContext);
	// const { categories } = useContext(CategoriesContext);
    const streakCountRef = useRef(0);
	const { t, i18n } = useTranslation();
	const [questions, setQuestions] = useState([]);
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);
	const [start, setStart] = useState(false);
	const [message,setMessage]=useState('');
	const [disabled, setDisabled] = useState(false);
	const [isAchievementVisible, setIsAchievementVisible] = useState(false);
	const [achievedAchievement, setAchievedAchievement] = useState(null);

	const [highestStreak, setHighestStreak] = useState(0); // declare highestStreak variable using useState hook
	// Timer
	const [elapsedTime, setElapsedTime] = useState(0);
	const [timeLeft, setTimeLeft] = useState(30);
	const [points,setPoints]=useState(0);
	const [category, setCategory] = useState(userData.field);
	
	const [musicPlaying, setMusicPlaying] = useState(true);
	const toggleMusic = () => setMusicPlaying(!musicPlaying);	
	
	//useIntervaal
	useInterval(() => {
	    setElapsedTime(elapsedTime + 1);
	    setTimeLeft(timeLeft - 1);
	    if(timeLeft===0)
	    {
			const nextQuestion = currentQuestion + 1;
	        if (nextQuestion < questions.length) {
	          setCurrentQuestion(nextQuestion);
	          setTimeLeft(30);
		    }
		    else{
		    	finishGame(score, points);
		    }
		 }
	}, start && !showScore ? 1000 : null);
	
	useEffect(() => {
	    if (timeLeft === 0) {
			const correctAnswer = questions[currentQuestion].answerOptions.find(option => option.isCorrect).answerText[LanguageMap[i18n.language].name];
			setDisabled(true);
			setMessage(t('games.backword-definition.timeout')+'!'+t('games.backword-definition.correctanswer') +' : '+ correctAnswer);
			setTimeout(() => {
		        const nextQuestion = currentQuestion + 1;
		        if (nextQuestion < questions.length) {
		          setCurrentQuestion(nextQuestion);
		          setTimeLeft(30);
		          setMessage(null);
		          setDisabled(false);
		        } else {
		          finishGame(score, points);
		        }
	      }, 1000);// wait for 10 seconds before moving on
	    }
	  }, [timeLeft, currentQuestion]);
	  
	const initGame = async () => {
		console.log(category);
		setIsAchievementVisible(true);
		if(category !== undefined){
			let numOfTerms = 10;
			// let categoryId = category.categoryId;
			let numOfCards = numOfTerms * 2;
		    const res = await GamesApi.random(numOfTerms, category,"Definition Game");
			// get 10 random terms from category 0
	        if(res.success){
		        let terms = res.body;
		        let allQuestions = [];
		        
				for (var i = 0; i < terms.length; i++) {
					let numberOfAnswers = 4;
					
					let answers = new Array(numberOfAnswers);
					
					// get a random index for the correct answer
		        	let correctIndex = Math.floor(Math.random() * numberOfAnswers);
					let usedIndexs = new Map();
					
					// add the wrong answers
					for(var answerIndex = 0; answerIndex < numberOfAnswers; answerIndex++){
						if(answerIndex == correctIndex){
							// add the correct answer
							answers[correctIndex] = {answerText: terms[i].conceptName, isCorrect: true};
						}else{
							// random number for the wrong concept name
		        			let wrongTermIndex = Math.floor(Math.random() * terms.length);
		        			
		        			// check if the term alre	ady in the answers or its the correct answer
							if(usedIndexs.has(wrongTermIndex) || wrongTermIndex == i){
								answerIndex--;
								continue;
							}
							
							// add the wrong answers
							answers[answerIndex] = {answerText: terms[wrongTermIndex].conceptName, isCorrect: false};
							usedIndexs.set(wrongTermIndex);
						}
					}
					
					// create the full question
					let newQuestion = {
						questionText: terms[i].shortDefinition,
						answerOptions: answers
					};
					
					// add the new question to the questions array
					allQuestions.push(newQuestion);
				}
				setQuestions(allQuestions);
			    setElapsedTime(0);  // reset elapsed time to 0
			    setShowScore(false);  // hide the score modal
			    setCurrentQuestion(0);  // reset the current question to the first question
				setScore(0);
				setPoints(0);
				setTimeLeft(30);  // reset the time left
				setStart(true);
				setDisabled(false);
				setMessage("");
	        }else{
	    		NotificationsAPI.errorNotification(res.message);
		    }
			}
		else{
			alert("Must choose a category first");
		}
	};
	
  const handleAnswerOptionClick = (event, isCorrect) => {
    setDisabled(true);
    const correctAnswer = questions[currentQuestion].answerOptions.find(option => option.isCorrect).answerText[LanguageMap[i18n.language].name];
    
    if (isCorrect) {
    	
      streakCountRef.current += 1;
      if(streakCountRef>highestStreak){
      highestStreak=streakCountRef;
      }
      console.log(highestStreak);
      setScore(score + 1);
      setPoints(points + 10);
      setMessage(t('games.backword-definition.correctanswer'));
      event.target.classList.add('btn-success');
    } else {
      event.target.classList.add('btn-danger');
      setMessage(t('games.backword-definition.wronganswer')+' : ' + correctAnswer);
      streakCountRef.current = 0;
    };
    	
		
	
		setTimeout(() => {
			// reset the classes of the answer options
			event.target.classList.remove('btn-success');
			event.target.classList.remove('btn-danger');
			setDisabled(false);
	
	
		const nextQuestion = currentQuestion + 1;
				if (nextQuestion < questions.length) {
					// stopTimer();
					// setTimer(30);
						setTimeLeft(30);
				setMessage('');
					// startTimer();
			setCurrentQuestion(nextQuestion);
			
		} else {
			// setScore(score + (isCorrect ? 1:0));
			finishGame(score + (isCorrect ? 1:0), points + (isCorrect ? 10:0));
		
		}
		//reset timer and message
		},1000);
	};
	
	const finishGame = async (score, points) => {
		console.log(score);
		setShowScore(true);
		// const points = score * 10;
		// setPoints(points);
		
		const response = await GamesApi.updatePoints(
	    userData._id,
	    points,
	    "Definition Game",
	    category
	  );
	  if (response.success) {
	    setUserData({ ...userData, points: userData.points + points });
	    localStorage.setItem("points", points);
	    const addToHistory = await GameHistoryAPI.updateGameHistory(
	      userData._id,
	      "Backward",
	      points
	    );
	    
		// Check if the user earned the Three-Answer Streak achievement
		let threeAnswerStreakAchievement = null;
		if (highestStreak >= 2) {
		  const achievementsRes = await AchievementsAPI.getAllAchievements();
		  threeAnswerStreakAchievement = achievementsRes.body.find(
		    (achievement) => achievement.name === "Three-Answer Streak"
		  );
		  if (threeAnswerStreakAchievement != null) {
		    await AchievementsAPI.updateAchievement(
		      userData._id,
		      threeAnswerStreakAchievement._id,
		      true
		    );
		  }
		}
	    if (score >= 1) {
	      const achievementsRes = await AchievementsAPI.getAllAchievements();
	      const perfectScoreAchievement = achievementsRes.body.find(
	        (achievement) => achievement.name === "Perfect Score"
	      );
	      
	      if (perfectScoreAchievement != null) {
	        await AchievementsAPI.updateAchievement(
	          userData._id,
	          perfectScoreAchievement._id,
	          true
	        );
	   //     setAchievedAchievement(perfectScoreAchievement);
			 //setIsAchievementVisible(true);
			console.log(perfectScoreAchievement);
			NotificationsAPI.achievementNotification(perfectScoreAchievement, "Achievement Unlocked!");
	      }
	    }
	  } 
	  else {
	    console.log(response.message);
	  }
	};	
	
	

	
	const minutes = Math.floor(elapsedTime / 60);
	const seconds = elapsedTime % 60;
	const timePlayed = `min ${minutes} | sec ${seconds}`;
	localStorage.setItem("timePlayed",timePlayed);
	
	const style = {Containers: {
	    DefaultStyle: {
	      fontFamily: 'inherit',
	      position: 'fixed',
	      padding: '0 10px 10px 10px',
	      zIndex: 9998,
	      WebkitBoxSizing: 'border-box',
	      MozBoxSizing: 'border-box',
	      boxSizing: 'border-box',
	      height: '144px'
	    }}}
	
	//NEED TO SEND	
	return (
  <>
    <DefinitionGameBG/>
    {!start ? (
      <Menu
        selectedCategory={category}
        categoryChanged={(newCategory => setCategory(newCategory))}
        gameName="Definition Game"
        handleMusicToggle={toggleMusic}
        musicPlaying={musicPlaying}
        handleStart={initGame}
      />
    ) : (
      <>
        <div dir="ltr" className="box">
          <div className="d-flex flex-wrap justify-content-between">
            <a className="exit-button" role='button' onClick={() => setStart(false)}>
              <MdArrowBack/>
            </a>
            <LanguageSelector/>
          </div>
          {showScore ? (
            <div dir={LanguageMap[i18n.language].dir} className="score-box">
              <h2 className="score-title">{t('games.backword-definition.scoretitle')}</h2>
              <h4>{t('games.backword-definition.score', {score: score, questionsLength: questions.length})}</h4>
              <h4>{t('games.backword-definition.et')}: {minutes}:{seconds}</h4>
              <h4>{t('games.backword-definition.pg')}: +{points} points</h4>
              <MdOutlineReplay className="restart-button" onClick={() => {initGame()}}/>
            </div>
          ) : (
            <div className="question-background m-5">
              <div>
                <div>
                  <span>{t('games.backword-definition.question-info', {currentQuestion: currentQuestion + 1})}</span> / {questions.length}
                </div>
                <div>{questions[currentQuestion].questionText[LanguageMap[i18n.language].name]}</div>
              </div>
              <div className="flex d-flex flex-column gap-2" >
                <div>{t('games.backword-definition.timere')}: {timeLeft} {t('games.backword-definition.seconds')}</div>
                {questions[currentQuestion].answerOptions.map((answerOption,index) => (
                  <button className="btn btn-primary mb-2" disabled={disabled} key={index} onClick={(event) => handleAnswerOptionClick(event, answerOption.isCorrect)}>{answerOption.answerText[LanguageMap[i18n.language].name]}</button>
                ))}
                <div>{message}</div>
              </div>
            </div>
          )}
        </div>

      </>
    )}
  </>
);

}


export default BackwordDefinition;