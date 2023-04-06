// import GameImg from "../assets/images/gameImg.svg";
import BackwordImg from "../assets/images/backword-definition-img.jpg";
import MemoryImg from "../assets/images/memory-game-img.jpg";
import HangmanImg from "../assets/images/hangman-game-img.jpg";

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import { Button } from "react-bootstrap";
import GameModal from "./GamePage/GameModal";

import GameCard from "../components/GameCard/GameCard"


const GamesPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  function handleOpenModal(game) {
    setShowModal(game);
  }

  const games = [
    { id: 0, title: t('games.backword-definition.title'), description:t('games.backword-definition.description'), path:"/games/backword-definition", img: BackwordImg },
    { id: 1, title:t('games.memory-game.title'), description:t('games.memory-game.description'), path:"/games/memory-game", img: MemoryImg },
    { id: 2, title:t('games.hangman-game.title'), description:t('games.hangman-game.description'), path:"/games/hangman-game", img: HangmanImg },
  ];

  const instructions = {
    "backword-definition": t('games.backword-definition.step-by-step', { returnObjects: true }),
    "memory-game": t('games.memory-game.step-by-step', { returnObjects: true }),
    "hangman-game": t('games.hangman-game.step-by-step', { returnObjects: true }),
  };

  return (
    <>
      <div className="banner banner_game">
        <div className='wrapper'>
          <div className="banner_content"/>
        </div>
      </div>

      <Container className="d-flex flex-wrap mt-3 justify-content-evenly align-items-stretch gap-3">
        {games.map((game) => (
        <>
          {/*<Card key={game.id} className="text-center mx-auto" style={{ width: "18rem" }}>
            <Card.Img className="p-5" variant="top" src={game.img} />
            <Card.Body>
              <Card.Title>{game.title}</Card.Title>
              <Card.Text>{game.description}</Card.Text>
            </Card.Body>
            <div className="m-2 d-flex justify-content-between flex-column flex-md-row">
              <Button
                className="me-2 mb-2 mb-md-0"
                variant="primary"
                onClick={() => navigate(game.path)}
              >
                {t('games.playButton')}
              </Button>
              <Button
                className="icon-button"
                variant="secondary"
                onClick={() => handleOpenModal(game)}
              >
                {t('games.instructionsButton')}
              </Button>
            </div>
          </Card>*/}
          <GameCard key={game.id} game={game} showInstructionsModal={() => {handleOpenModal(game)}}/>
        </>
        ))}
      </Container>

      {showModal && (<GameModal setShowModal={setShowModal} 
                                showModal={showModal} 
                                instructions={instructions}/>)
      }
    </>
  );
};

export default GamesPage;



        // <Modal show={true} onHide={() => setShowModal(null)}>
        //   <Modal.Header className="mx-0" closeButton>
        //     <Modal.Title className="ms-auto">
        //       {t(`games.${showModal.path.split("/")[2]}.modalTitle`)}
        //     </Modal.Title>
        //   </Modal.Header>
        //   <Modal.Body>
        //     <ul>
        //       {instructions[showModal.path.split("/")[2]].map((step) => (
        //         <li key={step.id}>{step.text}</li>
        //       ))}
        //     </ul>
        //   </Modal.Body>
        //   <Modal.Footer>
        //     <Button variant="primary" onClick={() => setShowModal(null)}>
        //       {t('games.backButton')}
        //     </Button>
        //   </Modal.Footer>
        // </Modal>