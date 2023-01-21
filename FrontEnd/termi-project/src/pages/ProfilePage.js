import React,{useState,useEffect,useContext} from "react";
import Image from "react-bootstrap/Image";
import { Modal, Button } from "react-bootstrap";
import AvatarGenerator from "./Logic/AvatarGenerator";
import { useNavigate} from 'react-router-dom';
import goldChevron from "../images/Games/Chevron/goldChevron.png";
import silverChevron from "../images/Games/Chevron/silverChevron.png";
import brownChevron from "../images/Games/Chevron/brownChevron.png";
import "./../styles/ProfilePage.css";
import profileAPI from "../api/ProfileAPI";
import {LoginContext} from "./../components/LoginContext";
// import {useSelector,useDispatch} from 'react-redux';
// import { updateUserProfile } from '../redux/actions/userDataActions';
// --> import Icons
import { IconContext } from "react-icons";
import { AiTwotoneStar } from "react-icons/ai";

const ProfilePage =  () => {
  const user = useContext(LoginContext);
console.log(user);
  //const userData = useSelector(state => state.data);
  
 // console.log(user.userData.searchCounter);
   //  const dispatch=useDispatch();
  // localStorage.setItem('currentPage', document.title)//test

  let avatarGenerator = new AvatarGenerator();
  let avatarImageUrl = avatarGenerator.generateRandomAvatar('random13213');
  const [showModal, setShowModal] = useState(false);
  const [showModalAvatar, setShowModalAvatar] = useState(false);
  const [showPasswordModal,setShowPasswordModal]=useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  // const [points,setPoints]=useState(0);
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
 
 function handleOpenPasswordModal()
 {
   setShowPasswordModal(true);
 }
 
// const fetchPoints=async()=>{
//   const response = await profileAPI.getGamePoints();
//   if (response.success){
//     setPoints(response.body.points);
//     console.log(response.body.points);
    
// }
// else {
//     console.log("Error getting points:", response.message);
//   }
// };

// useEffect(()=>{
//   fetchPoints();
// },[]);
 


// let x = JSON.parse(localStorage.getItem('profileBody'));
// const [formValues, setFormValues] = useState({
//   fullName: x.fullName,
//   email: x.email,
//   phone: x.phone,
//   field: x.field,
//   language: x.language
// });
  const [formValues, setFormValues] = useState({
    fullName: user.userData.fullName,
    email: user.userData.email,
    phone: user.userData.phone,
    field: user.userData.field,
    language: user.userData.language
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
  //get values from the form field
    // send request to update the profile information in the backend
    try {
       //this is the normal one we had
       //now with redux!
        const response = await profileAPI.updateProfile(formValues);
        if (response.success) {
          //   user.setUserData({
          //   ...LoginContext.userData,
          //   fullName: formValues['fullName'],
          //   email: formValues['email'],
          //   phone: formValues['phone'],
          //   field: formValues['field'],
          //   language: formValues['language']
          // });
          
          user.setUserData({...user.userData,
            fullName: formValues['fullName'],
            email: formValues['email'],
            phone: formValues['phone'],
            field: formValues['field'],
            language: formValues['language']});
            
          localStorage.setItem('profileBody', JSON.stringify(user.userData));
       
          // update the profile data in localStorage
          // localStorage.setItem('profileBody', JSON.stringify({
          //   fullName: formValues['fullName'],
          //   email: formValues['email'],
          //   phone: formValues['phone'],
          //   field: formValues['field'],
          //   language: formValues['language']
          //   // image:formValues['image']
          // }));
          // dispatch(updateUserProfile({
          //           fullName: formValues['fullName'],
          //           email: formValues['email'],
          //           phone: formValues['phone'],
          //           field: formValues['field'],
          //           language: formValues['language']
          //       }));
          // dispatch(updateUserProfile(response.body));
          // close the modal
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
  const currentProfile = JSON.parse(localStorage.getItem('profileBody'));
  if(currentProfile.password!==formValues.currentPassword){
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
          currentProfile.password = formValues.newPassword;
          localStorage.setItem('profileBody', JSON.stringify(currentProfile));
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



async function getSearchCount(e){
  e.preventDefault()
    const response = await profileAPI.getSearchCount();
  if (response.success){
      console.log(response.body);
    
}
 else {
    console.log("Error :", response.message);
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

 console.log("type");
 console.log(typeof(x));
  return (
    <>
      <div className="banner banner_profile">
        <div className="wrapper">
          <div className="banner_content">
            <h1>
              <strong>Profile </strong> Page
            </h1>
          </div>
        </div>
      </div>
      <div className="container emp-profile mt-2">
          <div className="row">
            <div className="col-md-4">
            
            
            <div className="d-flex justify-content-end position-absolute" >
                  <IconContext.Provider value={{ size: "4rem" ,
                                                 color: 'red',
                                                 strokeWidth: "5",
                                                 
                  }}>
                    <AiTwotoneStar/>
                  </IconContext.Provider>
            </div>
            
              <div className="profile-img d-flex justify-content-center">
                 <Image src={avatarImageUrl} style={{width: '30%', height: '30%'}} />
                   <div className="small-button">
                   
                    {/*<Button onClick={handleOpenModalAvatar}>Edit Avatar</Button>*/}
              </div>
            
              </div>
              <Modal show={showModalAvatar} onHide={handleCloseModalAvatar}>
                <Modal.Header closeButton>
                  <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form>
                    <div className="form-group">
                      <label>
                        Full Name
                      </label>
                      <input type="text" onChange={handleChange}   name="fullName" className="form-control" value=
                      {formValues.fullName}/>
                    </div>
                      
                    <div className="form-group">
                      <label>
                        Email
                      </label>
                      <input type="email" onChange={handleChange} name="email" className="form-control" value=
                      {formValues.email}/>
                    </div>
                    
                    <div className="form-group">
                      <label>
                        Phone Number
                      </label>
                      <input type="text" onChange={handleChange} name="phone" className="form-control" value=
                      {formValues.phone}/>
                    </div>
                    <div className="form-group">
                      <label>
                        Category
                      </label>
                      <input type="text" onChange={handleChange} name="field" className="form-control" value=
                      {formValues.field}/>
                    </div>
                    <div className="form-group">
                      <label>
                        Preferred Language
                      </label>
                      <input type="text" onChange={handleChange} name="language" className="form-control" value=
                      {formValues.language}/>
                    </div>
                  </form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseModalAvatar}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={handleSaveChanges}>
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>

           

            <div className="col-md-2 mt-3">
            
              <div className="small-button">
              <button className="btn btn-warning" onClick={() => {handleClick()}}>Favorites</button>
              <Button className=""  onClick={() => {handleOpenModal()}}>Edit Profile</Button>
              </div>
                

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <form>
          <div className="form-group">
            <label>
            Full Name
            </label>
            <input type="text" onChange={handleChange}   name="fullName" className="form-control" value=
            {formValues.fullName}/>
            </div>
            
            <div className="form-group">
            <label>
            Email
            </label>
            <input type="email" onChange={handleChange} name="email" className="form-control" value=
            {formValues.email}/>
            </div>
             <div className="form-group">
            <label>
            Phone Number
            </label>
            <input type="text" onChange={handleChange} name="phone" className="form-control" value=
            {formValues.phone}/>
            </div>
             <div className="form-group">
            <label>
            Category
            </label>
            <input type="text" onChange={handleChange} name="field" className="form-control" value=
            {formValues.field}/>
            </div>
             <div className="form-group">
            <label>
            Preferred Language
            </label>
            <input type="text" onChange={handleChange} name="language" className="form-control" value=
            {formValues.language}/>
            </div>
            
            </form>
            
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
            </div>
          </div>

          <div className="small-button">
           <Button onClick={handleOpenPasswordModal}>Change Password</Button>
           </div>
              <Modal show={showPasswordModal} onHide={handleClosePasswordModal}>
                <Modal.Header closeButton>
                  <Modal.Title>Change Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form>
                    {showPasswordError && (
                    <div className="error-message">Make sure you enter the same password</div>
                  )}
                    <div className="form-group">
                      <label>
                       Current Password
                      </label>
                      <input type="password" onChange={handleChange}   name="currentPassword" className="form-control" value=
                      {formValues.currentPassword} minLength="6"/>
                    </div>
                      
                    <div className="form-group">
                      <label>
                      New Password
                      </label>
                      <input type="password" onChange={handleChange} name="newPassword" className="form-control" value=
                      {formValues.newPassword} minLength="6"/>
                    </div>
                    
                    <div className="form-group">
                      <label>
                        New Password
                      </label>
                      <input type="password" onChange={handleChange} name="validatePassword" className="form-control" value=
                      {formValues.validatePassword} minLength="6"/>
                    </div>
                  
                  </form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClosePasswordModal}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={handleSavePasswordChanges}>
                    Change Password
                  </Button>
                </Modal.Footer>
              </Modal>
          <div className="row">
           
            <div className="col-md-7 pl-5 about-info">
              <div className="tab-content profile-tab" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab">
                    <div className="row">
                      <div className="col-md-6">
                        <label>FullName</label>
                      </div>
                      <div className="col-md-6">
                        <p className="font-for-profile">{user.userData.fullName}</p>
                      </div>
                  </div>
                    <div className="row">
                      <div className="col-md-6">
                        <label>Email</label>
                      </div>
                      <div className="col-md-6">
                        <p className="font-for-profile">{user.userData.email}</p>
                      </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Category</label>
                    </div>
                    <div className="col-md-6 ">
                      <p className="font-for-profile">{user.userData.field}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Phone Number</label>
                    </div>
                    <div className="col-md-6">
                      <p className="font-for-profile"> {user.userData.phone}</p>
                    </div>
                  </div>
                  
                  
                   <div className="row">
                      <div className="col-md-6">
                      <label>Preferred language</label>
                      </div>
                      <div className="col-md-6">
                        <p className="font-for-profile"> {user.userData.language}</p>
                      </div>
                    </div>
                    
                    <div className="row">
                      <div className="col-md-6">
                        <label>gender</label>
                      </div>
                      <div className="col-md-6">
                        <p className="font-for-profile">{user.userData.gender}</p>
                      </div>
                  </div>
                  
                    <div className="row">
                      <div className="col-md-6">
                        <label>Points</label>
                      </div>
                      <div className="col-md-6">
                        <p className="font-for-profile">{user.userData.points}</p>
                      </div>
                  </div>
                  
                    <div className="row">
                      <div className="col-md-6">
                        <label>Search Counter</label>
                      </div>
                      <div className="col-md-6">
                        <p className="font-for-profile">{user.userData.searchCounter}</p>
                      </div>
                  </div>
                  <button onClick={(e)=>getSearchCount}>Click to get number of search</button>
                    {/*<div className="col-md-6">
                      <a href="#" onClick={handleClick}>Favorites</a>
                    </div>*/}
                 
                </div>
              </div>
            </div>
          </div>
      
      </div>
    </>
    );
}

export default ProfilePage;