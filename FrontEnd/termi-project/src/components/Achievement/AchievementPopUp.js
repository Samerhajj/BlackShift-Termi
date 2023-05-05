// import React, { useEffect, useState } from 'react';
// import { ToastContainer, toast ,Slide} from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const AchievementPopUp = ({ isVisible, setIsVisible, notificationMessage, achievement }) => {
  
//   useEffect(() => {
//     if (achievement && isVisible) {
//       toast.success(
//         <div>
//           <img src={achievement.image} alt={achievement.name} width="50" height="50" />
//           <div>{achievement.name}</div>
//           <div>{achievement.description}</div>
//           <div>{notificationMessage}</div>
//         </div>,
//         {
//           onClose: () => setIsVisible(false),
//           onOpen: () => console.log('Toast opened!'),
//           transition: Slide,
//           autoClose: 5000,
//         }
//       );
//     }
//   }, [achievement, isVisible, notificationMessage, setIsVisible]);

//   return (
//     <ToastContainer
//       position="top-right"
//       closeOnClick={false}
//       newestOnTop={true}
//       draggable={true}
//       pauseOnHover={true}
//     />
//   );
// };

// export default React.memo(AchievementPopUp);