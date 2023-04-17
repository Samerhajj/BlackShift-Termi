import React,{useState,useEffect, useContext} from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import RegisterHook from './RegisterHook';
import axios from 'axios';
// --> styles
// import styles from "../styles/RegisterPage.css";
import styles from "./RegisterPage.module.css";

// --> APIs
import AuthAPI from '../../api/AuthAPI';
import LanguageMap from '../../api/LanguageAPI';

// --> Contexts
import { CategoriesContext } from "../../components/CategoryContext";

import CheckBox from "./CheckBox";
const Register = () =>{
  //   const status = ["Student","works in the field","Other"];
  //   const [checkedState, setCheckedState] = useState(
  //   new Array(status.length).fill(false)
  // );
    const [selectedStatus, setSelectedStatus] = useState([]);
  
  const navigate = useNavigate();
  const {t, i18n} = useTranslation();
  // const [data,setData] = useState({fullName:"",phone:"",language:"",email:"",password:"",field:"",favorite:[]});
  const [data,setData] = useState({fullName:"",phone:"",language:"",email:"",password:"",gender : "",field:"",favorite:[]});
  const { errors, validate } = RegisterHook(); // use the custom hook
  const { categories } = useContext(CategoriesContext);
   const [registered, setRegistered] = useState(false); // new state variable

  
//   const [category,setCategory] = useState([]);
// {
//   // Handle the button click to register
//   //   const handleSubmit = async () => {
//   //     const response = await AuthAPI.register({data:data});
//   //     if(response.success){
//   //       navigate('/login');
//   //     }
//   //     else{
//   //         alert(response.message);
//   //     }
//   // };
// } 
// useEffect(()=>{
//   const fetchCategory= async () => {
// 										// const res = await axios.get("http://dir.y2022.kinneret.cc:7013/category");
// 										// console.log(res.data);
//       const res = await axios.get("http://dir.y2022.kinneret.cc:7013/category");
//         console.log(res.data);
//         let temp = [];
        
//         res.data.map((item)=>{
//           temp.push(item);
//         });
//         setCategory([...temp]);
//         console.log(category);
                    
// 								   }
// fetchCategory();	
// },[])

const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate(data); // validate the data
    if (Object.keys(errors).length > 0) {
    // If there are errors, display them to the user
    return;
    }
    // If there are no errors, make the API call
    const response = await AuthAPI.register({data:data});
    
    if(response.success){
       setRegistered(true);//set to
    }
    else{
        alert(response.message);
    }
  };
  
    return(
      <>
      <div className="banner banner_login">
        <div className="wrapper">
          <div className="banner_content">
              <h1>{t('register.register')}</h1>
          </div>
        </div>
      </div>
    <div className={`${styles.class_card_register} wrapper`}>
    {registered && (
  <div className="alert alert-success" role="alert">
"Thank you for registering. Please check your email inbox for further instructions on how to validate your email address so that you can log in."
  </div>
)}
      <div className="d-flex justify-content-center">
        <form className="login-form">
         <div className="form-group my-3">
            <input
              type="text"
              className="form-control rounded-left"
              placeholder={t('register.full_name')}
              onChange={(e)=>setData({...data,fullName : e.target.value})}
            />
              {errors.fullName && <p className="text-danger">{errors.fullName}</p>}
          </div>
          
         <div className="form-group my-3">
            <input
              type="text"
              className="form-control rounded-left"
              placeholder={t('register.phone')}
              onChange={(e)=>setData({...data,phone:e.target.value})}
            />
              {errors.phone && <p className="text-danger">{errors.phone}</p>}
          </div>
        
          <div className="form-group my-3">
            <input
              type="text"
              className="form-control rounded-left"
              placeholder={t('register.email')}
              onChange={(e)=>setData({...data,email:e.target.value})}
            />
              {errors.email && <p className="text-danger">{errors.email}</p>}
          </div>
          
        <select
            style={{ width: 200 }}
          className={`form-select w-100 ${errors.gender ? 'is-invalid' : ''}`}
          onChange={(e)=>setData({...data,gender:e.target.value})}
          >
            <option value="" disabled selected>gender</option>
            <option value="male">male</option>
            <option value="female">female</option>
            <option value="other">other</option>
      </select>
      
      
          <div className="form-group my-3">
            <input
              type="password"
              className="form-control rounded-left"
              placeholder={t('register.password')}
              onChange={(e)=>setData({...data,password:e.target.value})}
            />
              {errors.password && <p className="text-danger">{errors.password}</p>}
          </div>
          
        <select
            style={{ width: 200 }}
            className={`form-select w-100 ${errors.field ? 'is-invalid' : ''}`}
            aria-label="Default select example"
            id="field"
            title={errors.field}
            onChange={(e)=>setData({...data,field:e.target.value})}>
            <option value="" disabled selected>{t('register.select_category')}</option>
            {
                categories.map((category, index) => {
                let categoryName = category.categoryName[LanguageMap[i18n.language].name];
                let uppercaseName = categoryName.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
                return (
                    <option key={index} value={category.categoryId}>{uppercaseName}</option>
                )})
            }
        </select>
        <select 
            style={{ width: 200}}
           className={`form-select w-100 mt-3 ${errors.language ? 'is-invalid' : ''}`}
            aria-label="Default select example"
            id="lang"
            title={errors.language}
            onChange={(e)=>setData({...data,language:e.target.value})}
          >
            <option value="" disabled selected>{t('register.select_lang')}</option>
            <option value="English">{t('register.lang_en')}</option>
            <option value="Arabic">{t('register.lang_ar')}</option>
            <option value="Hebrew">{t('register.lang_he')}</option>
      </select>


          
          <div className="form-group">
            <button
              type="button"
              className={`form-control ${styles.btn} btn btn-primary rounded submit px-3 mt-5`}
              onClick={handleSubmit}
            >
            {t('register.register')}
            </button>
          </div>
        </form>
        <br/><br/><br/>
    </div>
    </div>
    </>
    );
}
export default Register
//       <CheckBox selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus}/>
