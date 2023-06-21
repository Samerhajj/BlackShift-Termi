// --> React
import React,{useState, useContext} from "react";
import { useNavigate} from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// --> Components
import {LoginContext} from "../../components/LoginContext";
import { CategoriesContext } from "../../components/CategoryContext";
import Leaderboard from "../../components/Leaderboard/Leaderboard";
import GameHistoryGraph from "../../components/graph/GameHistoryGraph";
import AchievementBoard from "../../components/AchievementBoard/AchievementBoard";
import ImageUpload from "../../components/Profile/ImageUploader";

// --> Style & Media
import "./ProfilePage.css";
import Image from "react-bootstrap/Image";
import { Col, Row, Nav, Tab} from "react-bootstrap";
import AvatarGenerator from "../Logic/AvatarGenerator";
import { IconContext } from "react-icons";
import { IoPersonCircle } from 'react-icons/io5';
import { BsGenderAmbiguous,BsCardList } from 'react-icons/bs';
import { MdEmail, MdCategory, MdBorderColor ,MdAssistantPhoto} from 'react-icons/md';
import { AiFillMobile, AiFillStar } from "react-icons/ai";
import { VscActivateBreakpoints } from "react-icons/vsc";
import { BiSearchAlt, BiConversation } from "react-icons/bi";
import { CgPassword } from "react-icons/cg";

// --> API
import profileAPI from "../../api/ProfileAPI";
import UserAPI from "../../api/UserAPI";
import LanguageMap from "../../api/LanguageAPI";
import NotificationsAPI from "../../api/NotificationsAPI";

// --> Modals
import ChangePassModal from './ProfileEdit/ChangePassModal';
import EditProfileModal from './ProfileEdit/EditProfileModal';


