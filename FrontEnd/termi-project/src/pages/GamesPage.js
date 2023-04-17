// React
import React, { useState } from "react";

// Componenets
import GameCard from "../components/GameCard/GameCard";

// Translate
import { useTranslation } from 'react-i18next';

// Images & CSS
import BackwordImg from "../assets/images/backword-definition-img.jpg";
import MemoryImg from "../assets/images/memory-game-img.jpg";
import HangmanImg from "../assets/images/hangman-game-img.jpg";
import { useTrail, animated } from 'react-spring';

// Navigation
import { useNavigate } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import GameModal from "./GamePage/GameModal";

const GamesPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const games = [
    { 
      id: 0,
      title: t('games.backword-definition.title'),
      description:t('games.backword-definition.description'),
      instructions: t('games.backword-definition.step-by-step', { returnObjects: true }),
      path:"/games/backword-definition",
      img: BackwordImg
    },
    { 
      id: 1, title:t('games.memory-game.title'),
      description:t('games.memory-game.description'),
      instructions:t('games.memory-game.step-by-step', { returnObjects: true }),
      path:"/games/memory-game",
      img: MemoryImg
    },
    { 
      id: 2,
      title:t('games.hangman-game.title'),
      description:t('games.hangman-game.description'),
      instructions:t('games.hangman-game.step-by-step', { returnObjects: true }),
      path:"/games/hangman-game",
      img: HangmanImg
    },
  ];
  
  function handleOpenModal(game) {
    setShowModal(game);
  }
  
  // const instructions = {
  //   "backword-definition": t('games.backword-definition.step-by-step', { returnObjects: true }),
  //   "memory-game": t('games.memory-game.step-by-step', { returnObjects: true }),
  //   "hangman-game": t('games.hangman-game.step-by-step', { returnObjects: true }),
  // };
  const gamesTransition = useTrail(games.length, {
    from: { x: -100, transform: 'translate3d(0, 100%, 0)' },
    to: {x: 0, transform: 'translate3d(0, 0, 0)' },
    config:{duration: 500,delay: 200}
  });
  
 

  return (
    <>
    
      <div className="banner banner_game">
        <div className='wrapper'>
          <div className="banner_content"/>
        </div>
     
      </div>

      {/*<Container className="d-flex flex-wrap mt-3 justify-content-evenly align-items-stretch gap-3">
        {games.map((game) => (
            <GameCard key={game.id} game={game} showInstructionsModal={() => {handleOpenModal(game)}}/>
        ))}
      </Container>*/}
      
      <animated.div className="d-flex flex-wrap mt-3 justify-content-center justify-content-evenly align-items-stretch gap-3">
        {gamesTransition.map((styles, index) => (
          <animated.div className="col-md-4 col-lg-3 mb-3" key={games[index].id} style={styles}>
            <GameCard game={games[index]} showInstructionsModal={() => {handleOpenModal(games[index])}}/>
          </animated.div>
        ))}
      </animated.div>
      
      {/*<Container className="d-flex flex-wrap mt-3 justify-content-evenly align-items-stretch gap-3">
        {games.map((game, index) => (
       <animated.div className="col-md-4 col-lg-3 mb-3" key={game.id} style={gamesTransition[index]}>
            <GameCard game={game} showInstructionsModal={() => {handleOpenModal(game)}}/>
          </animated.div>
        ))}
      </Container>*/}

      {/*showModal && (<GameModal setShowModal={setShowModal} 
                                showModal={showModal} 
                                instructions={instructions}/>)
      */}
    </>
  );
};

export default GamesPage;


