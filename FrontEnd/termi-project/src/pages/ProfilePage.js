import React,{useState,useEffect,useContext} from "react";
import Image from "react-bootstrap/Image";
import { Modal, Button ,Col,Row} from "react-bootstrap";
import AvatarGenerator from "./Logic/AvatarGenerator";
import { useNavigate} from 'react-router-dom';
import "./../styles/ProfilePage.css";
import profileAPI from "../api/ProfileAPI";
import UserAPI from "../api/UserAPI";

import {LoginContext} from "./../components/LoginContext";
import MyTable from "./MyTable";
import { VictoryScatter,VictoryLegend, VictoryChart, VictoryAxis ,VictoryTooltip,VictoryLabel,VictoryLine} from 'victory';

// import Chart from 'chart.js';

// import {useSelector,useDispatch} from 'react-redux';
// import { updateUserProfile } from '../redux/actions/userDataActions';
// --> import Icons
import { IconContext } from "react-icons";
import { AiTwotoneStar,AiFillStar } from "react-icons/ai";
import {IoPersonCircle} from 'react-icons/io5';
import { BsGenderAmbiguous } from 'react-icons/bs';
import{MdEmail,MdCategory,MdPassword,MdBorderColor} from 'react-icons/md';
import {AiFillMobile} from "react-icons/ai";
import { VscActivateBreakpoints } from "react-icons/vsc";
import { BiSearchAlt,BiConversation } from "react-icons/bi";

import ChangePassModal from './Profile/ChangePassModal';//new
import EditProfileModal from './Profile/EditProfileModal';//new

import { CategoriesContext } from "../components/CategoryContext";
import { useTranslation } from 'react-i18next';
import LanguageMap from "../api/LanguageAPI";
import GameHistoryAPI from "../api/GameHistoryAPI";

