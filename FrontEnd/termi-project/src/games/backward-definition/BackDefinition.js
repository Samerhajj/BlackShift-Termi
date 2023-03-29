// import "./BackDefinition.css";
import React, {useEffect, useState, useContext} from "react";
import { useTranslation } from 'react-i18next';
import { Modal, Button } from "react-bootstrap";
import useInterval from "./useInterval";
import { MdOutlineReplay } from "react-icons/md";
import { AiFillPlayCircle } from "react-icons/ai";
import "./BackDefinition.css";
import CategorySelector from "../../components/CategorySelector";
import {LoginContext} from "../../components/LoginContext";
import {CategoriesContext} from "../../components/CategoryContext";

// APIs
import LanguageMap from '../../api/LanguageAPI';
import GamesApi from '../../api/GamesAPI';
import GameHistoryAPI from '../../api/GameHistoryAPI';
import axios from 'axios';
export default function App() {
	  //localStorage.setItem('currentPage', 'BackDefinition')//test
	const {userData, setUserData} = useContext(LoginContext);
	// const { categories } = useContext(CategoriesContext);
          
	console.log(userData);
	const { t, i18n } = useTranslation();
	const [questions, setQuestions] = useState([]);
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);
	const [start, setStart] = useState(false);
	const [message,setMessage]=useState('');
	const steps = t('games.backword-definition.step-by-step', { returnObjects: true });
	const [buttonColor, setButtonColor] = useState(null);
	const [disabled, setDisabled] = useState(false);
	
	// Timer
	const [elapsedTime, setElapsedTime] = useState(0);
	const [timeLeft, setTimeLeft] = useState(30);
	const [points,setPoints]=useState(0);
	// console.log("9999999999999999999999999999")
	// console.log(
	// 	categories.find(category => category.categoryId == userData.field) && (categories.find(category => category.categoryId == userData.field).categoryName[LanguageMap[i18n.language].name])

	// 	)
	// console.log("9999999999999999999999999999")

	const [category, setCategory] = useState(userData.field);
	
	
	const HIGH_SCORE_ACHIEVEMENT = {
  name: "High Score",
  description: "Achieve a high score in the Backward Definition game.",
  points: 20,
    check: function(score) {
    if (score >= 2) {
      alert(`You earned the "${this.name}" achievement!`);
    }
    }
};

const CATEGORY_MASTER_ACHIEVEMENT = {
  name: "Category Master",
  description: "Complete the Backward Definition game in each category.",
  points: 50,
  
     check: function(score) {
    if (score >= 5) {
      alert(`You earned the "${this.name}" achievement!`);
    }
    }
};

