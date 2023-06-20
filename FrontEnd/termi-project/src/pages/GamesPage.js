// React
import React, { useState, useEffect} from "react";

// Componenets
import GameCard from "../components/GameCard/GameCard";

// Translate
import { useTranslation } from 'react-i18next';

// Images & CSS
import BackwordImg from "../assets/images/backword-definition-img.jpg";
import MemoryImg from "../assets/images/memory-game-img.jpg";
import HangmanImg from "../assets/images/hangman-game-img.jpg";
import TranslateImg from "../assets/images/translate-game-img.png";
import { motion, stagger, animate } from 'framer-motion/dist/framer-motion';

import Container from 'react-bootstrap/Container';

const GamesPage = () => {
  const { t } = useTranslation();
  const games  = [
    { 
      id: 0,
      title: t('games.backword-definition.title'),
      instructions: t('games.backword-definition.step-by-step', { returnObjects: true }),
      path:"/games/backword-definition",
      img: BackwordImg
    },
    { 
      id: 1, title:t('games.memory-game.title'),
      instructions:t('games.memory-game.step-by-step', { returnObjects: true }),
      path:"/games/memory-game",
      img: MemoryImg
    },  
    { 
      id: 2,
      title:t('games.hangman-game.title'),
      instructions:t('games.hangman-game.step-by-step', { returnObjects: true }),
      path:"/games/hangman-game",
      img: HangmanImg
    },
    { 
      id: 3,
      title: "Translate Game",
      instructions:t('games.hangman-game.step-by-step', { returnObjects: true }),
      path:"/games/translate-game",
      img: TranslateImg
    },
  ];
  
  useEffect(() => {
    animate(".item", { y: 50, opacity: 1 },{duration: 0.3, delay: stagger(0.1, { startDelay: 0.15 }) });
  }, []);

  return (
    <>
    
      <div className="banner banner_game">
        <div className='wrapper'>
          <div className="banner_content"/>
        </div>
      </div>

       <Container className="d-flex flex-wrap mt-3 justify-content-evenly align-items-stretch gap-4">
        {games.map((game, index) => (
          <motion.div key={game.id} className="item">
            <GameCard id={`id_${game.title}`}  game={game} />
          </motion.div>
        ))}
      </Container>
    </>
  );
};

export default GamesPage;




 {/*<Container className="d-flex flex-wrap mt-3 justify-content-evenly align-items-stretch gap-4">
        {games.map((game) => (
            <GameCard key={game.id} game={game}/>
        ))}
      </Container>*/}
      
      {/*<animated.div className="d-flex flex-wrap mt-3 justify-content-center justify-content-evenly align-items-stretch gap-3">
        {gamesTransition.map((styles, index) => (
          <animated.div className="col-md-4 col-lg-3 mb-3" key={games[index].id} style={styles}>
            <GameCard game={games[index]} showInstructionsModal={() => {handleOpenModal(games[index])}}/>
          </animated.div>
        ))}
      </animated.div>*/}