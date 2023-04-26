// --> React
import React,{useState, useEffect, useContext} from 'react';

// --> Styles And Css
import style from "./Leaderboard.css";

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
                console.log(response.body);
                setLeaderboardInfo(response.body);
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
            <div className="d-flex flex-wrap justify-content-center gap-3">
                <div>
                    <CategorySelector category={category} categoryChanged={(newCategory) => {changeCategory(newCategory)}}/>
                </div>
                { props.changeable ?
                    <>
                        { contexts ?
                        <div className="form-floating">
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
            { leaderboardInfo.leaderboard && leaderboardInfo.leaderboard.length > 0 ?
                <div className="leaderboard">
                    <div className="fs-3">Your Rank: {leaderboardInfo.userRank}</div>
                    {
                        leaderboardInfo.leaderboard.map((element, index) => {
                        return (
                            <div key={index} className="user-profile">
                                <h3 className="fw-bold fs-2 user-rank">
                                {index + 1}
                                </h3>
                                <div className="user-info me-auto">
                                    <h5 className="fw-bold">{element.user.fullName}</h5>   
                                    <span>{element.user.email}</span>
                                </div>
                                <div className="user-score fs-3">
                                    {element.points}
                                </div>
                            </div>
                        )})
                    }
                </div>
            :null}
        </div>
    );
};

export default Leaderboard;

