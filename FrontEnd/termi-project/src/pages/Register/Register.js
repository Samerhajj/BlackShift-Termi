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
import NotificationsAPI from '../../api/NotificationsAPI';

// --> Contexts
import { CategoriesContext } from "../../components/CategoryContext";

import CheckBox from "./CheckBox";
import Stepper from "./Stepper"
const Register = () =>{
const [currentStep, setCurrentStep] = useState(0);

  const [selectedStatus, setSelectedStatus] = useState([]);
  
  const navigate = useNavigate();
  const {t, i18n} = useTranslation(); 
  
  const [data,setData] = useState({
    fullName:"",
    phone:"",
    language:"",
    email:"",
    password:"",
    gender : "",
    field:"",
    favorite:[],
    status:[]
  });
  
 


  const { errors, validate } = RegisterHook(); // use the custom hook
  const { categories } = useContext(CategoriesContext);
  const [registered, setRegistered] = useState(false); // new state variable

 const handleClick = () => {
  setCurrentStep(currentStep + 1);
};



const handleStepSubmit = async (e) => {
  e.preventDefault();
  console.log(data);
  const errors = validate(data, currentStep); // validate the data for the current step
  console.log(errors);
    if (Object.keys(errors).length > 0) {
    // If there are errors, display them to the user
    return;
    }
  // If there are no errors, update the current step to move to the next section
  setCurrentStep(currentStep + 1);
 
};


const handleSubmit = async (e) => {
   
    e.preventDefault();
    const newErrors=validate(data,2);
    if(Object.keys(newErrors).length===0)
    {
    setData((prevState) => ({ ...prevState, status: selectedStatus })); // update data state with selectedStatus

    console.log(data);
    const response = await AuthAPI.register({data:data});
    
    if(response.success){
       setCurrentStep(currentStep+1);//set to
    }
    
    else{
        NotificationsAPI.errorNotification(response.message);
    }
    }
    
    console.log(selectedStatus)
    
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
   
   
  <Stepper currentStep={currentStep} setCurrentStep={setCurrentStep} />
<div className="d-flex justify-content-center">
  {currentStep === 0 &&
    <form className="login-form">
      <div className="form-group my-3">
        <input
          type="text"
          className="form-control rounded-left"
          placeholder={t('register.full_name')}
          onChange={(e)=>setData({...data,fullName : e.target.value})}
          value={data.fullName}
        />
        {errors.fullName && <p className="text-danger">{errors.fullName}</p>}
      </div>
      <div className="form-group my-3">
        <input
          type="text"
          className="form-control rounded-left"
          placeholder={t('register.email')}
          onChange={(e)=>setData({...data,email:e.target.value})}
           value={data.email}
        />
        {errors.email && <p className="text-danger">{errors.email}</p>}
      </div>
      <div className="form-group">
        <button
          type="button"
          className={`form-control ${styles.btn} btn btn-primary rounded submit px-3 mt-5`}
          onClick={handleStepSubmit}
        >
        {t('register.next')}
        </button>
      </div>
    </form>
  }
  {currentStep === 1 &&
    <form className="login-form">
    
      {/*Phone number*/}
      <div className="form-group my-3">
        <input
          type="text"
          className="form-control rounded-left"
          placeholder={t('register.phone')}
          onChange={(e)=>setData({...data,phone:e.target.value})}
          value={data.phone}
        />
        {errors.phone && <p className="text-danger">{errors.phone}</p>}
      </div>
      
      {/*Gender*/}
      <div className="form-group my-3">
          <select
            style={{ width: 200 }}
            className={`form-select w-100 ${errors.gender ? 'is-invalid' : ''}`}
            onChange={(e)=>setData({...data,gender:e.target.value})}
              value={data.gender}
          >
            <option value="" disabled selected>{t('gender.gener-option')}</option>
            <option value="male">{t('gender.male')}</option>
            <option value="female">{t('gender.female')}</option>
            <option value="other">{t('gender.other')}</option>
          </select>
      </div>
      
      {/*Select category*/}
      <div className="form-group my-3">
          <select
            style={{ width: 200 }}
            className={`form-select w-100 ${errors.field ? 'is-invalid' : ''}`}
            aria-label="Default select example"
            id="field"
            title={errors.field}
            onChange={(e)=>setData({...data,field:e.target.value})}
            value={data.field}>
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
      </div>
        
      {/*Language*/}
      <div className="form-group my-3">
        <select 
            style={{ width: 200}}
           className={`form-select w-100 mt-3 ${errors.language ? 'is-invalid' : ''}`}
            aria-label="Default select example"
            id="lang"
            title={errors.language}
            onChange={(e)=>setData({...data,language:e.target.value})}
            value={data.language}
          >
            <option value="" disabled selected>{t('register.select_lang')}</option>
            <option value="English">{t('register.lang_en')}</option>
            <option value="Arabic">{t('register.lang_ar')}</option>
            <option value="Hebrew">{t('register.lang_he')}</option>
        </select>
      </div>
    
      
    {/*Status*/}
    <div className="form-group my-3">
      <CheckBox setData={setData}  selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus}/>
          <button
            type="button"
            className={`form-control ${styles.btn} btn btn-primary rounded submit px-3 mt-5`}
            onClick={handleStepSubmit}
          >
            {t('register.next')}
        </button>
      </div>
      
    </form>
  }
  {currentStep === 2 &&
    <form className="login-form">
      <div className="form-group my-3">
        <input
          type="password"
          className="form-control rounded-left"
          placeholder={t('register.password')}
          onChange={(e)=>setData({...data,password:e.target.value})}
        />
        {errors.password && <p className="text-danger">{errors.password}</p>}
      </div>
      <div className="form-group">
        <button
          type="button"
          className={`form-control ${styles.btn} btn btn-primary rounded submit px-3 mt-5`}
          onClick={handleSubmit}
        >
        {t('register.next')}
        </button>
      </div>
    </form>
  }
    {currentStep===3 &&
     <div className={`${styles.class_card_register} wrapper`}>
     <div className="alert alert-success" role="alert">
      {t('register.finish_message')}

  </div>
  </div>
  }
</div>

        <br/><br/><br/>
   
    
    </>
    );
}
export default Register









{/*    <>
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
 <Stepper currentStep={0} />
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
      <CheckBox setData={setData}  selectedStatus={selectedStatus} setSelectedStatus={setSelectedStatus}/>
          
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
    </>*/}