import React,{useState,useEffect,useContext} from 'react';
import UserAPI from '../../api/UserAPI';
import { LoginContext } from "../../components/LoginContext";

// To do , we need to make the gui 

// then when need to make an api request to the server 

// set the schema for the user like the fav (saving the id of the suggestion)

const UserSuggestions = () => {
  
  const [list,setList]= useState([]);
  const { userData } = useContext(LoginContext);
    const getSuggestions = async () =>{
        const res = await UserAPI.getAllSuggestList(userData.email);
        if(res.success){
            setList(res.body.data);
        }
        else{
            console.log(res.message)
        }
    }
    useEffect(()=>{
        getSuggestions();
    },[])
    
    
        return(<div>
        <div className="banner banner_admin">
        <div className="wrapper">
          <div className="banner_content">
            <h1 className="">
              <strong>User Suggestions</strong>
            </h1>
          </div>
        </div>
      </div>
      
     <center><button className="su-button mb-2" onClick={()=>getSuggestions()}>
   My Suggestions
    </button></center>
    {
    (list.length == 0) 
    ? 
    <h1>you have no suggestion</h1> 
    :
        list.map((item,index)=>{
        return(
        <div>
        <center>
                {/*<h5>{item}</h5>*/}
                {console.log(item)}
                <h4>{index + 1} ) {item.conceptName['english']}</h4>
        </center>
        <hr></hr>
        </div>
        )
     })
    }
    

    </div>)
}
        
export default UserSuggestions;
