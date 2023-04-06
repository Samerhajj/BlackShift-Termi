// React
import React, {useEffect, useState, useContext} from "react";

// Components
import CategorySelector from "../../components/CategorySelector";
import {LoginContext} from "../../components/LoginContext";
import {CategoriesContext} from "../../components/CategoryContext";

// Translate
import { useTranslation } from 'react-i18next';

// CSS and Elements
import { MdOutlineReplay } from "react-icons/md";
import { AiFillPlayCircle } from "react-icons/ai";
import { Modal, Button } from "react-bootstrap";
import "./MemoryGame.css";

// APIs
import LanguageMap from '../../api/LanguageAPI';
import GamesApi from '../../api/GamesAPI';
import GameHistoryAPI from '../../api/GameHistoryAPI';


const MemoryGame = () => {
	// localStorage.setItem('currentPage', 'MemoryGame')//test

	const {userData, setUserData} = useContext(LoginContext);
	const { categories } = useContext(CategoriesContext);
	const { t, i18n } = useTranslation();
	const [cards, setCards] = useState([]);
	const [showScore, setShowScore] = useState(false);
	const [start, setStart] = useState(false);
	const [flipped, setFlipped] = useState([]);
	const [answers, setAnswers] = useState(new Map());
	const [solved, setSolved] = useState([]);
	const [disabled, setDisabled] = useState(false);
	const [numOfTries, setNumOfTries] = useState(0);
	const [pointsGained, setPointsGained] = useState(0);
	const [category, setCategory] = useState(userData.field);
	
	
	
	const restartGame = () => {
		setCards([]);
		setFlipped([]);
		setSolved([]);
		setAnswers(new Map());
		initGame();
	};
	
	const initGame = async () => {
		// get 5 random terms from the choosen category
		if(category !== undefined){
			let numOfTerms = 5;
			// let categoryId = category.categoryId;
			let numOfCards = numOfTerms * 2;
		    const res = await GamesApi.random(numOfTerms, category,'Memory Game');
		    if(res.success){
		        let terms = res.body;
		        let allCards = [];
		        let answers = new Map();
		        console.log(terms);
		        for (var i=0;i<terms.length;i++)
		        {
		        	let conceptNameIndex = Math.floor(Math.random() * numOfCards);
		        	allCards.splice(conceptNameIndex, 0, terms[i].conceptName);
		        	
		        	let shortDefinitionIndex = Math.floor(Math.random() * numOfCards);
		        	allCards.splice(shortDefinitionIndex, 0, terms[i].shortDefinition);
		        	
		        	answers.set(terms[i].conceptName.english, terms[i].shortDefinition.english);
		        }
	        	setAnswers(answers);
		        setCards(allCards);
				setShowScore(false);
		        setStart(true);
				setNumOfTries(0);
				setPointsGained(0);
		    }else{
		    	alert(res.message);
		    }
		}else{
			alert("Must choose a category first");
		}
	};
	
	const flip = (cardIndex) => {
		let newCard = {index: cardIndex, feedbackClass: ""};
		setFlipped([...flipped, newCard]);
	};
	
	const checkFlippedCards = () => {
		// Check if the first flipped card is its in the answers 
		let flipped0 = cards[flipped[0].index].english;
		let flipped1 = cards[flipped[1].index].english;
		if((answers.has(flipped0) && (answers.get(flipped0) == flipped1)) || (answers.has(flipped1) && (answers.get(flipped1) == flipped0))){
			setSolved([...solved, flipped[0].index, flipped[1].index]);
			setFlipped(prevState => {
				prevState[0].feedbackClass = "correct";
				prevState[1].feedbackClass = "correct";
				console.log(prevState[0].feedbackClass);
				return(prevState);
			});
		}
		else{
			setFlipped(prevState => {
				prevState[0].feedbackClass = "incorrect";
				prevState[1].feedbackClass = "incorrect";
				console.log(prevState[0].feedbackClass);
				return(prevState);
			});
		}
		setNumOfTries(numOfTries + 1);
		setTimeout(() => {
			setFlipped([]);
			setDisabled(false);
		}, 2000);
	};
	
	const finishGame = async() => {
		let points = 0;
		let numOfCards = cards.length;
		points = Math.floor((numOfCards/numOfTries) * 100);
		setPointsGained(points);//GamesApi//not putting in pointsGained
		setShowScore(true);
		const response = await GamesApi.updatePoints(userData._id, points, 'Memory Game', category);
        // const gameData = {
        //     userId: userData._id,
        //     gameName: 'Memory Game',
        //     score: points
        // };
        
		// const send = await GamesApi.
		if(response.success)
		{
			setUserData({...userData, points: userData.points + points});
			localStorage.setItem("points",points);
			
			const addToHistory = await GameHistoryAPI.updateGameHistory(userData._id, 'Memory Game', points);
         
          
		}else{
			console.log(response.message);
		}
		
	};
	
	const changeCategory = (newCategory) => {
		setCategory(newCategory);
	};
	
	useEffect(() => {
		console.log(flipped);
		if(flipped.length >=2){
			setDisabled(true);
			checkFlippedCards();
		}
	}, [flipped]);
	
	useEffect(() => {
		if((solved.length)/2 == answers.size && start && !showScore){
			finishGame();
		}
	}, [solved]);
	

	return (
		<>
			<div className="banner banner_game">
				<div className="wrapper">
					<div className="banner_content"></div>
				</div>
			</div>
			<h1>{t('games.memory-game.title')}</h1>
			{start ? (
				<div>
					{showScore ? (
						<div className="score-box">
							<h2>{t('games.memory-game.score')}</h2>
							<h4>{t('games.memory-game.not')} of tries: {numOfTries}</h4>
							<h4>{t('games.memory-game.pg')} gained: +{pointsGained} points</h4>
							<MdOutlineReplay className="icon-button" onClick={() => {restartGame()}}/>
						 </div>
					) : (
						<div className="memory-cards-grid">
							{cards.map((card,index) =>{
								 const { feedbackClass } = flipped.find(card=>card.index ===index) || { feedbackClass: '' };
								 return (
									<div key={index} className={disabled ? "memory-card disabled-memory-card" : "memory-card"}>
									
										{flipped.find(element => element.index == index) ? (
										
											<div className={`front ${feedbackClass==='correct' ? 'correct' :''} ${feedbackClass==='incorrect' ? 'incorrect' :''}`}>
												{card[LanguageMap[i18n.language].name]}
											</div>
										):(
											<>
												{solved.includes(index) ? (
													<div className="front">
														{card[LanguageMap[i18n.language].name]}
													</div>
												):(
													<div className="back" onClick={() => {flip(index)}}>
														{card[LanguageMap[i18n.language].name]}
													</div>
												)}
											</>
										)}
									</div>
								)
							})}
						</div>
					)}
				</div>
			) : (
				<div className="center-button">
					<div className="icon-selector-container">
						   <CategorySelector category={category} categoryChanged={(newCategory) => {changeCategory(newCategory)}}/>
						    	<div className="icon-center">
						    	<AiFillPlayCircle className="icon-button" onClick={initGame}/>
						</div>
					</div>
			    </div>
			    
			)}
		</>
	);
};

export default MemoryGame;