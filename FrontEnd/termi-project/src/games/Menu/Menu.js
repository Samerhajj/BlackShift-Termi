// React
import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';

// Translate
import { useTranslation } from 'react-i18next';

// CSS And Elements
import "./Menu.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "typeface-roboto";
import { FaMusic, FaVolumeMute, FaPlay, FaBars } from 'react-icons/fa';
import { MdHome, MdSettings } from 'react-icons/md';

import buttonClickSFXaudio from "../../assets/sound/SFX/button-mouse-click-sfx.wav";
import buttonEnterSFXaudio from "../../assets/sound/SFX/button-mouse-enter-sfx.wav";
import buttonLeaveSFXaudio from "../../assets/sound/SFX/button-mouse-leave-sfx.wav";

// Modals
import LeaderModal from './LeaderModal/LeaderModal';
import SettingsModal from './SettingsModal/SettingsModal';

function Menu({ handleStart, handleLeaderboard, handleMusicToggle, musicPlaying, gameName, selectedCategory, categoryChanged, edition, settings }) {
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
	const [buttonClickSFX] = useState(new Audio(buttonClickSFXaudio));
	const [buttonEnterSFX] = useState(new Audio(buttonEnterSFXaudio));
	const [buttonLeaveSFX] = useState(new Audio(buttonLeaveSFXaudio));
	const {t, i18n} = useTranslation();
	
  useEffect(() => {
    const links = document.querySelectorAll(".menu-item");

    const enterSound = () => {
      buttonEnterSFX.play();
    };
    
    const leaveSound = () => {
      buttonLeaveSFX.play();
    };

    const clickSound = () => {
      buttonClickSFX.play();
    };

    links.forEach(link => {
      link.addEventListener("mouseenter", enterSound);
      link.addEventListener("mouseleave", leaveSound);
      link.addEventListener("click", clickSound);
    });

    return () => {
      links.forEach(link => {
        link.removeEventListener("mouseenter", enterSound);
        link.removeEventListener("mouseleave", leaveSound);
        link.removeEventListener("click", clickSound);
      });
    };
  }, [musicPlaying]);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <>
      <div dir="ltr" className="menu-container">
         <h1>{gameName}</h1>
         <h3>{edition}</h3>
         
         <div className="menu-item" onClick={() => handleStart()}>
          <FaPlay className="menu-icon" />
          <span className="menu-text">{t('games.menu.start')}</span>
         </div>
         
         <div className="menu-item" onClick={() => setShowLeaderboard(true)}>
          <FaBars className="menu-icon" />
          <span className="menu-text">{t('games.menu.leaderboard')}</span>
         </div>
         
         <div className="menu-item" onClick={() => handleMusicToggle()}>
           {musicPlaying ? (
             <FaMusic className="menu-icon" />
           ) : (
             <FaVolumeMute className="menu-icon" />
           )}
           <span className="menu-text">{t('games.menu.music')}</span>
         </div>
         
         <div className="menu-item" onClick={() => setShowSettings(true)}>
           <MdSettings className="menu-icon" />
           <span className="menu-text">{t('games.menu.settings')}</span>
         </div>
         
         <Link className="text-decoration-none" to="/games">
           <div className="menu-item">
             <MdHome className="menu-icon" />
             <span className="menu-text">{t('games.menu.games-menu')}</span>
           </div>
         </Link>
         
        {showLeaderboard ? 
          <LeaderModal 
                    gameName={gameName}
                    onClose={() => setShowLeaderboard(false)} />
          :
          null
        }
        {showSettings ? 
          <SettingsModal
                    initialCategory={selectedCategory}
                    categoryChanged={(newCategory) => {categoryChanged(newCategory)}}
                    settings={settings}
                    onClose={() => setShowSettings(false)} />
          :
          null
        }
      </div>
    </>
  );
}

export default Menu;