const ProfilePage =  () => {
  const { categories } = useContext(CategoriesContext);
  const user = useContext(LoginContext);
  //const userData = useSelector(state => state.data);
  console.log(user)
 // console.log(user.userData.searchCounter);
   //  const dispatch=useDispatch();
  // localStorage.setItem('currentPage', document.title)//test
  const { t, i18n } = useTranslation();
  let avatarGenerator = new AvatarGenerator();
  let avatarImageUrl = avatarGenerator.generateRandomAvatar("random123");
  const [showModal, setShowModal] = useState(false);
  const [showModalAvatar, setShowModalAvatar] = useState(false);
  const [showPasswordModal,setShowPasswordModal]=useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
  const [points,setPoints]=useState(0);
  const [searchCounter,setSearchCounter]=useState(0);
  const [suggestCounter,setSuggestCounter]=useState(0);
  
  const navigate = useNavigate();
  function handleOpenModal() {
    setShowModal(true);
  }
  function handleOpenModalAvatar() {
    setShowModalAvatar(true);
  }
  const handleClick = () => {
    navigate('/favorite');
  };
 
 const [gamesData, setGamesData] = useState([]);

const gameColors = {
  'Memory Game': 'blue',
  'Backward': 'red',
  'Other Game': 'green'
}

async function fetchData() {
  setIsLoading(true);
  const res = await GameHistoryAPI.getGameHistory();
  const gamesData = res.body.games;

  // Create an object to store gameName and their corresponding scores
  const gamesScores = {};
  gamesData.forEach((game) => {
    if (gamesScores[game.gameName]) {
      gamesScores[game.gameName].push(game.score);
    } else {
      gamesScores[game.gameName] = [game.score];
    }
  });

  // Format the data for Victory
  const chartData = Object.entries(gamesScores).map(([gameName, scores], index) => ({
    x: index + 1,
    y: scores,
    label: gameName,
  }));

  setGamesData(chartData);
  setIsLoading(false);
}


  
 console.log(gamesData);

// const chartOptions = {
//     scales: {
//         y: {
//             beginAtZero: true
//         }
//     }
// };

 
 function handleOpenPasswordModal()
 {
   setShowPasswordModal(true);
 }
  const [formValues, setFormValues] = useState({
    fullName: user.userData.fullName,
    email: user.userData.email,
    phone: user.userData.phone,
    field: user.userData.field,
    language: user.userData.language,
    gender:user.userData.gender
  });
  
//--> function to close the modal
function handleCloseModal() {
    setShowModal(false);
  }
  
function handleCloseModalAvatar() {
    setShowModalAvatar(false);
  }
  
function handleClosePasswordModal(){
    setShowPasswordModal(false);
  }
  
async function handleSaveChanges(event) {
    event.preventDefault();
    try {
      console.log(formValues);
        const response = await profileAPI.updateProfile(formValues);
        if (response.success) {
          user.setUserData({...user.userData,
            fullName: formValues['fullName'],
            phone: formValues['phone'],
            field: formValues['field'],
            gender: formValues['gender'],
            language: formValues['language']});
        setShowModal(false);
      } else {
        console.log('Error updating profile: ' + response.message);
      }
    } catch (error) {
      console.log('Error updating profile: ' + error.message);
    }
  }
  
async function handleSavePasswordChanges(event) {
  event.preventDefault();
  if(user.userData.password!==formValues.currentPassword){
    alert("Make sure you have the current password right");
  }else{
    // Compare newPassword and validatePassword
    if (formValues.newPassword !== formValues.validatePassword) {
      // Set showPasswordError to true
      setShowPasswordError(true);
    } else {
      if(formValues.newPassword.length>=6 && formValues.validatePassword.length>=6){
        // Update password in the backend and local storage
        const response = await profileAPI.changePassword(formValues);
        if (response.success) {
          // Update password in local storage
          user.userData.password = formValues.newPassword;
          setShowPasswordModal(false);
          // Show pop-up message
          alert('Successfully changed your password');
        }
      }else if(formValues.newPassword.length<6 && formValues.validatePassword.length<6){
        alert('Please Enter More Than 6 Letters');
      } else {
        alert("ERROR SAVING PASSWORD CHANGES");
      }
    }
  }
}

function handleChange(event) {
  // get the field name and value from the event target
  const fieldName = event.target.name;
  const fieldValue = event.target.value;

  // update the formValues state with the new field value
  setFormValues({
    ...formValues,
    [fieldName]: fieldValue
  });
}

const handleSuggest = async () =>{
  const response = await UserAPI.getAllSuggestList(user.userData.email);
  if (response.success) {
            console.log("OUT:::");
            console.log(response.body);
        } else {
          alert(response.message);
        }
}
  return (
    <>
      <div className="banner banner_profile">
        <div className="wrapper h-3">
          <div className="banner_content">
            <h1>
              <strong>{t('profile.title-first')}</strong> {t('profile.title-last')}
                       <div className="d-flex justify-content-center "><Image src={avatarImageUrl} /></div>
            </h1>
          </div>
        </div>
      </div>
      
      <div className="wrapper">
       <div className="box_process cf" dir="ltr">  
             <div onClick={(e)=>{handleClick(e)}}  className="star-profile-fav">
     
          <IconContext.Provider value={{ size: "2.2rem" }}>
          <Button id="change-left-m-button-profile-1" className="p-0 send-to-front "  onClick={(e)=>{handleClick(e)}} >
          <AiFillStar className=""/>
            </Button>
          </IconContext.Provider> 
          
      </div>
     
      <div onClick={() => {handleOpenModal()}} className="star-profile-fav">
          <Button id="change-left-m-button-profile-2" className="p-0 send-to-front">
          <IconContext.Provider value={{ size: "2.2rem" }}>
          <MdBorderColor className=""/>
          </IconContext.Provider> 
          </Button>
      </div>
              <div onClick={() => {handleOpenPasswordModal()}} className="star-profile-fav">
         <Button id="change-left-m-button-profile-3" className="p-0 send-to-front">
          <IconContext.Provider value={{ size: "2.2rem" }}>
          <MdPassword className=""/>
          </IconContext.Provider> 
          </Button>
      </div>
             </div>
      <div className="box-process cf">
        <div className="icon-text-container">
      <IconContext.Provider value={{ size: "2.5rem" }}>
              <IoPersonCircle className="margin-for-profile"/>
             <h3 className="text-margin"> {t('profile.name')}:</h3> <div className="text_data">{user.userData.fullName}</div>
              {/*<span className="span-in-profile">Name : <span className="inner-span">{user.userData.fullName}</span></span>*/}
      </IconContext.Provider>  
      </div>
  {/*</div>
      
  <div>*/}
 <div className="box-process cf">
      <div className="icon-text-container">
      <IconContext.Provider value={{ size: "2.5rem" }}>
            <BsGenderAmbiguous className="bigger-icon margin-for-profile"/>
          <h3 className="text-margin"> {t('profile.gender')}:</h3> <div className="text_data">{user.userData.gender}</div>
      </IconContext.Provider>  
      </div>
     </div>
 {/* </div>

  <div>*/}
    <div className="icon-text-container">
      <IconContext.Provider value={{ size: "2.5rem" }}>
            <MdCategory className="bigger-icon margin-for-profile"/>
           
              <h3 className="text-margin">{t('profile.categories')}: </h3> <div className="text_data">{categories.find(category => category.categoryId == user.userData.field) && (categories.find(category => category.categoryId == user.userData.field).categoryName[LanguageMap[i18n.language].name])}
          </div>
      </IconContext.Provider>
      </div>
          <div className="icon-text-container">
       <IconContext.Provider value={{ size: "2.5rem" }}>
          <AiFillMobile className="bigger-icon margin-for-profile"/>
         <h3 className="text-margin"> {t('profile.phone')}:</h3> <div className="text_data">{user.userData.phone}</div>
      </IconContext.Provider>
</div>
    <div className="icon-text-container">
        <IconContext.Provider value={{ size: "2.5rem" }}>
          <MdEmail className="bigger-icon margin-for-profile"/>
         <h3 className="text-margin"> {t('profile.email')}:</h3> <div className="text_data">{user.userData.email}</div>
        </IconContext.Provider>
        </div>

    <div className="icon-text-container">
        <IconContext.Provider value={{ size: "2.5rem" }}>
          <VscActivateBreakpoints className="bigger-icon margin-for-profile"/>
         <h3 className="text-margin"> {t('profile.points')}: </h3> <div className="text_data">{user.userData.points}</div>
        </IconContext.Provider>
</div>
    <div className="icon-text-container">
        <IconContext.Provider value={{ size: "2.5rem" }}>
          <BiSearchAlt className="bigger-icon margin-for-profile"/>
         <h3 className="text-margin"> {t('profile.search-counter')}:</h3> <div className="text_data">{user.userData.searchCounter}</div>
        </IconContext.Provider>
</div>
    <div className="icon-text-container">
        <IconContext.Provider value={{ size: "2.5rem" }}>
          <BiConversation className="bigger-icon margin-for-profile"/>
       <h3 className="text-margin"> {t('profile.sugges-counter')}:</h3> <div className="text_data">{user.userData.suggestConceptCounter}</div>
        </IconContext.Provider>
 
      </div>
    
      </div>
      </div>



      

    
      
          <EditProfileModal 
                        showModal={showModal}
                        handleCloseModal={handleCloseModal}
                        handleChange={handleChange}
                        formValues={formValues}
                        handleSaveChanges={handleSaveChanges}
                        />
         <ChangePassModal 
                          showPasswordModal={showPasswordModal}
                          handleClosePasswordModal={handleClosePasswordModal}
                          showPasswordError={showPasswordError}
                          handleChange={handleChange}
                          formValues={formValues}
                          handleSavePasswordChanges={handleSavePasswordChanges}
                        />

         
           
  <button onClick={fetchData}>GET DATA</button>
  
   <div className="wrapper">
  {isLoading ? (
    <p>Loading...</p>
  ) : (
<VictoryChart margin={{ top: 30, bottom: 30, left: 30, right: 30 }}>
  <VictoryAxis label="Game Number" />
  <VictoryAxis dependentAxis label="Score" />
  {gamesData.map(game => (
    <VictoryLine
      key={game.label}
      data={game.y.map((score, i) => ({
        x: i + 1,
        y: score,
        label: game.label
      }))}
      style={{ data: { stroke: gameColors[game.label] } }}
    />
  ))}
  <VictoryLegend
    x={0}
    y={0}
    title="Games"
    centerTitle
    orientation="horizontal"
    data={gamesData.map(game => ({ name: game.label, symbol: { fill: gameColors[game.label] } }))}
  />
</VictoryChart>


     
  )}

{console.log(gamesData)}
                
             </div>
 <button onClick={handleSuggest}>Don't Click</button>
            
    </>
    );
}

// <VictoryScatter
//   data={data}
//   labelComponent={<VictoryLabel renderInPortal={false} />}
//   labels={({ datum }) => `x: ${datum.x}, y: ${datum.y}`}
export default ProfilePage;

  