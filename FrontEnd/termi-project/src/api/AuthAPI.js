import axios from "axios";
import { logoutRoute,loginRoute,registerRoute ,privateRoute} from '../api/ApiRoutes';


const login = async (loginData) =>{

      try{
          // --> send a req to the server and chack if the user is found
          const res = await axios.post(loginRoute, loginData);
          
          // --> assign the values that we got from the backend
          const token = res.data.token;
          const refreshToken = res.data.refreshToken;
          
          // --> set the access token & refresh token in the localStorage
          localStorage.setItem('token', token);
          localStorage.setItem('refreshToken', refreshToken);
          
          // --> privateRoute
          const profile_body = await axios.get(privateRoute, {
          headers: { 'token': `${localStorage.getItem('token')}`}});
            
          localStorage.setItem('profileBody',JSON.stringify(profile_body.data) );//this work
          
          // localStorage.setItem('profileBody',JSON.parse(profile_body.data) );
          console.log(localStorage.getItem('profileBody'))
          
          // --> to set default header which will be sent with every request you make.
          axios.defaults.headers.common['token']=localStorage.getItem('token');
          
          // --> change the status to login in the localStorage
          localStorage.setItem('login', true);
          
           return {body: profile_body.data, success: true};
          }
      catch(err){
         if (err.response.status === 401) {
             return {success: false, message: "Unauthorized"};
    //   console.error('Unauthorized');
      }
    };

    
};

const register = async (registerData) =>{
    try{
        const res = await axios.post(registerRoute, registerData);
        return {body: res.data, success: true};
    }
    catch(err){
        console.log(err);
        return {success: false, message: err.message};
    }    
}


export default {login,register};
