// React
import React from 'react';
import Popup from 'reactjs-popup';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';


// CSS
import style from "./GameCard.css";

const GameCard = (props) =>{
    const { t } = useTranslation();
    const navigate = useNavigate();
    
    return(
        <div className="game-card img-fluid" onClick={() => navigate(props.game.path)}>
            <img className="game-img" src={props.game.img}/>
            
                <Popup trigger={<button id={`id_${props.game.title}_instructions`} className="game-instructions-button btn btn-light fw-bold">?</button>}
                       position="bottom center"
                       modal
                       className="instructions-popup">
                    {close => (
                        <div className="instructions-popup-background">
                            <div id="id_instructions_popup_title" className="instructions-popup-title">{props.game.title}</div>
                            <div className="instructions-popup-container">
                                <div className="instructions-popup-text">
                                    {props.game.instructions.map((step) => (
                                        <li key={step.id}>{step.text}</li>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="instructions-popup-actions d-flex justify-content-around">
                                <button className="btn btn-primary" onClick={() => navigate(props.game.path)}>{t('games.play-button')}</button>
                                <button id="id_back_popup_button" className="btn btn-outline-secondary" onClick={() => close()}>{t('games.back-button')}</button>
                            </div>
                        </div>
                        )}
                </Popup>
            <h3 className="game-title text-center p-3">{props.game.title}</h3>
        </div>
    );
};

export default GameCard;