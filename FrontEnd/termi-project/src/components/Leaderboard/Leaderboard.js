// --> React
import React,{useState, useEffect, useContext, useRef} from 'react';

// --> Styles And Css
import style from "./Leaderboard.css";
import Image from "react-bootstrap/Image";
import { motion, useInView, AnimatePresence } from 'framer-motion/dist/framer-motion';

// --> APIs
import LeaderboardsAPI from '../../api/LeaderboardsAPI';

// --> Components
import CategorySelector from "../../components/CategorySelector";
import {LoginContext} from "../../components/LoginContext";

const Leaderboard = (props) =>{
	const {userData} = useContext(LoginContext);
	
	const [category, setCategory] = useState(userData.field);
    const [context, setContext] = useState(props.context);
    const [contexts, setContexts] = useState([]);
    const [limit, setLimit] = useState(50);
    const [leaderboardInfo, setLeaderboardInfo] = useState({});
    const [leaderboard, setLeaderboard] = useState([]);
    
    const leaderboardRef = useRef(null);
    const isInView = useInView(leaderboardRef);
    
    const changeCategory = (newCategory) => {
        setCategory(newCategory);
    };
    
    const changeContext = (newContext) => {
        console.log(newContext);
        setContext(newContext);
    };
    
    const fetchLeaderboard = async () => {
        if(context != null){
            const response = await LeaderboardsAPI.getLeaderboard(category, context, limit);
            if(response.success){
                let leaderboardInfo = {
                    categoryId: response.body.categoryId,
                    context: response.body.context,
                    userRank: response.body.userRank,
                    userScore: response.body.userScore
                };
                setLeaderboardInfo(leaderboardInfo);
                setLeaderboard(response.body.leaderboard);
            }else{
                console.log(response.message);
            }
        }
    };
    
    const fetchAvailableContexts = async () => {
        const res = await LeaderboardsAPI.getAvailableContexts(category);
        if(res.success){
            setContexts(res.body.contexts);
            if(res.body.contexts && props.changeable){
                setContext(res.body.contexts[0]);
            }
        }else{
            console.log(res.message);
        }
    };
    
    useEffect(() => {
        fetchLeaderboard();
    }, [category, context]);
    
    useEffect(() => {
        fetchAvailableContexts();
    }, [category]);
    
    return(
        <div ref={leaderboardRef} className="backboard" dir="ltr">
            <div className="d-flex flex-wrap justify-content-center gap-1">
                <div>
                    <CategorySelector category={category} categoryChanged={(newCategory) => {changeCategory(newCategory)}}/>
                </div>
                    { props.changeable ?
                        <>
                            { contexts ?
                            <div className="form-floating" dir="ltr">
                                <select 
                                    id="contextSelect"
                                    className="selectpicker show-menu-arrow form-select mb-2 pb-1"
                                    data-style="btn-primary"
                                    title="Context"
                                    value={context}
                                    onChange={(e)=>{changeContext(e.target.value)}}>
                                    {
                                        contexts.map((option, index) => {
                                        return (
                                            <option key={index} value={option}>{option}</option>
                                        )})
                                    }
                                </select>
                                <label htmlFor="contextSelect">Leaderboard for</label>
                            </div>
                            :
                            <h5 className="p-3 text-danger">This category doesn't have any leaderboards</h5>
                            }
                        </>
                        :
                        null
                    }
            </div>
            {leaderboard && leaderboard.length > 0 ?
                <div className="leaderboard-info">
                    <div className="user-rank-container text-center">
                        <motion.div className="d-flex flex-column"
                                    key={leaderboardInfo.context + leaderboardInfo.category + "_userRank" + isInView}
                                    initial={{opacity: 0, x:-60}}
                                    animate={{opacity: isInView ? 1 : 0, x: isInView ? 0 : -60}}
                                    
                                    transition={{duration: 0.6}}>
                            <motion.span>My Rank</motion.span>
                            <motion.span className="fs-3 fw-bold">{leaderboardInfo.userRank == 0 ? "N/A" : "#" + leaderboardInfo.userRank}</motion.span>
                        </motion.div>
                        
                        <motion.div 
                                key={leaderboardInfo.context + leaderboardInfo.category + "_img" + isInView}
                                initial={{opacity: 0, y: -20}}
                                animate={{opacity: isInView ? 1 : 0, y: isInView? 0 : -20}}
                                transition={{duration: 0.6}}>
                            { leaderboardInfo.userRank == 1 ?
                                <Image className="rank-img-display" src={process.env.React_App_BaseURL + "Storage" + "/" + "Ranks" + "/" + "Rank1.png"}/>
                            :null}
                            
                            { leaderboardInfo.userRank == 2 ?
                                <Image className="rank-img-display" src={process.env.React_App_BaseURL + "Storage" + "/" + "Ranks" + "/" + "Rank2.png"}/>
                            :null}
                            
                            { leaderboardInfo.userRank == 3 ?
                                <Image className="rank-img-display" src={process.env.React_App_BaseURL + "Storage" + "/" + "Ranks" + "/" + "Rank3.png"}/>
                            :null}
                            
                            { leaderboardInfo.userRank >= 4?
                                <Image className="rank-img-display" src={process.env.React_App_BaseURL + "Storage" + "/" + "Ranks" + "/" + "RankReset.png"}/>
                            :null}
                        </motion.div>
                        <motion.div className="d-flex flex-column"
                                key={leaderboardInfo.context + leaderboardInfo.category + "_score" + isInView}
                                initial={{opacity: 0, x: 60}}
                                animate={{opacity: isInView ? 1 : 0, x: isInView ? 0 : 60}}
                                transition={{duration: 0.6}}>
                            <span>Score</span>
                            <span className="fs-3 fw-bold">{leaderboardInfo.userRank == 0 ? "N/A" : `${leaderboardInfo.userScore}`}</span>
                        </motion.div>
                    </div>
                    <div className="leaderboard">
                    {
                        leaderboard.map((element, index) => (
                            <motion.div
                                key={leaderboardInfo.context + `${index}_rank` + leaderboardInfo.category + isInView}
                                initial={{opacity: 0, y: 30}}
                                animate={{opacity: isInView ? 1 : 0, y: isInView ? 0 : 30}}
                                transition={{duration: 0.6, delay: index * 0.2}}>
                                <div className="user-profile">
                                    <div className="d-flex flex-column">
                                        { index + 1 == 1 ?
                                            <Image className="rank-img" src={process.env.React_App_BaseURL + "Storage" + "/" + "Ranks" + "/" + "Rank1.png"}/>
                                        :null}
                                        
                                        { index + 1 == 2 ?
                                            <Image className="rank-img" src={process.env.React_App_BaseURL + "Storage" + "/" + "Ranks" + "/" + "Rank2.png"}/>
                                        :null}
                                        
                                        { index + 1 == 3 ?
                                            <Image className="rank-img" src={process.env.React_App_BaseURL + "Storage" + "/" + "Ranks" + "/" + "Rank3.png"}/>
                                        :null}
                                        
                                        { index + 1 >= 4?
                                            <Image className="rank-img" src={process.env.React_App_BaseURL + "Storage" + "/" + "Ranks" + "/" + "RankReset.png"}/>
                                        :null}
                                        <h3 className="fw-bold fs-4 user-rank text-center">
                                            #{index + 1}
                                        </h3>
                                    </div>
                                    
                                    <div className="user-info me-auto d-flex flex-column">
                                        <span className="fs-5 fw-bold">{element.user.fullName}</span>   
                                        <span>{element.user.email}</span>
                                    </div>
                                    <div className="user-score fs-5 fw-bold">
                                        {element.points}
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    }
                    </div>
                </div>
            :null}
        </div>
    );
};

export default Leaderboard;


                            

