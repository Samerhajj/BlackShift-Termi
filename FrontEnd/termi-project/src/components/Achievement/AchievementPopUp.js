import React, { useEffect, useRef, useState } from 'react';
// import NotificationSystem from 'react-notification-system';

const AchievementPopup = ({ notificationMessage }) => {
     console.log('AchievementPopup rendered');
  const [notification, setNotification] = useState(null);
  const notificationSystem = useRef(null);

  useEffect(() => {
    console.log('useEffect called');
    if (notificationMessage) {
      setNotification(notificationSystem.current.addNotification({
        message: notificationMessage,
        level: 'success',
        autoDismiss: 5,
      position: 'tr' // Change the position value here
      }));
    }
  }, [notificationMessage]);

  return (
    {/*<NotificationSystem ref={notificationSystem} />*/}
 
  );
};

export default React.memo(AchievementPopup);
