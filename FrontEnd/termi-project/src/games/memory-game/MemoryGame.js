// import "./BackDefinition.css";
import React, {useEffect, useState} from "react";
import { useTranslation } from 'react-i18next';
import play_Icon from "../../images/play_Icon.svg";
import { Modal, Button } from "react-bootstrap";
import "./MemoryGame.css";

// APIs
import LanguageMap from '../../api/LanguageAPI';
import GamesApi from '../../api/GamesAPI';

const MemoryGame = () => {
	const { t, i18n } = useTranslation();
	const [cards, setCards] = useState([]);
	const [showScore, setShowScore] = useState(false);
	const [start, setStart] = useState(false);
	const [flipped, setFlipped] = useState([]);
	const [answers, setAnswers] = useState(new Map());
	const [solved, setSolved] = useState([]);
	const [disabled, setDisabled] = useState(false);
	
	const initGame = async () => {
		// get 5 random terms from category 0
		let numOfTerms = 5;
		let categoryId = 0;
		let numOfCards = numOfTerms * 2;
	    const res = await GamesApi.random(numOfTerms, categoryId);
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
	        setStart(true);
	    }else{
	    	console.log(res.message);
	    }
	};
	
	const flip = (cardIndex) => {
		setFlipped([...flipped, cardIndex]);
	};
	
	const checkFlippedCards = () => {
		// Check if the first flipped card is its in the answers 
		let flipped0 = cards[flipped[0]].english;
		let flipped1 = cards[flipped[1]].english;
		if((answers.has(flipped0) && (answers.get(flipped0) == flipped1)) || (answers.has(flipped1) && (answers.get(flipped1) == flipped0))){
			setSolved([...solved, flipped[0], flipped[1]]);
		}
		setTimeout(() => {
			setFlipped([]);	
			setDisabled(false);
		}, 2000);
	};
	
	useEffect(() =>{
		if(flipped.length >=2){
			setDisabled(true);
			checkFlippedCards();
		}
	}, [flipped]);
	
	return (
		<>
			<div className="banner banner_game">
				<div className="wrapper">
					<div className="banner_content"></div>
				</div>
			</div>
			<h1>Memory Game</h1>
			{start ? (
				<div className="box">
					{showScore ? (
						<div>
    						 <Button variant="primary"  onClick={() => {initGame()}} className="restart-button small button">
    					        Play again
    						 </Button>
						 </div>
					) : (
					<div className="memory-cards-grid">
						{cards.map((card,index) => (
							<div key={index} className={disabled ? "memory-card disabled-memory-card" : "memory-card"}>
								{flipped.includes(index) || solved.includes(index) ? (
									<div className="front">
										{card.english}
									</div>
								):(
									<div className="back" onClick={() => {flip(index)}}>
										{card.english}
									</div>	
								)}
							</div>
						))}
					</div>
					)}
				</div>
				) : (
					<div className="center-button ">
					    <button className="circle-button" onClick={() => {initGame()}}>
					        <img src={play_Icon}/>
					    </button>
				    </div>
				)}
				
		</>
	);
}

export default MemoryGame;