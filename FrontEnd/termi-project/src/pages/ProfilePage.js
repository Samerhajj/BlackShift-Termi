import React,{useState,useEffect,useContext} from "react";
import Image from "react-bootstrap/Image";
import { Col, Row, Nav, Tab} from "react-bootstrap";
import AvatarGenerator from "./Logic/AvatarGenerator";
import { useNavigate} from 'react-router-dom';
import "./../styles/ProfilePage.css";
import profileAPI from "../api/ProfileAPI";
import UserAPI from "../api/UserAPI";

import {LoginContext} from "./../components/LoginContext";
import { LineChart, Line, XAxis, YAxis, Legend, ResponsiveContainer } from 'recharts';

// --> import Icons
import { IconContext } from "react-icons";
import { IoPersonCircle } from 'react-icons/io5';
import { BsGenderAmbiguous } from 'react-icons/bs';
import{ MdEmail, MdCategory } from 'react-icons/md';
import { AiFillMobile } from "react-icons/ai";
import { VscActivateBreakpoints } from "react-icons/vsc";
import { BiSearchAlt, BiConversation } from "react-icons/bi";

import ChangePassModal from './ProfileEdit/ChangePassModal';//new
import EditProfileModal from './ProfileEdit/EditProfileModal';//new

import { CategoriesContext } from "../components/CategoryContext";
import Leaderboard from "../components/Leaderboard/Leaderboard";
import { useTranslation } from 'react-i18next';
import LanguageMap from "../api/LanguageAPI";
import GameHistoryAPI from "../api/GameHistoryAPI";
import NotificationsAPI from "../api/NotificationsAPI";