const ProfilePage =  () => {
  const { categories } = useContext(CategoriesContext);
  const user = useContext(LoginContext);
  const { t, i18n } = useTranslation();
  let avatarGenerator = new AvatarGenerator();
  let avatarImageUrl = avatarGenerator.generateRandomAvatar("random123");
  const [showModal, setShowModal] = useState(false);
  const [showModalAvatar, setShowModalAvatar] = useState(false);
  const [showPasswordModal,setShowPasswordModal]=useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  
  const navigate = useNavigate();

 
  function handleOpenPasswordModal() {
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
  
  function handleOpenModal() {
      setShowModal(true);
    }
  
  function handleCloseModal() {
    setShowModal(false);
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
            language: formValues['language'],
            status:formValues['status'],
          });
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
            {/*<h1>
              <strong>{t('profile.title-first')}</strong> {t('profile.title-last')}
            </h1>*/}
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
      
    <div className="wrapper baseline">
      <Tab.Container defaultActiveKey="first">
        <Row className="gap-4">
          <Col sm={3}>
            <div className="d-flex justify-content-center align-items-center flex-column mb-3">
              {/*<Image className="mx-4 mb-3" src="https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"/>*/}
              <ImageUpload/>
              <h3 className="text-center text-capitalize fw-bold">{user.userData.fullName}</h3>
              <div className="d-flex flex-wrap justify-content-center gap-2">
                <a className="favorites-button text-center" role="button" onClick={() => {navigate('/favorite')}}>
                  <IconContext.Provider value={{ size: "2rem" }}>
                    <AiFillStar/>
                  </IconContext.Provider> 
                </a>
                <a className="favorites-button text-center" role="button" onClick={() => {navigate('/UserSuggestions')}}>
                  <IconContext.Provider value={{ size: "2rem" }}>
                    <MdAssistantPhoto/>
                  </IconContext.Provider> 
                </a>
              </div>
            </div>
          </Col>
          
          <Col sm={8}>
            <Nav variant="pills" className="d-flex justify-content-evenly profile-menu">
              <Nav.Item>
                <Nav.Link eventKey="first">{t('profile.navbar.general')}</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="second">{t('profile.navbar.personal')}</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="third">{t('profile.navbar.progress')}</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="fourth">{t('profile.navbar.achievements')}</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="fifth">{t('profile.navbar.leaderboards')}</Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content>
            {/*General Section*/}
              <Tab.Pane eventKey="first">
                  <Row className="gap-3 justify-content-center">
                      <Col sm={12} md={5} lg={4} className="general-item-box">
                          <IconContext.Provider value={{ size: "2.5rem" }}>
                            <VscActivateBreakpoints/>
                          </IconContext.Provider>
                          <h3 className="general-item-title">{t('profile.points')}:</h3>
                          <div className="general-item-value">{user.userData.points}</div>
                      </Col>
                      <Col sm={12} md={5} lg={4} className="general-item-box">
                          <IconContext.Provider value={{ size: "2.5rem" }}>
                            <BiSearchAlt/>
                          </IconContext.Provider>
                          <h3 className="general-item-title">{t('profile.searches')}:</h3>
                          <div className="general-item-value">{user.userData.searchCounter}</div>
                      </Col>
                      <Col sm={12} md={5} lg={4} className="general-item-box">
                          <IconContext.Provider value={{ size: "2.5rem" }}>
                            <BiConversation/>
                          </IconContext.Provider>
                          <h3 className="general-item-title">{t('profile.suggestions')}:</h3>
                          <div className="general-item-value">{user.userData.suggestConceptCounter}</div>
                      </Col>
                  </Row>
              </Tab.Pane>
              
              {/*Details Section*/}
              <Tab.Pane eventKey="second">
                <div className="d-flex justify-content-end gap-3">
                  <a className="edit-button" role="button" onClick={() => {handleOpenPasswordModal()}}>
                    <IconContext.Provider value={{ size: "2rem" }}>
                      <CgPassword/>
                    </IconContext.Provider> 
                  </a>
                  <a className="edit-button" role="button" onClick={() => {handleOpenModal()}}>
                    <IconContext.Provider value={{ size: "2rem" }}>
                      <MdBorderColor/>
                    </IconContext.Provider>
                  </a>
                </div>
                <div className="d-flex flex-column gap-4">
                  {/*Name */}
                  <div className="d-flex justify-content-between align-items-end gap-3">
                    <div className="d-flex flex-column">
                      <IconContext.Provider value={{ size: "2rem" }}>
                        <IoPersonCircle/>
                    </IconContext.Provider>  
                    <h3 className="m-0"> {t('profile.name')}:</h3> 
                    </div>
                    <div className="fs-5 text-success">{user.userData.fullName}</div>
                  </div>
                  {/*Gender*/}
                  <div className="d-flex justify-content-between align-items-center gap-3">
                    <div className="d-flex flex-column">
                      <IconContext.Provider value={{ size: "2rem" }}>
                        <BsGenderAmbiguous/>
                      </IconContext.Provider>  
                    <h3 className="m-0"> {t('profile.gender')}:</h3>
                    </div>
                    <div className="fs-5 text-success">{user.userData.gender}</div>
                  </div>
                  {/*Category*/}
                  <div className="d-flex justify-content-between align-items-center gap-3">
                    <div className="d-flex flex-column">
                      <IconContext.Provider value={{ size: "2rem" }}>
                        <MdCategory/>
                      </IconContext.Provider>
                      <h3 className="m-0">{t('profile.categories')}: </h3>
                    </div>
                    <div className="fs-5 text-success">{categories.find(category => category.categoryId == user.userData.field) && (categories.find(category => category.categoryId == user.userData.field).categoryName[LanguageMap[i18n.language].name])}</div>
                  </div>
                  {/*Phone*/}
                  <div className="d-flex justify-content-between align-items-center gap-3">
                    <div className="d-flex flex-column">
                      <IconContext.Provider value={{ size: "2rem" }}>
                        <AiFillMobile/>
                      </IconContext.Provider>
                      <h3 className="m-0"> {t('profile.phone')}:</h3>
                    </div>
                    <div className="fs-5 text-success">{user.userData.phone}</div>
                  </div>
                  {/*Email*/}
                  <div className="d-flex justify-content-between align-items-center gap-3">
                    <div className="d-flex flex-column">
                      <IconContext.Provider value={{ size: "2rem" }}>
                        <MdEmail/>
                      </IconContext.Provider>
                      <h3 className="m-0"> {t('profile.email')}</h3>
                    </div>
                    <div className="fs-5 text-success">{user.userData.email}</div>
                  </div>
                {/* Status */}
                  <div className="d-flex justify-content-between align-items-center gap-3">
                    <div className="d-flex flex-column">
                      <IconContext.Provider value={{ size: "2rem" }}>
                        <BsCardList/>
                      </IconContext.Provider>
                      <h3 className="m-0"> {t('profile.status')}</h3>
                    </div>
                    <div>
                      {user.userData.status && user.userData.status.map((status, index) => (
                        <div key={index} className="fs-5 text-success">{t(`profile.statusOptions.${status}`)}</div>
                      ))}
                    </div>
                  </div>

                </div>
              </Tab.Pane>
              
              {/*Progress Section*/}
              <Tab.Pane eventKey="third">
                <GameHistoryGraph/>
              </Tab.Pane>
              
              {/*Achievemnts Section*/}
              <Tab.Pane eventKey="fourth">
                  <AchievementBoard achievements={user.userData.achievements}/>
              </Tab.Pane>
             
              {/*Leaderboard Section*/}
              <Tab.Pane eventKey="fifth">
                <Leaderboard changeable={true}/>
              </Tab.Pane>
              
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </div>
  </>
);
};
export default ProfilePage;

  