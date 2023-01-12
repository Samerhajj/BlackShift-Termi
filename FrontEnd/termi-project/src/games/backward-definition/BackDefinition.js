// import "./BackDefinition.css";
import React, {useEffect, useState} from "react";
import { useTranslation } from 'react-i18next';
import { Modal, Button } from "react-bootstrap";
import useInterval from "./useInterval";
import { MdOutlineReplay } from "react-icons/md";
import { AiFillPlayCircle } from "react-icons/ai";
import "./BackDefinition.css";

// APIs
import LanguageMap from '../../api/LanguageAPI';
import GamesApi from '../../api/GamesAPI';

export default function App() {
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
      setMessage('Time\'s up! The correct answer was: ' + correctAnswer);
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
      }, 1000);
    }
  }, [timeLeft, currentQuestion]);
  
  
const initGame = async () => {
		// get 10 random terms from category 0
        const res = await GamesApi.random(10, 0);
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
        	console.log(res.message);
        }
	};
  
  
const handleAnswerOptionClick = (event,isCorrect) => {
		setDisabled(true);
		console.log(questions[currentQuestion]);
	const correctAnswer = questions[currentQuestion].answerOptions.find(option => option.isCorrect).answerText[LanguageMap[i18n.language].name];
    console.log(event.target);
	if (isCorrect) {
    setScore(score + 1);
    setMessage("Correct Answer");
    event.target.classList.add('btn-success');
    
  } else {
    event.target.classList.add('btn-danger');
    setMessage(' The correct answer was: ' + correctAnswer);
    
    
  }
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
	setShowScore(true);
	//tStart(false);
	let points=0;
	points=score*10;
	console.log(points);
	console.log(score);
	setPoints(points);
	const {_id} = JSON.parse(localStorage.getItem('profileBody'));
		const response =await GamesApi.updatePoints(_id,points)
		if(response.success)
		{
			console.log("points UPDATEd");
		}else{
			console.log(response.message);
		}
}
function handleOpenModal() {
    setShowModal(true);
  }
	
	const minutes = Math.floor(elapsedTime / 60);
const seconds = elapsedTime % 60;
	
	return (
		<>
		
			<div className="banner banner_game">
				<div className="wrapper">
					<div className="banner_content"></div>
				</div>
			</div>
			<h1>Backword Definitions</h1>
			{start ? (
				<div className="box">
					{showScore ? (
						<div className="score-box">
							<h2>Score</h2>
							<h4>{t('games.backword-definition.score', {score: score, questionsLength: questions.length})}</h4>
							<h4>Elapsed time: {minutes}:{seconds}</h4>
							<h4>Points gained: +{points} points</h4>
							<MdOutlineReplay className="icon-button" onClick={() => {initGame()}}/>
						</div>
					) : (
						<div className="m-5">
							<div>
								<div>
									<span>{t('games.backword-definition.question-info', {currentQuestion: currentQuestion + 1})}</span> / {questions.length}
								</div>
								<div>{questions[currentQuestion].questionText[LanguageMap[i18n.language].name]}</div>
							</div>
							<div className="flex d-flex flex-wrap" >
							<div>Time remaining: {timeLeft} seconds</div>
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
					<AiFillPlayCircle className="icon-button" onClick={handleOpenModal}/>
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