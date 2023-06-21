import React, { useState, useRef, useContext } from "react";
import Image from "react-bootstrap/Image";
import UserAPI from "../../api/UserAPI";
import NotificationsAPI from "../../api/NotificationsAPI";
import {LoginContext} from "../LoginContext";
import style from "./ImageUploader.css";

function ImageUploader() {
  const {userData, setUserData} = useContext(LoginContext);
  const [image, setImage] = useState({url: userData.profileImage});
  const fileInputRef = useRef(null);
const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB

 const handleImageUpload = async (event) => {
  const selectedFile = event.target.files[0];
   if(selectedFile !== null){
       if (selectedFile.size > MAX_FILE_SIZE) {
         // File size exceeds the limit
      NotificationsAPI.errorNotification("File Limit is 25mb");
      return;
    }
      console.log(selectedFile);
      const fileName = selectedFile.name;
      const lastDotIndex = fileName.lastIndexOf('.');
      const fileExtension = lastDotIndex === -1 ? '' : fileName.substring(lastDotIndex + 1);
      console.log('Selected file extension:', fileExtension);
      
      let formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("fileExtension", fileExtension);
      formData.append("id", userData._id);
      
      const respond = await UserAPI.uploadProfileImage(formData);
      
      if(respond.success){
        NotificationsAPI.successNotification("Image uploaded successfully");
        setImage({...image, url: respond.body});
        setUserData({...userData, profileImage: respond.body});
      }else{
        NotificationsAPI.errorNotification(respond.message);
      }
   }  
};

  const handleImageClick = () => {
    fileInputRef.current.click();
  };
  
  // console.log("Object URL:", userData ? URL.createObjectURL(userData) : "");


  return (
    <div className="profile-image-container mb-3">
      <Image 
        src={image.url ? process.env.React_App_StorageURL + image.url : "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png"} 
        onClick={handleImageClick}
        style={{ cursor: "pointer" }}
      />
      <input
        type="file"
        id="image-upload"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: "none" }}
        ref={fileInputRef}
      />
    </div>
  );
}

export default ImageUploader;
