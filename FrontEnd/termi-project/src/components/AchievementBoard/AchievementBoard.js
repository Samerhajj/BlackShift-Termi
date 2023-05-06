// --> React
import React, { useState, useEffect } from 'react';

// --> Styles And Css
import style from './AchievementBoard.css';

// --> APIs
import AchievementsAPI from '../../api/AchievementsAPI';

// --> Components
import Achievement from '../Achievement/Achievement';

// --> Framer Motion
import { motion, AnimatePresence } from 'framer-motion/dist/framer-motion';

// --> Font Awesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

const AchievementBoard = (props) =>{
    const [achievements, setAchievements] = useState([]);
    const [gameNames, setGameNames] = useState([]);
    const [selectedGameName, setSelectedGameName] = useState('');

    const fetchAchievements = async () => {
        const response = await AchievementsAPI.getAllAchievements();
        if(response.success){
            setAchievements(response.body);
        }else{
            alert(response.message);
        }
    };

    useEffect(() => {
        fetchAchievements();
    },[]);

    useEffect(() => {
        // Get unique game names from achievements
        const names = [...new Set(achievements.map((a) => a.relevantGame))];
        setGameNames(names);
        setSelectedGameName(names.length > 0 ? names[0] : ''); // set first game name as default
    }, [achievements]);

    const handleGameNameClick = (name) => {
        setSelectedGameName(name);
    };

    const filteredAchievements = achievements.filter((a) => a.relevantGame === selectedGameName);

    return (
        <div>
            <div className="game-name-filter">
                {gameNames.map((name) => (
                    <button
                        key={name}
                        className={selectedGameName === name ? 'active' : ''}
                        onClick={() => handleGameNameClick(name)}
                    >
                        {name} <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                ))}
            </div>
            <div className="achievements-section d-flex flex-wrap justify-content-center align-content-center pb-5 gap-5">
                    {filteredAchievements.map((achievement, index) => (
                        <motion.div
                            key={achievement._id}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            transition={{ duration: 0.5, delay:index * 0.2 }}
                        >
                            <Achievement
                                image={achievement.image}
                                name={achievement.name}
                                relevantGame={achievement.relevantGame}
                                description={achievement.description}
                                requirement={achievement.requirement}
                                achieved={props.achievements ? props.achievements.includes(achievement._id) : false}
                            />
                        </motion.div>
                    ))}
            </div>
        </div>
    );
};

export default AchievementBoard;