const SPEED_DEMON_ACHIEVEMENT = {
  name: "Speed Demon",
  description: "Complete the Backward Definition game in under 5 minutes.",
  points: 100,
      check: function(score) {
    if (score >= 10) {
      alert(`You earned the "${this.name}" achievement!`);
    }
    }
};


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
	    	finishGame();
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
		          finishGame();
		        }
	      }, 1000);// wait for 10 seconds before moving on
	    }
	  }, [timeLeft, currentQuestion]);
	  
	const initGame = async () => {
		console.log(category);
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
				setTimeLeft(30);  // reset the time left
				setStart(true);
				setDisabled(false);
				setMessage("");
	        }else{
	    		alert(res.message);
			    }
			}
		else{
			alert("Must choose a category first");
		}
	};
		
	const changeCategory = (newCategory) => {
		setCategory(newCategory);
	};
	
	const handleAnswerOptionClick = (event,isCorrect) => {
		
		setDisabled(true);
		const correctAnswer = questions[currentQuestion].answerOptions.find(option => option.isCorrect).answerText[LanguageMap[i18n.language].name];
	
		if (isCorrect) {
		    setScore(score + 1);
		    setMessage(t('games.backword-definition.correctanswer'));
	
		    event.target.classList.add('btn-success');
		} else {
			event.target.classList.add('btn-danger');
			
			setMessage(t('games.backword-definition.wronganswer')+' : ' + correctAnswer);
		}
			    		    	HIGH_SCORE_ACHIEVEMENT.check(score);
		
		setTimeout(() => {
			// reset the classes of the answer options
			event.target.classList.remove('btn-success');
			event.target.classList.remove('btn-danger');
			setButtonColor(null);
			setDisabled(false);
		}, 1000); // 1000 milliseconds
	
		const nextQuestion = currentQuestion + 1;
			setTimeout(()=>{
				if (nextQuestion < questions.length) {
					// stopTimer();
					// setTimer(30);
					// startTimer();
			setCurrentQuestion(nextQuestion);
			
		} else {
		finishGame();
			
			
			// stopTimer();
		}
		//reset timer and message
		setTimeLeft(30);
		setMessage('');
		},1000);
	};
		
	const [showModal, setShowModal] = useState(false);
	
	const finishGame = async()=>{
		// let prev_point = localStorage.getItem("points");
		setShowScore(true);
		//tStart(false);
		let points=0;
		points=score*10;
		
		console.log(points);
		console.log(score);
	
		setPoints(points);
		// const {_id} = JSON.parse(localStorage.getItem('profileBody'));
		const response =await GamesApi.updatePoints(userData._id,points,"Definition Game")
		if(response.success)
		{
			setUserData({...userData, points: userData.points + points});
			localStorage.setItem("points",points);
			const addToHistory = await GameHistoryAPI.updateGameHistory(userData._id, 'Backward', points);
		}else{
			console.log(response.message);
		}
	};
	
	function handleOpenModal() {
	    setShowModal(true);
	  }
		
	const minutes = Math.floor(elapsedTime / 60);
	const seconds = elapsedTime % 60;
	const timePlayed = `min ${minutes} | sec ${seconds}`;
	localStorage.setItem("timePlayed",timePlayed);
	//NEED TO SEND	
	return (
		<>
		
			<div className="banner banner_game">
				<div className="wrapper">
					<div className="banner_content"></div>
				</div>
			</div>
			<h1> {t('games.backword-definition.title')}</h1>
			{start ? (
				<div className="box">
					{showScore ? (
						<div className="score-box">
							<h2>{t('games.backword-definition.scoretitle')}</h2>
							<h4>{t('games.backword-definition.score', {score: score, questionsLength: questions.length})}</h4>
							<h4>{t('games.backword-definition.et')}: {minutes}:{seconds}</h4>
							<h4>{t('games.backword-definition.pg')}: +{points} points</h4>
							<MdOutlineReplay className="icon-button" onClick={() => {initGame()}}/>
						</div>
					) : (
						<div className="m-5">
						<h1></h1>
							<div>
								<div>
									<span>{t('games.backword-definition.question-info', {currentQuestion: currentQuestion + 1})}</span> / {questions.length}
								</div>
								<div>{questions[currentQuestion].questionText[LanguageMap[i18n.language].name]}</div>
							</div>
							<div className="flex d-flex flex-wrap" >
							<div>{t('games.backword-definition.timere')}: {timeLeft} {t('games.backword-definition.seconds')}</div>
								{questions[currentQuestion].answerOptions.map((answerOption,index) => (
								<button className="btn btn-primary mb-2" disabled={disabled}  key={index} onClick={(event) => handleAnswerOptionClick(event, answerOption.isCorrect)}>{answerOption.answerText[LanguageMap[i18n.language].name]}</button>
								))}
								<div>{message}
								</div>
							</div>
						</div>
					)}
				</div> 
				) : (
					<div className="center-button ">
					{/*<button className="circle-button"   onClick={handleOpenModal}><img src={play_Icon}/></button>*/}
					
						<div className="icon-selector-container">
							<CategorySelector category={category} categoryChanged={(newCategory) => {changeCategory(newCategory)}}/>
							<div className="icon-center">
							<AiFillPlayCircle className="icon-button" onClick={handleOpenModal}/>
						</div>
					</div>
					<Modal show={showModal} onHide={() => setShowModal(false)} >
					  <Modal.Header className="mx-0" closeButton>
					    <Modal.Title className="ms-auto">{t('games.backword-definition.modalTitle')}</Modal.Title>
					  </Modal.Header>
					  <Modal.Body> 
					  <ul>
					      {steps.map((step) => (
					      <li key={step.id}>{step.text}
					    
					    </li>
					      ))}
					    </ul>
					    </Modal.Body>
					  <Modal.Footer>
					   <Button variant="secondary" onClick={() => { setShowModal(false)}}>
					     {t('games.backword-definition.goBack')}
					    </Button>
					    <Button variant="primary" onClick={() => { setShowModal(false); initGame(); }}>
					     {t('games.backword-definition.continueToGame')}
					    </Button>
					  </Modal.Footer>
					</Modal>
				</div>
			)}
		</>
	);
}