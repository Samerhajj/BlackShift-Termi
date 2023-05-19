import React,{useState,useEffect,useContext} from 'react';
import UserAPI from '../../api/UserAPI';
import LanguageMap from '../../api/LanguageAPI';
import { LoginContext } from "../../components/LoginContext";
import Image from 'react-bootstrap/Image';
import loadingGif from './loadingGif.gif'
import { useTranslation } from 'react-i18next';


// To do , we need to make the gui 

// then when need to make an api request to the server 

// set the schema for the user like the fav (saving the id of the suggestion)

const UserSuggestions = () => {
  
  const [list,setList]= useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const {t} = useTranslation();

  const { userData } = useContext(LoginContext);
    const getSuggestions = async () =>{
        setIsLoading(true);
        const res = await UserAPI.getAllSuggestList(userData.email);
        setIsLoading(false);
        if(res.success){
            setList(res.body.data);
             console.log(res.body.data);
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
              <strong>{t('user_suggestions.User_Suggestions')} </strong>
            </h1>
          </div>
        </div>
      </div>
      
     <center><button className="su-button mb-2 style_for_button_in_viewSuggestions" onClick={()=>getSuggestions()}>
  {t('user_suggestions.Get_My_Suggestions')}
    </button></center>
            <hr></hr>

   {isLoading ? (
    <center><img src={loadingGif} alt="My GIF" /></center>
      ) : list.length === 0 ? (
        <h1 className="no-suggestions">{t('user_suggestions.You_have_no_suggestions')}.</h1>
      ) : (
   
        list.map((item,index)=>{
        return(
        <div>
        <center>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", paddingLeft: "30px", paddingRight: "30px" }}>
                <Image className="img-fluid mx-3" src={LanguageMap["en"].src} />
                <span>{item.conceptName["english"]}</span>
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", paddingLeft: "30px", paddingRight: "30px" }}>
                <Image className="img-fluid mx-3" src={LanguageMap["ar"].src} />
                <span>{item.conceptName["arabic"]}</span>
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start", paddingLeft: "30px", paddingRight: "30px" }}>
                <Image className="img-fluid mx-3" src={LanguageMap["he"].src} />
                <span>{item.conceptName["hebrew"]}</span>
              </div>
        </center>
        <hr></hr>
        </div>
        )
     })
     )
    }
    

    </div>)
}
        
export default UserSuggestions;
// {item.conceptName['arabic']} {item.conceptName['hebrew']}