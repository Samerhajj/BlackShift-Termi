// --> React
import React,{useState, useEffect} from 'react';

// --> Styles And Css
import style from "./Achievement.css";
import Image from "react-bootstrap/Image";

// --> Components

const Achievement = (props) =>{
    return(
        <div className={`d-flex flex-column align-items-center achievement-container ${props.achieved ? 'achieved' : ''}`}>
            <Image className="achievement-img" src={process.env.React_App_StorageURL+ "blackshift" + "/" + props.image}/>
            <span className="fs-4 text-white fw-bold text-center w-auto">{props.name}</span>
            <span className="achievement-requirement text-white text-center w-auto">{props.requirement}</span>
        </div>
    );
};

export default Achievement;