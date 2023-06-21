// React
import React, {useEffect, useState, useContext,useRef} from "react";
// [(]*.*[0-9]*[a-zA-Z]+[0-9]*.[a-zA-Z]*[0-9]*[)]*

import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

// Components
import {LoginContext} from "../../components/LoginContext";
import Menu from "../Menu/Menu";

// Translate
import { useTranslation } from 'react-i18next';

// CSS and Elements
import "./TranslateGame.css";
import "../GamesStyles.css";
import "typeface-roboto";
import { MdOutlineReplay,MdArrowBack } from "react-icons/md";
import correctSFXaudio from "../../assets/sound/SFX/correct-sfx.wav";
import incorrectSFXaudio from "../../assets/sound/SFX/incorrect-sfx.mp3";
import TranslateGameBG from "./TranslateGameBG/TranslateGameBG"
import {AiOutlineCheck, AiOutlineClose} from "react-icons/ai";
import { IconContext } from "react-icons";

// APIs
import LanguageMap from '../../api/LanguageAPI';
import GamesApi from '../../api/GamesAPI';
import GameHistoryAPI from '../../api/GameHistoryAPI';
import NotificationsAPI from '../../api/NotificationsAPI';

const TranslateGame = () => {
	const gameName = "Translate Game";
	const basePointsPerQuestion = 10;
	const difficultyMultiplierPerQuestion = 0.3; // => Easy: basePointsPerQuestion, Medium: basePointsPerQuestion * difficultyMultiplier
	const difficulties = [{name: "Easy", start:()=>{initEasyGame()}}, {name: "Medium", start:()=>{initMediumGame()}}]
	
	const [correctSFX] = useState(new Audio(correctSFXaudio));
	const [incorrectSFX] = useState(new Audio(incorrectSFXaudio));
	
	const [start, setStart] = useState(false);
	const {userData, setUserData} = useContext(LoginContext);
	const [category, setCategory] = useState(userData.field);
	const [fromLang, setFromLang] = useState(userData.language.toLowerCase());
	const [toLang, setToLang] = useState(["english", "arabic", "hebrew"].filter(lang => lang !== userData.language.toLowerCase())[0]);
	const [showScore, setShowScore] = useState(false);
	const [points, setPoints] = useState(0);
	const [questions, setQuestions] = useState([]);
	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [answers, setAnswers] = useState([]);
	const [correctCount, setCorrectCount] = useState(0);
	const [difficultyIndex, setDifficultyIndex] = useState(0);

	const { t, i18n } = useTranslation();
	
	const [musicPlaying, setMusicPlaying] = useState(true);
	
	const toggleMusic = () => setMusicPlaying(!musicPlaying);
	
	const startGame = () => {
		difficulties[difficultyIndex].start();
	};
	
	const initEasyGame = async () => {
		// get 10 random terms from the choosen category
		if(category !== undefined){
			let numOfTerms = 10;
		    const res = await GamesApi.random(numOfTerms, category,'Translation Game');
		    if(res.success){
		        let terms = res.body;
		        let allQuestions = [];
		        let allAnswers = [];
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
							answers[correctIndex] = {index: i, content: terms[i].conceptName[toLang], isCorrect: true};
						}else{
							// random number for the wrong concept name
		        			let wrongTermIndex = Math.floor(Math.random() * terms.length);
		        			
		        			// check if the term alre	ady in the answers or its the correct answer
							if(usedIndexs.has(wrongTermIndex) || wrongTermIndex == i){
								answerIndex--;
								continue;
							}
							
							// add the wrong answers
							answers[answerIndex] = {index: i, content: terms[wrongTermIndex].conceptName[toLang], isCorrect: false};
							usedIndexs.set(wrongTermIndex);
						}
					}
					
					// add the new question to the questions array
					allQuestions.push(terms[i].shortDefinition[fromLang]);
					allAnswers.push(answers);
				}
				setQuestions(allQuestions);
				setAnswers(allAnswers);
				setPoints(0);
				setCorrectCount(0);
		        setCurrentQuestion(0);
		        setShowScore(false);
		        setStart(true);
		    }else{
		    	NotificationsAPI.errorNotification(res.message);
		    }
		}else{
			NotificationsAPI.errorNotification("Must choose a category first");
		}
	};
	
	const initMediumGame = async () => {
		// get 20 random terms from the choosen category
		if(category !== undefined){
			// Number of questions = numOfTerms / 2
			let numOfTerms = 20;
		    const res = await GamesApi.random(numOfTerms, category, 'Translation Game');
		    if(res.success){
		        let allTerms = res.body;
		        let allQuestions = [];
		        let allAnswers = [];
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
							answers[correctIndex] = {index: answerIndex, content: allTerms[i].conceptName[toLang], isCorrect: true};
							allTerms.splice(i, 1);
						}else{
							// random number for the wrong concept name
		        			let wrongTermIndex = Math.floor(Math.random() * allTerms.length);
		        			
		        			// check if the term already in the answers or its the correct answer
							if(usedIndexs.has(wrongTermIndex) || wrongTermIndex == i){
								answerIndex--;
								continue;
							}
							
							// add the wrong answers
							answers[answerIndex] = {index: answerIndex, content: allTerms[wrongTermIndex].conceptName[toLang], isCorrect: false};
							usedIndexs.set(wrongTermIndex);
						}
					}
					// add the new question to the questions array
					allQuestions.push(allTerms[i].shortDefinition[fromLang]);
					allAnswers.push(answers);
				}
				setQuestions(allQuestions);
				setAnswers(allAnswers);
				setPoints(0);
				setCorrectCount(0);
		        setCurrentQuestion(0);
		        setShowScore(false);
		        setStart(true);
		    }else{
		    	NotificationsAPI.errorNotification(res.message);
		    }
		}else{
			NotificationsAPI.errorNotification("Must choose a category first");
		}
	};

	const restartGame = () => {
		difficulties[difficultyIndex].start();
	};
		
	function handleGoBack(){
		setStart(false);
	}
	
	const finishGame = async (pointsToAdd) => {
		setShowScore(true);
		const response = await GamesApi.updatePoints(
		    userData._id,
		    pointsToAdd,
		    gameName,
		    category
		);
		if (response.success) {
		    const addToHistory = await GameHistoryAPI.updateGameHistory(
		      userData._id,
		      gameName,
		      pointsToAdd
		    );
		    setUserData({...userData,
					points: userData.points + pointsToAdd
			});
	    };
	};
	const handleDragEnd = (result) => {
	  if (!result.destination) {
	    return;
	  }
	
	  const sourceIndex = result.source.index;
	  
	  // Check if the answer is dragged from the list to the choosen answers
	  if (result.source.droppableId === 'answers' && result.destination.droppableId === 'choosen-answer') {
	    setAnswers((prevAnswers) => {
			// const updatedAnswers = [...prevAnswers];
			// updatedAnswers[currentQuestion] = prevAnswers[currentQuestion].filter((_, index) => index !== sourceIndex);
			// if(choosenAnswer != null){
			// 	updatedAnswers[currentQuestion].push(choosenAnswer);
			// }
			// return updatedAnswers;
			
			const updatedAnswers = [...prevAnswers];
			updatedAnswers[currentQuestion] = prevAnswers[currentQuestion].filter((_, index) => index !== sourceIndex);
			return updatedAnswers;
	    });
	    const draggedAnswer = answers[currentQuestion][sourceIndex];
	    // setChoosenAnswer(draggedAnswer);
	    
	    let updatedCorrectCounter = correctCount;
	    
	    if(draggedAnswer && draggedAnswer.isCorrect){
	    	// Correct answer
	    	updatedCorrectCounter += 1; 
			setCorrectCount(correctCount + 1);
			correctSFX.play();
		}else{
			// Incorrect answer
			incorrectSFX.play();
		}
		
		if(currentQuestion + 1 < questions.length){
			setCurrentQuestion(currentQuestion + 1);
		}else{
			console.log("updatedCorrectCounter" + updatedCorrectCounter)
			let difficultyPointsToAdd = basePointsPerQuestion * updatedCorrectCounter * difficultyMultiplierPerQuestion * difficultyIndex;
			let basePointsToAdd = basePointsPerQuestion * updatedCorrectCounter;
			let pointsToAdd = Math.round(basePointsToAdd + difficultyPointsToAdd);
			setPoints(pointsToAdd);
			finishGame(pointsToAdd);
		}
	  }
	
	  // Check if the answer is dragged back from the choosen answers to the list
	  //if (result.source.droppableId === 'choosen-answer' && result.destination.droppableId === 'answers') {
	  //  setAnswers((prevAnswers) => {
	  //    const updatedAnswers = [...prevAnswers];
	  //    updatedAnswers[currentQuestion].push(choosenAnswer);
	  //    return updatedAnswers;
	  //  });
	  //  setChoosenAnswer(null);
	  //}
	};
	
	return(
		<>
		<div className="translate-game-background"/>
			{!start ? (
				<>
					<TranslateGameBG />
					<Menu
						gameName={gameName}
						handleMusicToggle={toggleMusic}
						musicPlaying={musicPlaying}
						handleStart={startGame}
						edition={"Alien Translator"}
						settings={
							{
								category: {initialCategory: category, categoryChanged: (newCategory => setCategory(newCategory))},
								language: {toLang: toLang, toLangChanged: (language => setToLang(language)), fromLang: fromLang, fromLangChanged: (language => setFromLang(language))},
								difficulty: {availableDifficulties: Array.from(difficulties, difficulty => difficulty.name), difficultyChanged: (newDifficultyIndex => setDifficultyIndex(newDifficultyIndex)), initialDifficultyIndex: difficultyIndex}
							}}/>
			  </>
			) : (
				<>
					<div dir="ltr">
						<div className="d-flex flex-wrap justify-content-between">
							<a className="exit-button" onClick={handleGoBack}>
		                    	<MdArrowBack/>
		                	</a>
		            	</div>
	            	</div>
					{showScore ? (
						<div dir={LanguageMap[i18n.language].dir} className="score-box">
							<h2 className="score-title">{t('games.memory-game.score')}</h2>
							<h4>{t('games.memory-game.pg')}: +{points} points</h4>
							<MdOutlineReplay className="restart-button" onClick={() => {restartGame()}}/>
						 </div>
					) : (
		            	<DragDropContext onDragEnd={handleDragEnd}>
			            	<div className="d-felx flex-column bg-primary-subtle">
			            		{/* Question */}
			            		<div className="p-5 d-flex flex-column align-items-center ">
			            			<h3 className="text-center fs-2 text-light fw-bold">Translate</h3>
									<h2 className="fs-6 fw-light text-light mb-3">{currentQuestion+1}/{questions.length}</h2>
			            			<div className="text-center fs-4 text-light">{questions[currentQuestion]}</div>
			            			<Droppable droppableId="choosen-answer">
									    {(provided) => (
									      <div ref={provided.innerRef} style={{}} {...provided.droppableProps} className={`rounded drop-background d-flex align-items-center justify-content-center mt-4 p-3"}`}>
									        {/*choosenAnswer ? (
									        	<Draggable key={`choosen_${currentQuestion}_${choosenAnswer.index}`} draggableId={`choosen_${currentQuestion}_${choosenAnswer.index}`} index={choosenAnswer.index}>
								                {(provided, snapshot) => (
								                  <div
								                    ref={provided.innerRef}
								                    {...provided.draggableProps}
								                    {...provided.dragHandleProps}
								                    className={`bg-light d-flex align-items-center justify-content-center p-1 rounded user-select-none`}
								                    style={{ ...provided.draggableProps.style, minWidth: '300px', minHeight: '100px' }}
								                  >
									                  <h3 className="fs-6 text-primary fw-bolder text-center mb-0">
									                    {choosenAnswer.content}
									                  </h3>
								                  </div>
								                )}
								              </Draggable>
								              ) : 
								              <h5 className="fs-5 fst-italic text-center fw-light text-light mb-0">Drag an answer here</h5>}
								              */}
								            {provided.placeholder}
									      </div>
									    )}
									  </Droppable>
									  <div className="d-flex justify-content-between align-items-center gap-5 mt-3">
										<div className="d-flex justify-content-between align-items-center gap-3 fs-6 fw-light text-light">
											<div className="d-flex align-items-center text-success">
												<IconContext.Provider value={{ size: "2rem" }}>
													<AiOutlineCheck/>
												</IconContext.Provider>
												<div className="fw-bold fs-6 text-light">
													{correctCount}
												</div>
											</div>
											<div className="d-flex align-items-center text-danger">
												<IconContext.Provider value={{ size: "2rem" }}>
													<AiOutlineClose/>
												</IconContext.Provider>
												<div className="fw-bold fs-6 text-light">
													{currentQuestion - correctCount}
												</div>
											</div>
										</div>
										{/*<div className="btn btn-success" onClick={() => nextQuestion()}>
											Next
										</div>*/}
									  </div>
			            		</div>
			            		{/* Answers */}
			            		{/*<div className="container-fluid">
		            				<Droppable droppableId="answers">
								        {(provided) => (
								          <div ref={provided.innerRef} {...provided.droppableProps}>
								        	<div className="row text-primary fw-bolder g-4 text-center m-2 justify-content-evenly">
								            {answers[currentQuestion].map((answer, index) => (
								              <Draggable key={`${currentQuestion}_${index}`} draggableId={`${currentQuestion}_${index}`} index={index}>
								                {(provided,snapshot) => (
								                  <div
								                    ref={provided.innerRef}
								                    {...provided.draggableProps}
								                    {...provided.dragHandleProps}
								                    className={`col-5 bg-light p-2 d-flex align-items-center justify-content-center rounded col-lg-2 user-select-none ${snapshot.isDragging ? "position-absolute" : ""}`}
								                    style={{ ...provided.draggableProps.style, minHeight: '100px' }}>
									                  <h3 className="fs-6 text-primary fw-bolder text-center mb-0">
									                	{answer.content}
									                  </h3>
								                  </div>
								                )}
								              </Draggable>
								            ))}
								            {provided.placeholder}
								          </div>
										</div>
								        )}
								      </Droppable>
			            		</div>*/}
			            		<div className="container-fluid text-primary fw-bolder text-center">
		            				<Droppable droppableId="answers" direction="horizontal" isDropDisabled={true}>
								        {(provided) => (
								          <div ref={provided.innerRef} {...provided.droppableProps} className="row g-4 m-2 justify-content-evenly">
								            {answers[currentQuestion].map((answer, index) => (
								              <Draggable key={`${currentQuestion}_${index}`} draggableId={`${currentQuestion}_${index}`} index={index}>
								                {(provided,snapshot) => (
								                <>
								                  {/*snapshot.isDragging ? 
									                  <div
									                    className={`col-5 bg-light p-2 d-flex align-items-center justify-content-center rounded col-lg-2 user-select-none opacity-25`}
									                    style={{ minHeight: '100px' }}>
										                  <h3 className="fs-6 text-primary fw-bolder text-center mb-0">
										                	{answer.content}
										                  </h3>
									                  </div>:null*/}
								                  <div
								                    ref={provided.innerRef}
								                    {...provided.draggableProps}
								                    {...provided.dragHandleProps}
								                    className={`col-5 bg-light p-2 d-flex align-items-center justify-content-center rounded col-lg-2 user-select-none`}
								                    style={{ ...provided.draggableProps.style, minHeight: '100px' }}>
									                  <h3 className="fs-6 text-primary fw-bolder text-center mb-0">
									                	{answer.content}
									                  </h3>
								                  </div>
							                	</>
								                )}
								              </Draggable>
								            ))}
						            	{provided.placeholder}
										</div>
								        )}
								      </Droppable>
			            		</div>
			            	</div>
						</DragDropContext>
					)}
				</>
			)}
		</>
	);
};

export default TranslateGame;