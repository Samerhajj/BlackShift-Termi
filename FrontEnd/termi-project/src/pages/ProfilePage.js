import React,{useState,useEffect} from "react";
import Image from "react-bootstrap/Image";
import { Modal, Button } from "react-bootstrap";
import AvatarGenerator from "./Logic/AvatarGenerator";
import { useNavigate} from 'react-router-dom';
import goldChevron from "../images/Games/Chevron/goldChevron.png";
import silverChevron from "../images/Games/Chevron/silverChevron.png";
import brownChevron from "../images/Games/Chevron/brownChevron.png";
import "./../styles/ProfilePage.css";
import profileAPI from "../api/ProfileAPI";

const ProfilePage =  () => {
  
  let avatarGenerator = new AvatarGenerator();
  let avatarImageUrl = avatarGenerator.generateRandomAvatar('random13213');
  console.log(avatarImageUrl);
  const [showModal, setShowModal] = useState(false);
   const [showModalAvatar, setShowModalAvatar] = useState(false);
   const [showPasswordModal,setShowPasswordModal]=useState(false);
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

 let x = JSON.parse(localStorage.getItem('profileBody'));
const [formValues, setFormValues] = useState({
  fullName: x.fullName,
  email: x.email,
  phone: x.phone,
  field: x.field,
  language: x.language
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
    const response = await profileAPI.updateProfile(formValues);
    if (response.success) {
      // update the profile data in localStorage
      localStorage.setItem('profileBody', JSON.stringify({
        fullName: formValues['fullName'],
        email: formValues['email'],
        phone: formValues['phone'],
        field: formValues['field'],
        language: formValues['language']
        // image:formValues['image']
      }));
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
  const response = await profileAPI.changePassword(formValues);
  if (response.success) {
    // update the password in local storage
  //   localStorage.setItem('profileBody', JSON.stringify({
  //     password: formValues.newPassword,
   
  // }));
  const currentProfile = JSON.parse(localStorage.getItem('profileBody'));

// Update the password field
currentProfile.password = formValues.newPassword;

// Set the updated value back to localStorage
localStorage.setItem('profileBody', JSON.stringify(currentProfile));
   setShowPasswordModal(false);
  }else {
    console.log("ERROR SAVING PASSWORD CHANGES");
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
        <form method="">
          <div className="row">
            <div className="col-md-4">
              <div className="profile-img">
                <Image src={avatarImageUrl}/>
              </div>
              <Button onClick={handleOpenModalAvatar}>Edit Avatar</Button>
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

            <div className="col-md-6">
              <div className="profile-head">
                <h5>{x.fullName}</h5>
                <h6>{x.field}</h6>
                <p className="profile-rating mt-3 mb-5">
                  Rankings: <span>10/10</span>
                </p>
                <div>
                    <img className="chevron" alt="gold chevron" src={goldChevron}/>
                    <img className="chevron" alt="gold chevron" src={goldChevron}/>
                    <img className="chevron" alt="gold chevron"src={goldChevron}/>
                    <img className="chevron" alt="gold chevron"src={goldChevron}/>
                    <img className="chevron" alt="gold chevron"src={goldChevron}/>
                    <img className="chevron" alt="gold chevron"src={goldChevron}/>
                    <img className="chevron" alt="gold chevron"src={goldChevron}/>
                    <img className="chevron" alt="gold chevron"src={goldChevron}/>
                    <img className="chevron" alt="gold chevron" src={goldChevron}/>
                </div>
                <div>
                    <img className="chevron" alt="silver chevron" src={silverChevron}/>
                    <img className="chevron" alt="silver chevron" src={silverChevron}/>
                    <img className="chevron" alt="silver chevron"src={silverChevron}/>
                    <img className="chevron" alt="silver chevron" src={silverChevron}/>
                </div>
                <div>
                    <img className="chevron" alt="brown chevron" src={brownChevron}/>
                    <img className="chevron" alt="brown chevron" src={brownChevron}/>
                </div>
              </div>
            </div>

            <div className="col-md-2">
            <button className="btn btn-warning" onClick={() => {handleClick()}}>Favorites</button>
            <Button className="btn btn-primary mb" onClick={() => {handleOpenModal()}}>Edit Profile</Button>

                

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

  <Button onClick={handleOpenPasswordModal}>Change Password</Button>
              <Modal show={showPasswordModal} onHide={handleClosePasswordModal}>
                <Modal.Header closeButton>
                  <Modal.Title>Change Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <form>
                    <div className="form-group">
                      <label>
                       Current Password
                      </label>
                      <input type="password" onChange={handleChange}   name="currentPassword" className="form-control" value=
                      {formValues.currentPassword}/>
                    </div>
                      
                    <div className="form-group">
                      <label>
                      New Password
                      </label>
                      <input type="password" onChange={handleChange} name="newPassword" className="form-control" value=
                      {formValues.newPassword}/>
                    </div>
                    
                    <div className="form-group">
                      <label>
                        New Password
                      </label>
                      <input type="password" onChange={handleChange} name="validatePassword" className="form-control" value=
                      {formValues.validatePassword}/>
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
            {/*<div className="col-md-4">
              <div className="profile-work">
                <p>Work LINK</p>
                <a href="https://en.wikipedia.org/wiki/Lionel_Messi" target="_messi">
                  Messi
                </a>
                <br />
              </div>
            </div>*/}

            <div className="col-md-7 pl-5 about-info">
              <div className="tab-content profile-tab" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab">
                    <div className="row">
                      <div className="col-md-6">
                        <label>Email</label>
                      </div>
                      <div className="col-md-6">
                        <p>{x.email}</p>
                      </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Category</label>
                    </div>
                    <div className="col-md-6 ">
                      <p>{x.field}</p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Phone Number</label>
                    </div>
                    <div className="col-md-6">
                      <p> {x.phone}</p>
                    </div>
                  </div>
                   <div className="row">
                    <div className="col-md-6">
                      <label>Preferred language</label>
                    </div>
                    <div className="col-md-6">
                      <p> {x.language}</p>
                    </div>
                    {/*<div className="col-md-6">
                      <a href="#" onClick={handleClick}>Favorites</a>
                    </div>*/}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
    );
}

export default ProfilePage;