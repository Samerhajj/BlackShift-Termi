import React from 'react';
import { toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Image} from 'react-bootstrap'

function achievementNotification(achievement, notificationMessage) {
    toast.success(
        <>
            <div className="d-flex flex-column align-items-center justify-items-center">
                <h4>{notificationMessage}</h4>
            	<Image style={{width: "100px"}} src={process.env.React_App_StorageURL + "blackshift" + "/" + achievement.image} alt={achievement.name + " image"} />
            	<div className="fs-5 fw-bold">{achievement.name}</div>
            </div>
        </>,
        {
          transition: Slide,
          autoClose: 5000,
        }
    );
}

function successNotification(notificationMessage) {
    toast.success(notificationMessage,
        {
          transition: Slide,
          autoClose: 5000,
        }
    );
}

function errorNotification(notificationMessage) {
    toast.error(notificationMessage,
        {
          transition: Slide,
          autoClose: 5000,
        }
    );
}

export default { achievementNotification, successNotification,errorNotification};
