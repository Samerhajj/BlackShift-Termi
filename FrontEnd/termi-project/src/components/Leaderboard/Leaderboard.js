// --> React
import React,{useState, useEffect, useContext} from 'react';

// --> Styles And Css
import style from "./Leaderboard.css";
//import { useTrail, useTransition, animated } from 'react-spring';
import Image from "react-bootstrap/Image";


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
      
//   const leaderboardTransition = leaderboard && useTransition(
//     leaderboard,
//         (item,index) => index,
//         {
//             from: { opacity: 0, transform: "translateY(-20px)" },
//             enter: { opacity: 1, transform: "translateY(0px)" },
//             leave: { opacity: 0, transform: "translateY(-20px)" },
//             config: { mass: 1, tension: 500, friction: 35 },
//             trail: 50
//         }
//     );
    
    
    // const leaderboardTransition = useTrail(leaderboard ? leaderboard.length : 0, {
    //     from: { y: -20, opacity: 0 },
    //     to: { y: 0, opacity: 1},
    //     config:{ duration: 250, delay: 500 }
    // });

    
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
        <div className="backboard">
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
                            <label for="contextSelect">Leaderboard for</label>
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
                        <div className="d-flex flex-column">
                            <span>My Rank</span>
                            <span className="fs-3 fw-bold">{leaderboardInfo.userRank == 0 ? "N/A" : "#" + leaderboardInfo.userRank}</span>
                        </div>
                        
                        { leaderboardInfo.userRank == 1 ?
                            <div>
                                <Image className="rank-img-display" src={process.env.React_App_StorageURL + "Storage" + "/" + "Ranks" + "/" + "1st.png"}/>
                            </div>
                        :null}
                        
                        
                        { leaderboardInfo.userRank == 2 ?
                            <div>
                                <Image className="rank-img-display" src={process.env.React_App_StorageURL + "Storage" + "/" + "Ranks" + "/" + "2nd.png"}/>
                            </div>
                        :null}
                        
                        
                        { leaderboardInfo.userRank == 3 ?
                            <div>
                                <Image className="rank-img-display" src={process.env.React_App_StorageURL + "Storage" + "/" + "Ranks" + "/" + "3rd.png"}/>
                            </div>
                        :null}
                        
                        <div className="d-flex flex-column">
                            <span>Score</span>
                            <span className="fs-3 fw-bold">{leaderboardInfo.userRank == 0 ? "N/A" : `${leaderboardInfo.userScore}`}</span>
                        </div>
                    </div>
                    {/*<div className="fs-3">Your Rank: {leaderboardInfo.userRank == 0 ? "N/A" : "#" + leaderboardInfo.userRank}</div>*/}
                    <div className="leaderboard">
                    {
                        leaderboard.map((element, index) => (
                            <div key={index}>
                                <div className="user-profile">
                                    <div className="d-flex flex-column">
                                        { index + 1 == 1 ?
                                            <Image className="rank-img" src={process.env.React_App_StorageURL + "Storage" + "/" + "Ranks" + "/" + "1st.png"}/>
    
                                        :null}
                                        
                                        
                                        { index + 1 == 2 ?
                                            <Image className="rank-img" src={process.env.React_App_StorageURL + "Storage" + "/" + "Ranks" + "/" + "2nd.png"}/>
                                        :null}
                                        
                                        
                                        { index + 1 == 3 ?
                                            <Image className="rank-img" src={process.env.React_App_StorageURL + "Storage" + "/" + "Ranks" + "/" + "3rd.png"}/>
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
                            </div>
                        ))
                    }
                    </div>
                </div>
            :null}
        </div>
    );
};

export default Leaderboard;


                            