const ProfilePage =  () => {
  const { categories } = useContext(CategoriesContext);
  const user = useContext(LoginContext);
  console.log(user)
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
  const handleFavoriteClick = () => {
    navigate('/favorite');
  };
 
  const [gamesData, setGamesData] = useState([]);

  const gameColors = {
  'Memory Game': 'blue',
  'Backward': 'red',
  'Other Game': 'green'
};

  useEffect(() => {
    fetchData();
  }, []);

async function fetchData() {
  setIsLoading(true);
  const res = await GameHistoryAPI.getGameHistory();

  if (!res.body || !res.body.games || res.body.games.length === 0) {
    // handle the case where there are no game data
    setGamesData([]);
    setIsLoading(false);
    return;
  }

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
    NotificationsAPI.errorNotification("Make sure you have the current password right");
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
          NotificationsAPI.successNotification('Successfully changed your password');
        }
      }else if(formValues.newPassword.length<6 && formValues.validatePassword.length<6){
        NotificationsAPI.errorNotification('Please Enter More Than 6 Letters');
      } else {
        NotificationsAPI.errorNotification("ERROR SAVING PASSWORD CHANGES");
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
          NotificationsAPI.errorNotification(response.message);
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
      
      
    <div className="wrapper">{/*Start of div Wrapper*/}    
      
      {/*Start div of buttons editPassword/favorite/editDetails*/}
      {/*<div className="d-flex m-3" dir="ltr">
      
        <div className="star-profile-fav">
          <IconContext.Provider value={{ size: "2.2rem" }}>
            <Button id="change-left-m-button-profile-1" className="p-0 send-to-front "  onClick={(e)=>{handleFavoriteClick(e)}} >
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
        
      </div>*/}{/*end div of buttons editPassword/favorite/editDetails*/}
             
      
    {/*End of div Wrapper*/}      
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
  
  
  <div className="wrapper">
    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
      <Row>
      
        <Col sm={3}>
          <Nav variant="pills" className="flex-column">
            <Nav.Item className="ItemNavFirst" >
              <Nav.Link eventKey="first">Details</Nav.Link>
            </Nav.Item>
            <Nav.Item className="ItemNavSecond">
              <Nav.Link eventKey="second">Progress</Nav.Link>
            </Nav.Item>
            <Nav.Item className="ItemNavThired">
              <Nav.Link eventKey="Thired">Leader board</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        
        <Col sm={9}>
          <Tab.Content>
          
            <Tab.Pane eventKey="first">
              {/*Start of div details*/}
              <div className="box-process cf">
              
              
              
                {/*Name */}
                <div className="icon-text-container">
                  <IconContext.Provider value={{ size: "2.5rem" }}>
                      <IoPersonCircle className="margin-for-profile"/>
                      <h3 className="text-margin"> {t('profile.name')}:</h3> <div className="text_data">{user.userData.fullName}</div>
                      {/*<span className="span-in-profile">Name : <span className="inner-span">{user.userData.fullName}</span></span>*/}
                  </IconContext.Provider>  
                </div>
        
              
                {/*Gender*/}
                <div className="icon-text-container">
                  <IconContext.Provider value={{ size: "2.5rem" }}>
                    <BsGenderAmbiguous className="bigger-icon margin-for-profile"/>
                    <h3 className="text-margin"> {t('profile.gender')}:</h3> <div className="text_data">{user.userData.gender}</div>
                  </IconContext.Provider>  
                </div>
        
          
                {/*Category*/}
                <div className="icon-text-container">
                  <IconContext.Provider value={{ size: "2.5rem" }}>
                    <MdCategory className="bigger-icon margin-for-profile"/>
                      <h3 className="text-margin">{t('profile.categories')}: </h3> <div className="text_data">{categories.find(category => category.categoryId == user.userData.field) && (categories.find(category => category.categoryId == user.userData.field).categoryName[LanguageMap[i18n.language].name])}</div>
                  </IconContext.Provider>
                </div>
            
            
                {/*Phone*/}
                <div className="icon-text-container">
                  <IconContext.Provider value={{ size: "2.5rem" }}>
                    <AiFillMobile className="bigger-icon margin-for-profile"/>
                    <h3 className="text-margin"> {t('profile.phone')}:</h3> <div className="text_data">{user.userData.phone}</div>
                  </IconContext.Provider>
                </div>
            
            
                {/*Email*/}
                <div className="icon-text-container">
                  <IconContext.Provider value={{ size: "2.5rem" }}>
                    <MdEmail className="bigger-icon margin-for-profile"/>
                    <h3 className="text-margin"> {t('profile.email')}:</h3> <div className="text_data">{user.userData.email}</div>
                  </IconContext.Provider>
                </div>
        
        
                {/*Points*/}
                <div className="icon-text-container">
                  <IconContext.Provider value={{ size: "2.5rem" }}>
                    <VscActivateBreakpoints className="bigger-icon margin-for-profile"/>
                    <h3 className="text-margin"> {t('profile.points')}: </h3> <div className="text_data">{user.userData.points}</div>
                  </IconContext.Provider>
                </div>
              
              
                {/*Search Counter*/}
                <div className="icon-text-container">
                  <IconContext.Provider value={{ size: "2.5rem" }}>
                    <BiSearchAlt className="bigger-icon margin-for-profile"/>
                    <h3 className="text-margin"> {t('profile.search-counter')}:</h3> <div className="text_data">{user.userData.searchCounter}</div>
                  </IconContext.Provider>
                </div>
              
              
                {/*Suggest Counter*/}
                <div className="icon-text-container">
                  <IconContext.Provider value={{ size: "2.5rem" }}>
                    <BiConversation className="bigger-icon margin-for-profile"/>
                    <h3 className="text-margin"> {t('profile.sugges-counter')}:</h3> <div className="text_data">{user.userData.suggestConceptCounter}</div>
                  </IconContext.Provider>
                </div>
            
              {/*End of div details*/}    
              </div>
            </Tab.Pane>
            
            <Tab.Pane eventKey="second">
              {isLoading ? (<p>Loading...</p>) : (
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart margin={{ top: 30, bottom: 30, left: 30, right: 30 }} data={gamesData.reduce((acc, { label, y }) => y.map((value, i) => ({ x: i + 1, [label]: value, ...acc[i] || {} })), [])}>
                    <XAxis dataKey="x" label={{ value: "Game Number", position: "insideBottom", dy: 10 }} />
                    <YAxis label={{ value: "Score", angle: -90, position: "insideLeft" }} scale="pow" exponent={0} domain={[0, 10]} />
                    <Legend />
          
                    {gamesData.map(game => (
                    <Line
                      key={game.label}
                      dataKey={game.label}
                      stroke={gameColors[game.label]}
                      strokeWidth={2}
                      dot={{ stroke: gameColors[game.label], strokeWidth: 2 }}
                    />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              )}
              {console.log(gamesData)}
              
            </Tab.Pane>
          
            
            <Tab.Pane eventKey="Thired">
              <Leaderboard/>
            </Tab.Pane>
            
          </Tab.Content>
        </Col>
      </Row>
      </Tab.Container>
    </div>
  
  {/*<button onClick={handleSuggest}>Don't Click</button>*/}
            
  </>
);}

// <VictoryScatter
//   data={data}
//   labelComponent={<VictoryLabel renderInPortal={false} />}
//   labels={({ datum }) => `x: ${datum.x}, y: ${datum.y}`}
export default ProfilePage;

  