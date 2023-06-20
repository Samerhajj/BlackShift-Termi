import axios from "axios";
// import { logoutRoute, loginRoute, registerRoute, privateRoute,forgotPasswordRoute} from './ApiRoutes';

import { logoutRoute, loginRoute, registerRoute, privateRoute,forgotPasswordRoute} from '../api/ApiRoutes';


const login = async (loginData) =>{

      try{
          // --> send a req to the server and chack if the user is found
          //const res = await axios.post(loginRoute, loginData);
          console.log(loginRoute);
           const res = await axios.post(loginRoute, loginData,{headers: { 'Authorization': `${localStorage.getItem('token')}`}});
          
          console.log(res.headers);
          // --> assign the values that we got from the backend
          const token = res.data.token;
          console.log(token);
          const refreshToken = res.data.refreshToken;
          
          // --> set the access token & refresh token in the localStorage
          localStorage.setItem('token', token);
          localStorage.setItem('refreshToken', refreshToken);
          
          // --> privateRoute
          const profile_body = await axios.get(privateRoute, {
          headers: { 'x-auth-token': `${localStorage.getItem('token')}`}});
            
        //   localStorage.setItem('profileBody',JSON.stringify(profile_body.data) );//this work
          
          // localStorage.setItem('profileBody',JSON.parse(profile_body.data) );
        //   console.log(localStorage.getItem('profileBody'))
          
          // --> to set default header which will be sent with every request you make.
         // axios.defaults.headers.common['token']=localStorage.getItem('token');
         axios.defaults.headers.common['token']=`Bearer ${localStorage.getItem('token')}`;
          
          // --> change the status to login in the localStorage
          localStorage.setItem('login', true);
          
           return {body: profile_body.data, success: true};
          }
      catch(err){
          if(err.response.status === 401) {
              return {success: false, message: "Unauthorized"};
          }else{
              console.log(err.message);
              return {success: false, message: err.message};
          }
    //   console.error('Unauthorized');
    };

    
};

const register = async (registerData) =>{
    try{
          console.log("7777777777777777777");
          console.log(registerData)
          console.log("7777777777777777777");

        const res = await axios.post(registerRoute, registerData);
        return {body: res.data, success: true};
    }
    catch(err){
        if(err.response.status === 409) {
            return {success: false, message: "Email Already Exists"};
        }
        console.log(err);
        return {success: false, message: err.message};
    }    
}

const forgotPassword = async (email) =>{
    try{
        const res = await axios.post(forgotPasswordRoute, email );
        console.log(res.status)
        return {body: res, success: true};
    }
    catch(err){
        if(err.response.status === 409) {
            return {success: false, message: "Email Already Exists"};
        }
        console.log(err);
        return {success: false, message: err.message};
    }    
}


export default {login,register,forgotPassword};
