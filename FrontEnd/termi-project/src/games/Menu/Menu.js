import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';

import { FaMusic, FaVolumeMute, FaPlay, FaStop, FaBars } from 'react-icons/fa';
import { MdHome } from 'react-icons/md';
import "./Menu.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import backgroundVideo from "./testground.mp4";
import buttonClickSound from './sounds/buttonclick.wav';
import buttonRollOver from './sounds/buttonrollover.wav';
import "typeface-roboto"; 

import LeaderModal from './LeaderModal';

function Menu({ handleStart, handleLeaderboard, handleMusicToggle, musicPlaying, gameName, selectedCategory }) {
  
  useEffect(() => {
    const audioClick = document.getElementById("audioClick");
    const audioHover = document.getElementById("audioHover");
    const links = document.querySelectorAll(".menu-item");

    const hoverSound = () => {
      audioHover.play();
    };

    const clickSound = () => {
      audioClick.play();
    };

    audioClick.addEventListener("ended", () => {
      audioClick.currentTime = 0;
    });

    audioHover.addEventListener("ended", () => {
      audioHover.currentTime = 0;
    });

    links.forEach(link => {
      link.addEventListener("mouseenter", hoverSound);
      link.addEventListener("click", clickSound);
    });

    return () => {
      links.forEach(link => {
        link.removeEventListener("mouseenter", hoverSound);
        link.removeEventListener("click", clickSound);
      });
    };
  }, []);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  return (
    <>
      <audio id="audioClick">
      <source src={buttonClickSound} type="audio/wav" />
    </audio>
    
      <audio id="audioHover">
      <source src={buttonRollOver} type="audio/wav" />
    </audio>
    
      
     <div className="screen">
      <video autoPlay muted id="background">
        <source src={backgroundVideo} type="video/mp4" />
      </video>
       <div className="menu-container">
       <h1>{gameName}</h1>
       <h3>First Edition</h3>
      <div className="menu-item" onClick={handleStart}>
        <FaPlay className="menu-icon" />
        <span className="menu-text">Start</span>
      </div>
     <div className="menu-item" onClick={() => setShowLeaderboard(true)}>
        <FaBars className="menu-icon" />
        <span className="menu-text">Leaderboard</span>
      </div>
      <div className="menu-item" onClick={handleMusicToggle}>
        {musicPlaying ? (
          <FaMusic className="menu-icon" />
        ) : (
          <FaVolumeMute className="menu-icon" />
        )}
        <span className="menu-text">Music</span>
      </div>
      <Link to="/games">
        <div className="menu-item">
          <MdHome className="menu-icon" />
          <span className="menu-text">Games Menu</span>
        </div>
      </Link>
      {showLeaderboard ? 
        <LeaderModal gameName={gameName} onClose={() => setShowLeaderboard(false)} />
        :
        null
      }
    </div>
    </div>
    </>
  );
}

export default Menu;
