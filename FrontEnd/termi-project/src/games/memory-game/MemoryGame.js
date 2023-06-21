// React
import React, {useEffect, useState, useContext,useRef} from "react";

// Components
import {LoginContext} from "../../components/LoginContext";
import Menu from "../Menu/Menu";
import LanguageSelector from '../../components/LanguageSelector';

// Translate
import { useTranslation } from 'react-i18next';

// CSS and Elements
import "./MemoryGame.css";
import "../GamesStyles.css";
import "typeface-roboto";
import { MdOutlineReplay,MdArrowBack } from "react-icons/md";
import MemoryGameBG from "./MemoryGameBG/MemoryGameBG";
import correctSFXaudio from "../../assets/sound/SFX/correct-sfx.wav";
import incorrectSFXaudio from "../../assets/sound/SFX/incorrect-sfx.mp3";

// APIs
import LanguageMap from '../../api/LanguageAPI';
import GamesApi from '../../api/GamesAPI';
import GameHistoryAPI from '../../api/GameHistoryAPI';
import AchievementsAPI from '../../api/AchievementsAPI';
import NotificationsAPI from '../../api/NotificationsAPI';



const MemoryGame = () => {
	const {userData, setUserData} = useContext(LoginContext);
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
	const streakCountRef = useRef(0);
	const [highestStreak, setHighestStreak] = useState(0);
	const gameName = 'Memory Game';
	
	const [correctSFX] = useState(new Audio(correctSFXaudio));
	const [incorrectSFX] = useState(new Audio(incorrectSFXaudio));

	const [musicPlaying, setMusicPlaying] = useState(true);
	const toggleMusic = () => setMusicPlaying(!musicPlaying);	
	
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
		        
		        for (var i=0;i<terms.length;i++)
		        {
		        	let conceptNameIndex = Math.floor(Math.random() * numOfCards);
		        	terms[i].conceptName.type = "concept name";
		        	allCards.splice(conceptNameIndex, 0, terms[i].conceptName);
		        	
		        	let shortDefinitionIndex = Math.floor(Math.random() * numOfCards);
		        	terms[i].shortDefinition.type = "short definition";
		        	allCards.splice(shortDefinitionIndex, 0, terms[i].shortDefinition);
		        	
		        	answers.set(terms[i].conceptName.english, terms[i].shortDefinition.english);
		        }
				setHighestStreak(0);
	        	setAnswers(answers);
		        setCards(allCards);
				setShowScore(false);
		        setStart(true);
				setNumOfTries(0);
				setPointsGained(0);
		    }else{
		    	NotificationsAPI.errorNotification(res.message);
		    }
		}else{
			NotificationsAPI.errorNotification("Must choose a category first");
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
				correctSFX.play();
				const newStreakCount = streakCountRef.current + 0.5;
				 if(newStreakCount>highestStreak)
			     {
				setHighestStreak(newStreakCount);  
				}
				streakCountRef.current = newStreakCount;
			      console.log(highestStreak);

				return(prevState);
			});
		}
		else{
			setFlipped(prevState => {
			    console.log(streakCountRef.current);
				prevState[0].feedbackClass = "incorrect";
				prevState[1].feedbackClass = "incorrect";
				streakCountRef.current = 0;

				incorrectSFX.play();
				 //return [...prevState];
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
		const achievementsRes = await AchievementsAPI.getAllAchievements();
		const allAchievements = achievementsRes.body;
		const achievements = allAchievements.filter((achievement) => achievement.relevantGame === "Memory Game");
		
		let points = 0;
		let numOfCards = cards.length;
		points = Math.floor((numOfCards/numOfTries) * 100);
		setPointsGained(points);
		setShowScore(true);
		
		const response = await GamesApi.updatePoints(userData._id, points, 'Memory Game', category);
		
		if(response.success)
		{
			
			localStorage.setItem("points",points);
			
			const addToHistory = await GameHistoryAPI.updateGameHistory(userData._id, 'Memory Game', points);
			
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
			
			if (numOfTries <= 15) {
				const achievementUnlocked = await unlockAchievement("NO WAY!", achievements);
				if(achievementUnlocked){
					achievedAchievement.push(achievementUnlocked);
				}
			}
			
	    	if (numOfTries <=10 ){
				const achievementUnlocked = await unlockAchievement("FANTASTIC!", achievements);
				if(achievementUnlocked){
					achievedAchievement.push(achievementUnlocked);
				}
	    	}
	    	
	    	if (numOfTries <=5 ){
				const achievementUnlocked = await unlockAchievement("IMPOSSIBLE!", achievements);
				if(achievementUnlocked){
					achievedAchievement.push(achievementUnlocked);
				}
		    }
		    
			// Updating the cached data
			setUserData({...userData,
					points: userData.points + points,
					achievements: [...userData.achievements,...achievedAchievement]
			});
		}else{
			console.log(response.message);
		}
	};
	
	
	const unlockAchievement = async (achievementName,achievements) => {
	  const achievement = achievements.find(
	    (achievement) => achievement.name === achievementName
	  );
	  
	  if (achievement != null) {
	    	const achivementResponse=await AchievementsAPI.updateAchievement(
		          userData._id,
		          achievement._id,
		          true
		        );
	    
	    console.log(achievementName);
	  	if(achivementResponse.success && achivementResponse.added)
				{
					NotificationsAPI.achievementNotification(achievement, "Achievement Unlocked!");
					// setUserData({...userData,achievements: [...userData.achievements,achievement._id]});
					return achievement._id;
				}
	  }
	}

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
	
	function handleGoBack(){
		setStart(false);
		setSolved([]);
		setFlipped([]);
		setDisabled(false);
		setNumOfTries(0);
		setPointsGained(0);
		setStart(false);
	}


	return (
		<>
			<MemoryGameBG/>
		   {/*musicPlaying && <audio src={songTest} autoPlay loop />*/}
			{!start ? (
			  <Menu
			    gameName={gameName}
			    handleMusicToggle={toggleMusic}
			    musicPlaying={musicPlaying}
			    handleStart={initGame}
			    edition={"First Edition"}
			    settings={{
					category: {initialCategory: category, categoryChanged: (newCategory => setCategory(newCategory))}
			    }}
			  />
			) : (
				<div dir="ltr">
					<div className="d-flex flex-wrap justify-content-between">
						<a className="exit-button" onClick={handleGoBack}>
	                    	<MdArrowBack/>
	                	</a>
	                	<LanguageSelector/>
	            	</div>
					{showScore ? (
						<div dir={LanguageMap[i18n.language].dir} className="score-box">
							<h2 className="score-title">{t('games.memory-game.score')}</h2>
							<h4>{t('games.memory-game.not')}: {numOfTries}</h4>
							<h4>{t('games.memory-game.pg')}: +{pointsGained} points</h4>
							<MdOutlineReplay className="restart-button" onClick={() => {restartGame()}}/>
						 </div>
					) : (
						<div>
							<div className="memory-cards-grid">
								{cards.map((card,index) =>{
									 const { feedbackClass } = flipped.find(card=>card.index === index) || { feedbackClass: '' };
									 const isSolved = solved.includes(index);
									 const isFlipped = flipped.find(element => element.index == index);
									 return (
										<div dir={LanguageMap[i18n.language].dir} 
											key={"card_" + index} 
											className={`memory-card ${disabled ? "disabled-memory-card" : ""} ${isFlipped ? 'flipped' : ''}`}>
										  
										    {isFlipped ? (
										        <div className={`front ${feedbackClass==='correct' ? 'correct' :''} ${feedbackClass==='incorrect' ? 'incorrect' :''}`}>
										            {card[LanguageMap[i18n.language].name]}
												</div>
										    ):(
										        <div className={`${isSolved ? 'front' : `${card.type==='concept name' ? 'back concept-name-type' :'back short-definition-type'}`}`} 
										        	 onClick={() => {if(!isSolved){flip(index)}}}>
									                    {card[LanguageMap[i18n.language].name]}
										        </div>
										    )}
										</div>
									)
								})}
							</div>
						</div>
					)}
				</div>
			)}
		</>
	);
};

export default MemoryGame;
				
				
{/*<div className="center-button">
	<div className="icon-selector-container">
		   <CategorySelector category={category} categoryChanged={(newCategory) => {changeCategory(newCategory)}}/>
		    	{/*<div className="icon-center">
		    	<AiFillPlayCircle className="icon-button" onClick={initGame}/>
		</div>
	</div>
</div>*/}