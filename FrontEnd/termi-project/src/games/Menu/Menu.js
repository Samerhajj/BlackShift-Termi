import React, { useState,useEffect } from 'react';
import { FaMusic, FaVolumeMute, FaPlay, FaStop, FaBars } from 'react-icons/fa';
import { MdHome } from 'react-icons/md';
import { Link } from 'react-router-dom';
import "./Menu.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import fetchLeaderboardData from "../../api/LeaderboardsAPI";
import LeaderModal from './LeaderModal';
import backgroundVideo from "./testground.mp4";
import buttonClickSound from './sounds/buttonclick.wav';
import buttonRollOver from './sounds/buttonrollover.wav';
import "typeface-roboto"; 
function Menu({ handleStart, handleLeaderboard, handleMusicToggle, musicPlaying,gameName,selectedCategory }) {
  
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

  const [leaderboardData, setLeaderboardData] = useState(null);
const [gameTestName,setGameTestName]=useState(null);


  async function handleLeaderboard() {
    try {
      const category = selectedCategory;
      const limit = 10;

      // Call the API to get the leaderboard data
      const data = await fetchLeaderboardData(category, gameName, limit);
      
      // Set the leaderboard data in state
      setLeaderboardData(data);
    } catch (error) {
      console.error(error);
    }
  }

  console.log(gameName);
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
       <h1> Memory Game</h1>
       <h3>First Edition</h3>
      <div className="menu-item" onClick={handleStart}>
        <FaPlay className="menu-icon" />
        <span className="menu-text">Start</span>
      </div>
     <div className="menu-item" onClick={() => handleLeaderboard()}>
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
          <span className="menu-text">Main Menu</span>
        </div>
      </Link>
   {leaderboardData !== null && <LeaderModal data={leaderboardData} onClose={() => setLeaderboardData(null)} />}

    </div>
    </div>
    </>
  );
}

export default Menu;
