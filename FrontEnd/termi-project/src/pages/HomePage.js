import styles from '../styles/HomePage.css';
import React, { useEffect ,useState } from 'react';
import { useTranslation } from 'react-i18next';
// images
import handsHelpingIcon from "../assets/images/Icon awesome-hands-helping.svg";
import robotIcon from "../assets/images/Icon awesome-robot.svg";
import ronaldo from "../assets/images/ronaldo.png";
import gamesIcon from "..//assets/images/gamepad-solid.svg";
import christmasSong from "../assets/images/christmas-song.mp3";

const HomePage = () => {
    const { t } = useTranslation();
    const audioElement = document.getElementById('my-music');
    const playButton = document.getElementById('play-button');
    window.onload = function() {

    playButton.addEventListener('click', () => {
      if (audioElement.paused) {
        audioElement.play();
      } else {
        audioElement.pause();
      }
    });
};
    
    const [currentSlide, setCurrentSlide] = useState(0);
    
    const slides = [
    {
      image: ronaldo,
      title: `'James's Success Story'`,
      content: `Meet James, a high school student who always struggled with learning new languages. Despite his best efforts, he found that he just couldn't seem to retain vocabulary or grasp the grammar concepts. Frustrated and discouraged, he almost gave up on his dream of becoming fluent in French.

That is, until he discovered Termi. With its engaging games and interactive quizzes, James found that he was finally able to make progress in his French studies. He spent just a few months using your app, and before he knew it, he was able to hold basic conversations in French and understand spoken and written French with increasing ease.

Thanks to Termi, James's hard work and dedication paid off. He was accepted into a study abroad program in France and spent a semester living and studying in a small town in the Loire Valley. He returned home with a newfound fluency in French and a wealth of unforgettable experiences.

James's story is just one example of the many success stories that have come out of using Termi. By featuring stories like this in your carousel, you can inspire and motivate other users to pursue their language learning goals.`
    },
    // Add more slides here
    {
      image: handsHelpingIcon,
      title: 'hands Test',
      content: 'Content for slide 2'
    },
  ];
  

    return (
        <>
            <div className="banner banner_home">
                <div className="wrapper">
               
                    <div className="banner_content">
                     <div className="pulsing-element">
                        <h1>{t('home.title-1')}<br/><strong>{t('home.title-2')}</strong></h1>
                        <p>{t('home.subtitle')}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="wrapper">
            
              <div className="box_process cf" dir="ltr">  
                <div className="box">
                    <span style={{backgroundColor: '#9824C6'}}>
                        <img src={handsHelpingIcon} alt="hands"/>
                    </span>
                    <h2> {t('home.hand-title')}</h2>
                    <p> {t('home.hand-content')}</p>
                </div>
                <div className="box">
                    <span style={{backgroundColor: '#FDD85B'}}>
                        <img src={robotIcon} alt="robot"/>
                    </span>
                    <h2>{t('home.robot-title')}</h2>
                    <p>{t('home.robot-content')}</p>
                </div>
                <div className="box">
                    <span style={{backgroundColor: '#4e80cf'}}>
                        <img src={gamesIcon} alt="games"/>
                    </span>
                    <h2>{t('home.game-title')}</h2>
                    <p>{t('home.game-content')}</p>
                </div>
              </div>
              <h2>hello there</h2>
            </div>          
        </>
    );
};

export default HomePage;

//   useEffect(() => {
//   const interval = setInterval(() => {
//     setCurrentSlide((currentSlide + 1) % slides.length);
//   }, 10000);

//   return () => clearInterval(interval);
// }, [currentSlide]);

//               <audio id="my-music" src={christmasSong}></audio>
//           <button id="play-button">Play Music</button>
//              <div className="carousel-container">
//       {slides.map((slide, index) => (
//         <div
//           className={`slide ${index === currentSlide ? 'active' : ''}`}
//           key={index}
//         >
//           <img src={slide.image} alt={slide.title} />
//           <div className="slide-content">
//             <h2>{slide.title}</h2>
//             <p><h2>{slide.content}</h2></p>
//           </div>
         
//         </div>
//       ))}
//     </div>

