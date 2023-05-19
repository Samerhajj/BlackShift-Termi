// --> React
import React, { useState, useEffect, useRef } from 'react';

// --> Styles And Css
import style from './AchievementBoard.css';

// --> APIs
import AchievementsAPI from '../../api/AchievementsAPI';

// --> Components
import Achievement from '../Achievement/Achievement';

// --> Framer Motion
import { motion, useInView ,AnimatePresence } from 'framer-motion/dist/framer-motion';

// --> Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper';

// Import Swiper styles
import 'swiper/swiper-bundle.min.css';

// Import Swiper Navigation styles
import 'swiper/modules/navigation/navigation.min.css';

SwiperCore.use([Navigation]);

const AchievementBoard = (props) => {
  const [achievements, setAchievements] = useState([]);
  const [gameNames, setGameNames] = useState([]);
  const [selectedGameName, setSelectedGameName] = useState('');
  const gameAchievementsRef = useRef(null);
  const isInView = useInView(gameAchievementsRef);
  const swiperRef = useRef(null);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
   
  const fetchAchievements = async () => {
    const response = await AchievementsAPI.getAllAchievements();
    if (response.success) {
      setAchievements(response.body);
    } else {
      alert(response.message);
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  useEffect(() => {
    // Get unique game names from achievements
    const names = [...new Set(achievements.map((a) => a.relevantGame))];
    console.log(names);
    setGameNames(names);
    setSelectedGameName(names.length > 0 ? names[0] : ''); // set first game name as default
  }, [achievements]);

  const handleGameNameSlideChange = (swiper) => {
    const currentSlideIndex = swiper.activeIndex;
    const currentSlide = swiper.slides[currentSlideIndex];
    const gameName = currentSlide.textContent.trim();
    setSelectedGameName(gameName);
     setActiveSlideIndex(currentSlideIndex);
     console.log(activeSlideIndex);
  };

  return (
    <div ref={gameAchievementsRef} className="achievements-section d-flex flex-wrap justify-content-center align-content-center pb-5 gap-5">
       <Swiper
        navigation
        className="swiper-container"
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => {
          handleGameNameSlideChange(swiper);
        }}
        activeslideindex={activeSlideIndex} 
      >
      {gameNames.map((gameName, slideIndex) => (
        <SwiperSlide key={gameName}>
          <div className="game-name text-center text-light fs-3 fw-bold py-3">
            {gameName}
          </div>
          <div className="d-flex flex-wrap justify-content-center align-content-center pb-5 px-5 gap-5">
            {achievements
              .filter((achievement) => achievement.relevantGame === gameName)
              .map((achievement, index) => (
                <motion.div
                 key={activeSlideIndex + '-' + slideIndex + '-' + achievement._id + isInView}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: activeSlideIndex === slideIndex && isInView ? 1 : 0,
                    scale: activeSlideIndex === slideIndex && isInView ? 1 : 0,
                  }}
                  exit={{ opacity: 0, scale: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
              <Achievement
                image={achievement.image}
                name={achievement.name}
                relevantGame={achievement.relevantGame}
                description={achievement.description}
                requirement={achievement.requirement}
                achieved={
                  props.achievements
                    ? props.achievements.includes(achievement._id)
                    : false
                }
              />
            </motion.div>
          ))}
      </div>
    </SwiperSlide>
     ))}
      </Swiper>
    </div>
  );
};
export default AchievementBoard;



// // --> React
// import React, { useState, useEffect, useRef } from 'react';

// // --> Styles And Css
// import style from './AchievementBoard.css';

// // --> APIs
// import AchievementsAPI from '../../api/AchievementsAPI';

// // --> Components
// import Achievement from '../Achievement/Achievement';

// // --> Framer Motion
// import { motion, useInView } from 'framer-motion/dist/framer-motion';

// import SwiperCore, { Navigation } from 'swiper';
// import Swiper from 'swiper';
// import 'swiper/swiper-bundle.css';
// import 'swiper/modules/navigation/navigation.min.css';



// // --> Font Awesome
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faChevronRight } from '@fortawesome/free-solid-svg-icons';


// SwiperCore.use([Navigation]);

// const AchievementBoard = (props) =>{
//     const [achievements, setAchievements] = useState([]);
//     const [gameNames, setGameNames] = useState([]);
//     const [selectedGameName, setSelectedGameName] = useState('');
    
//     const gameAchievementsRef = useRef(null);
//     const isInView = useInView(gameAchievementsRef);

//     const fetchAchievements = async () => {
//         const response = await AchievementsAPI.getAllAchievements();
//         if(response.success){
//             setAchievements(response.body);
//         }else{
//             alert(response.message);
//         }
//     };

//     useEffect(() => {
//         fetchAchievements();
//     },[]);

//     useEffect(() => {
//         // Get unique game names from achievements
//         const names = [...new Set(achievements.map((a) => a.relevantGame))];
//         setGameNames(names);
//         setSelectedGameName(names.length > 0 ? names[0] : ''); // set first game name as default
//     }, [achievements]);
    
    

// useEffect(() => {
//   const mySwiper = new Swiper('.swiper-container', {
//     slidesPerView: '6',
//     navigation: {
//       nextEl: '.swiper-button-next',
//       prevEl: '.swiper-button-prev',
//     },
//     // your options here
//   });
// }, []);


//     const handleGameNameClick = (name) => {
//         setSelectedGameName(name);
//     };

//     const filteredAchievements = achievements.filter((a) => a.relevantGame === selectedGameName);

//     return (
//         <div>
//             <div className="game-name-filter">
//                 {gameNames.map((name) => (
//                     <button
//                         key={name}
//                         className={selectedGameName === name ? 'active' : ''}
//                         onClick={() => handleGameNameClick(name)}
//                     >
//                         {name} <FontAwesomeIcon icon={faChevronRight} />
//                     </button>
//                 ))}
//             </div>
//             <div ref={gameAchievementsRef} className="achievements-section d-flex flex-wrap justify-content-center align-content-center pb-5 gap-5">
//                   <div className="swiper-container">
//   <div className="swiper-wrapper">
//     {filteredAchievements.map((achievement, index) => (
//       <div className="swiper-slide" key={achievement._id}>
//         <motion.div
//           initial={{ opacity: 0, scale: 0 }}
//           animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0 }}
//           exit={{ opacity: !isInView ? 0 : 1, scale: !isInView ? 0 : 1 }}
//           transition={{ duration: 0.5, delay: index * 0.2 }}
//         >
//           <Achievement
//             image={achievement.image}
//             name={achievement.name}
//             relevantGame={achievement.relevantGame}
//             description={achievement.description}
//             requirement={achievement.requirement}
//             achieved={props.achievements ? props.achievements.includes(achievement._id) : false}
//           />
//         </motion.div>
//       </div>
//     ))}
//   </div>
// </div>
//             </div>
//         </div>
//     );
// };

// export default AchievementBoard;
