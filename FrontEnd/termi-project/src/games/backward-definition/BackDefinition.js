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
	const gameName = "Backword Game";
	const basePointsPerQuestion = 10;
	const difficultyMultiplierPerQuestion = 0.3; // => Easy: basePointsPerQuestion, Medium: basePointsPerQuestion * difficultyMultiplier
	const difficulties = [{name: "Easy", start:()=>{initEasyGame()}}, {name: "Medium", start:()=>{initMediumGame()}}]
	const timerSeconds = 60;
	
	const {userData, setUserData} = useContext(LoginContext);
	const streakCountRef = useRef(0);
  const [highestStreak, setHighestStreak] = useState(0);
  const { t, i18n } = useTranslation();
	const [questions, setQuestions] = useState([]);
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);
	const [start, setStart] = useState(false);
	const [message,setMessage]=useState('');
	const [disabled, setDisabled] = useState(false);
	const [difficultyIndex, setDifficultyIndex] = useState(0);

	
	// Timer
	const [elapsedTime, setElapsedTime] = useState(0);
	const [timeLeft, setTimeLeft] = useState(timerSeconds);
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
	          setTimeLeft(timerSeconds);
		    }
		    else{
				let difficultyPointsToAdd = basePointsPerQuestion * score * difficultyMultiplierPerQuestion * difficultyIndex;
				let basePointsToAdd = basePointsPerQuestion * score;
				let pointsToAdd = Math.round(basePointsToAdd + difficultyPointsToAdd);
		    	finishGame(score, pointsToAdd);
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
		          setTimeLeft(timerSeconds);
		          setMessage(null);
		          setDisabled(false);
		        } 
		   //     else {
					// let difficultyPointsToAdd = basePointsPerQuestion * score * difficultyMultiplierPerQuestion * difficultyIndex;
					// let basePointsToAdd = basePointsPerQuestion * score;
					// let pointsToAdd = Math.round(basePointsToAdd + difficultyPointsToAdd);
					// finishGame(score, pointsToAdd);
		   //     }
	      }, 1000);// wait for 10 seconds before moving on
	    }
	  }, [timeLeft, currentQuestion]);
	  
	const startGame = () => {
		difficulties[difficultyIndex].start();
	};
	  
	const initEasyGame = async () => {
		if(category !== undefined){
			let numOfTerms = 10;
			// let categoryId = category.categoryId;
		    const res = await GamesApi.random(numOfTerms, category, "Definition Game");
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
				setHighestStreak(0);
			    setElapsedTime(0);  // reset elapsed time to 0
			    setShowScore(false);  // hide the score modal
			    setCurrentQuestion(0);  // reset the current question to the first question
				setScore(0);
				setPoints(0);
				setTimeLeft(timerSeconds);  // reset the time left
				setStart(true);
				setDisabled(false);
				setMessage("");
	        }else{
	    		NotificationsAPI.errorNotification(res.message);
		    }
			}
		else{
			NotificationsAPI.errorNotification("Must choose a category first");
		}
	};
	
	const initMediumGame = async () => {
		// get 20 random terms from the choosen category
		if(category !== undefined){
			// Number of questions = numOfTerms / 2
			let numOfTerms = 20;
		    const res = await GamesApi.random(numOfTerms, category, "Definition Game");
		    if(res.success){
	        let terms = res.body;
	        let allQuestions = [];
	        for (var i = 0; i < numOfTerms/2; i++) {
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
								terms.splice(i, 1);
							}else{
								// random number for the wrong concept name
			        			let wrongTermIndex = Math.floor(Math.random() * terms.length);
			        			
			        			// check if the term already in the answers or its the correct answer
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
					setHighestStreak(0);
				    setElapsedTime(0);  // reset elapsed time to 0
				    setShowScore(false);  // hide the score modal
				    setCurrentQuestion(0);  // reset the current question to the first question
					setScore(0);
					setPoints(0);
					setTimeLeft(timerSeconds);  // reset the time left
					setStart(true);
					setDisabled(false);
					setMessage("");
		    }else{
		    	NotificationsAPI.errorNotification(res.message);
		    }
		}else{
			NotificationsAPI.errorNotification("Must choose a category first");
		}
	};
	
	const handleAnswerOptionClick = (event, isCorrect) => {
    setDisabled(true);
    const correctAnswer = questions[currentQuestion].answerOptions.find(option => option.isCorrect).answerText[LanguageMap[i18n.language].name];
    
    if (isCorrect) {
    	const newStreakCount = streakCountRef.current + 1;
      
		if(newStreakCount>highestStreak)
		{
			setHighestStreak(newStreakCount);  
		}
			streakCountRef.current = newStreakCount;
			setScore(score + 1);
			setMessage(t('games.backword-definition.correctanswer'));
			event.target.classList.add('btn-success');
	    } else {
			event.target.classList.add('btn-danger');
			setMessage(t('games.backword-definition.wronganswer')+' : ' + correctAnswer);
			streakCountRef.current = 0;
    	}
	
		setTimeout(() => {
			// reset the classes of the answer options
			event.target.classList.remove('btn-success');
			event.target.classList.remove('btn-danger');
			setDisabled(false);
	
	
		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setTimeLeft(timerSeconds);
			setMessage('');
			setCurrentQuestion(nextQuestion);
		} else {
			let updatedScore = score + (isCorrect ? 1:0);
			let difficultyPointsToAdd = basePointsPerQuestion * updatedScore * difficultyMultiplierPerQuestion * difficultyIndex;
			let basePointsToAdd = basePointsPerQuestion * updatedScore;
			let pointsToAdd = Math.round(basePointsToAdd + difficultyPointsToAdd);
			setPoints(pointsToAdd);
			finishGame(updatedScore, pointsToAdd);
		
		}
		//reset timer and message
		},1000);
	};
	
	const finishGame = async (score, points) => {
		console.log(score, points)
		const achievementsRes = await AchievementsAPI.getAllAchievements();
		const allAchievements = achievementsRes.body;
		const achievements = allAchievements.filter((achievement) => achievement.relevantGame === "Definition Game");
		
		setShowScore(true);
		
		const response = await GamesApi.updatePoints(
	    userData._id,
	    points,
	    "Definition Game",
	    category
	  );
	  if (response.success) {
	    
	    localStorage.setItem("points", points);
	    
	    const addToHistory = await GameHistoryAPI.updateGameHistory(
	      userData._id,
	      "Backward",
	      points
	    );
	    
	    let achievedAchievement = [];
	    
			if (highestStreak >= 3) {
				const achievementUnlocked = await unlockAchievement("Three Streak!", achievements);
				if(achievementUnlocked){
					achievedAchievement.push(achievementUnlocked);
				}
			}
			
			if (highestStreak >= 5) {
			  const achievementUnlocked = await unlockAchievement("Five Streak!", achievements);
				if(achievementUnlocked){
					achievedAchievement.push(achievementUnlocked);
				}
			}
			
			if (highestStreak >= 10) {
			 const achievementUnlocked = await unlockAchievement("LEGENDARY!", achievements);
				if(achievementUnlocked){
					achievedAchievement.push(achievementUnlocked);
				}
			}
			
			if (score >= 10) {
				const achievementUnlocked = await unlockAchievement("No Mistake!", achievements);
				if(achievementUnlocked){
					achievedAchievement.push(achievementUnlocked);
				}
			}
			
			if (score >= 5) {
				const achievementUnlocked = await unlockAchievement("Unbeliveable Score", achievements);
				if(achievementUnlocked){
					achievedAchievement.push(achievementUnlocked);
				}
			}
			
			if (score >= 3) {
				const achievementUnlocked = await unlockAchievement("Good Score", achievements);
				if(achievementUnlocked){
					achievedAchievement.push(achievementUnlocked);
				}
			}
			
			// Updating the cached data
			setUserData({...userData,
					points: userData.points + points,
					achievements: [...userData.achievements,...achievedAchievement]
			});
	}
};
	
	const minutes = Math.floor(elapsedTime / 60);
	const seconds = elapsedTime % 60;
	const timePlayed = `min ${minutes} | sec ${seconds}`;
	localStorage.setItem("timePlayed",timePlayed);

	
	const unlockAchievement = async (achievementName,achievements) => {
  //const achievementsRes = await AchievementsAPI.getAllAchievements();
  const achievement = achievements.find(
    (achievement) => achievement.name === achievementName
  );
  
  if (achievement != null) {
	const achivementResponse=await AchievementsAPI.updateAchievement(
          userData._id,
          achievement._id,
          true
        );
  	if(achivementResponse.success && achivementResponse.added)
			{
				NotificationsAPI.achievementNotification(achievement, "Achievement Unlocked!");
				// setUserData({...userData,achievements: [...userData.achievements,achievement._id]});
				return achievement._id;
			}
  }
}

	return (
  <>
    <DefinitionGameBG/>
    {!start ? (
      <Menu
        gameName="Definition Game"
        handleMusicToggle={toggleMusic}
        musicPlaying={musicPlaying}
        handleStart={startGame}
        edition={"Quiz Master"}
        settings={
							{
								category: {initialCategory: category, categoryChanged: (newCategory => setCategory(newCategory))},
								difficulty: {availableDifficulties: Array.from(difficulties, difficulty => difficulty.name), difficultyChanged: (newDifficultyIndex => setDifficultyIndex(newDifficultyIndex)), initialDifficultyIndex: difficultyIndex}
							}}
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
              <MdOutlineReplay className="restart-button" onClick={() => {initEasyGame()}}/>
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