// --> React
import React,{useState, useEffect, useContext} from 'react';

// --> Styles And Css
import style from "./AchievementBoard.css";

// --> APIs
import AchievementsAPI from '../../api/AchievementsAPI';

// --> Components
import Achievement from "../Achievement/Achievement";

const AchievementBoard = (props) =>{
    const [achievements, setAchievements] = useState([]);
    
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
    return(
        <div className="achievements-section d-flex flex-wrap justify-content-center align-content-center pb-5 gap-5">
            {
                achievements.map((achievement, index) => {
                    return(
                        <>
                            <Achievement 
                                key={index}
                                image={achievement.image}
                                name={achievement.name}
                                relevantGame={achievement.relevantGame}
                                description={achievement.description}
                                requirement={achievement.requirement}
                                achieved={props.achievements ? props.achievements.includes(achievement._id) : false}/>
                        </>
                    );
                })
            }
        </div>
    );
};

export default AchievementBoard;