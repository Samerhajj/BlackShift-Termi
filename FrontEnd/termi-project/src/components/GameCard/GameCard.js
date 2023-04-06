import React from 'react';
import { useNavigate } from "react-router-dom";
import style from "./GameCard.css";

const GameCard = (props) =>{
    const navigate = useNavigate();
    
    const showInstructions = (e)=>{
        e.stopPropagation();
        props.showInstructionsModal();
    };
    
    return(
        <div className="game-card" onClick={() => navigate(props.game.path)}>
            <img className="game-img" src={props.game.img}/>
            <button className="game-instructions-button btn btn-light fw-bold" onClick={(e) => showInstructions(e)}>?</button>
            <h3 className="game-title text-center p-3">{props.game.title}</h3>
        </div>
    );
};

export default GameCard;