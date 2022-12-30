import GameImg from "../images/gameImg.svg";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import {useNavigate} from "react-router-dom";
import React from "react";
import {handleOpenModal} from "../games/backward-definition/BackDefinition";
import { useTranslation } from 'react-i18next';
const GamesPage = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const games = {
0: { title: t('games.backword-definition.title'), description:t('games.backword-definition.description'), path:"/games/back-definition", img: GameImg }
    // 1: { title:"Wordle", description:"In this game ...", path:"/games/wordle", img: GameImg },
    // 2: { title:"Hangman", description:"Try to Guess the game before gallowing the user", path:"/games/hangman", img: GameImg }
  };
  return (
    
    <>
      <div className="banner banner_game">
        <div className='wrapper'>
          <div className="banner_content"/>
        </div>
      </div>
      
      
     <Container className="d-flex flex-wrap" style={{ gap: "10px" }}>
       {Object.keys(games).map((game) => (
    <Card key={game} style={{ width: "18rem" }}>
      <Card.Img className="p-5" variant="top" src={games[game].img} />
      <Card.Body>
        <Card.Title>{games[game].title}</Card.Title>
        <Card.Text>{games[game].description}</Card.Text>
      </Card.Body>
      <div className="m-2 d-flex justify-content-between">
        <Button
          className="me-2"
          variant="primary"
          onClick={() => {
            navigate(games[game].path);
          }}
        >
          Play Game
        </Button>
        <Button variant="light" >?</Button>
       
      </div>
    </Card>
  ))}
</Container>
    </>
  );
}

export default GamesPage;
