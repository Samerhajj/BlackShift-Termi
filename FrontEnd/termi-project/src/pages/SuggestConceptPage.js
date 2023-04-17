import React,{useState, useContext} from "react";
import { Form, Input,Select, Button } from 'antd';
import { useTranslation } from 'react-i18next';

import { BsLink } from "react-icons/bs";
// APIs

import UserAPI from './../api/UserAPI';
import SearchApi from '../api/SearchAPI';
import LanguageMap from '../api/LanguageAPI';
// Contexts
import { LoginContext } from '../components/LoginContext';
import { CategoriesContext } from "../components/CategoryContext";

const layout = {
  labelCol: { span: 8}
};
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not validate email!',
    number: '${label} is not a validate number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const SuggestConceptPage=()=>{
  
  	const { t, i18n } = useTranslation();

  
  const { userData, setUserData } = useContext(LoginContext);
  const { categories } = useContext(CategoriesContext);
  const [englishNameEntered, setEnglishNameEntered] = useState(false);
  const [arabicNameEntered, setArabicNameEntered] = useState(false);
  const [hebrewNameEntered, setHebrewNameEntered] = useState(false);
  
  const handleEnglishNameChange = (e) => {
    setEnglishNameEntered(e.target.value.length > 0);
  };
  
  const handleArabicNameChange = (e) => {
    setArabicNameEntered(e.target.value.length > 0);
  };
  
  const handleHebrewNameChange = (e) => {
    setHebrewNameEntered(e.target.value.length > 0);
  };
    const [longTermEntered, setLongTermEntered] = useState(false);
  const [linkEntered, setLinkEntered] = useState(false);
    const handleLinkChange = (e) => {
    setLinkEntered(e.target.value.length > 0);
  };
  
  // --> 
  const [form] = Form.useForm();

  const onFinish = async(values)=> {
    let searchRes;
    if(englishNameEntered){
      searchRes = await SearchApi.search(values.conceptName.english, "english", values.selectedCategory);
    }else if(arabicNameEntered){
      searchRes = await SearchApi.search(values.conceptName.arabic, "arabic", values.selectedCategory);
    }else{
      searchRes = await SearchApi.search(values.conceptName.hebrew, "hebrew", values.selectedCategory);
    }
    
    if(!searchRes.success && searchRes.error == false){
      values.suggestedBy=userData.fullName;
      values._id = userData._id;
      // console.log(userData['suggestion'])
      const res = await UserAPI.suggestFromUser(values);
     values.suggestion = userData['suggestion'];
      console.log(res);
      if(res.success){
  			setUserData({...userData, suggestConceptCounter: userData.suggestConceptCounter + 1});
      }
      else{
        console.log(res.message);
      }
      onReset();
    }else{
      alert("Concept already exists");
    }
  };
  
  const checkConceptName = (_, value) => {
    // console.log(form);
    // let enValue = form.getFieldValue(["conceptName", "english"]);
    // let arValue = form.getFieldValue(["conceptName", "arabic"]);
    // let heValue = form.getFieldValue(["conceptName", "hebrew"]);
    
    // if(enValue == undefined || enValue == ""){
    //   console.log("reset en");
    //   form.resetField(["conceptName", "english"]);
    // }
    
    // if(arValue == undefined || arValue == ""){
    //   console.log("reset ar");
    //   form.resetField(["conceptName", "arabic"]);
    // }
    
    // if(heValue == undefined || heValue == ""){
    //   console.log("reset he");
    //   form.resetField(["conceptName", "hebrew"]);
    // }
    
    if (englishNameEntered || arabicNameEntered || hebrewNameEntered) {
      return Promise.resolve();
    }
    return Promise.reject("At least one concept name is required.");
};

  const layout = {
    labelCol: { span: 8 },
  };
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not validate email!",
      number: "${label} is not a validate number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };
  
    return (
        <>
    <div className="banner banner_note">
        <div className="wrapper">
          <div className="banner_content">
            <h1 className="">
              <strong><h3>{t('suggest_concept_page.suggest_title')}</h3></strong>
            </h1>
          </div>
        </div>
    </div>
    
    <div className="wrapper">
    {
     <Form {...layout} className="mt-5"  form ={form} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
          <Form.Item label={t('suggest_concept_page.category_en')}  name="selectedCategory" rules={[{ required: true, message: 'Please select a category' }]}>
            <Select
              name="categoryEN"
              placeholder="Select a category">
              {
                  categories.map((category, index) => {
                  let categoryName = category.categoryName["english"];
                  let uppercaseName = categoryName.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
                  return (
                      <Select.Option key={index} value={category.categoryId}>{uppercaseName}</Select.Option>
                  )})
              }
            </Select>
          </Form.Item>
          
          <Form.Item label={t('suggest_concept_page.category_ar')}name="selectedCategory" rules={[{ required: true, message: 'Please select a category' }]}>
          <Select
            name="categoryAR"
            placeholder="Select a category">
            {
                categories.map((category, index) => {
                let categoryName = category.categoryName["arabic"];
                return (
                    <Select.Option key={index} value={category.categoryId}>{categoryName}</Select.Option>
                )})
            }
          </Select>
        </Form.Item>
        <Form.Item label={t('suggest_concept_page.category_he')} name="selectedCategory" rules={[{ required: true, message: 'Please select a category' }]}>
           <Select
            name="categoryHE"
            placeholder="Select a category">
            {
                categories.map((category, index) => {
                let categoryName = category.categoryName["hebrew"];
                return (
                    <Select.Option key={index} value={category.categoryId}>{categoryName}</Select.Option>
                )})
            }
          </Select>
        </Form.Item>
        
        <Form.Item name={['conceptName', 'english']} label={t('suggest_concept_page.c_name_en')} rules={[{validator: (_, value) => checkConceptName(_, value)}]}>
          <Input onChange={handleEnglishNameChange} />
        </Form.Item>
        
        <Form.Item name={['conceptName', 'arabic']} label={t('suggest_concept_page.c_name_ar')} rules={[{validator: (_, value) => checkConceptName(_, value)}]}>
          <Input onChange={handleArabicNameChange} />
        </Form.Item>
        
        
        <Form.Item name={['conceptName', 'hebrew']} label={t('suggest_concept_page.c_name_he')} rules={[{validator: (_, value) => checkConceptName(_, value)}]}>
          <Input onChange={handleHebrewNameChange} />
        </Form.Item>
          
         {englishNameEntered && (
        <Form.Item name={['shortDefinition', 'english']} label={t('suggest_concept_page.s_def-en')} rules={[{ required: true }]}>
          <Input.TextArea />
        </Form.Item>
         )}
        
          {arabicNameEntered && (
        <Form.Item name={['shortDefinition', 'arabic']} label={t('suggest_concept_page.s_def-ar')} rules={[{ required: true }]}>
          <Input.TextArea />
        </Form.Item>
        )}
        
         {hebrewNameEntered && (
         <Form.Item name={['shortDefinition', 'hebrew']} label={t('suggest_concept_page.s_def-he')} rules={[{ required: true }]}>
          <Input.TextArea />
        </Form.Item>
        )}
        
        { englishNameEntered &&(
        <Form.Item name={['longDefinition', 'english']} label={t('suggest_concept_page.l_def-en')} rules={[{ required: false }]}>
       <Input.TextArea />
        </Form.Item>
         )}
        
            {arabicNameEntered && (
        <Form.Item name={['longDefinition', 'arabic']} label={t('suggest_concept_page.l_def-ar')} rules={[{ required: false }]}>
          <Input.TextArea />
        </Form.Item>
        )}
        
         {hebrewNameEntered && (
         <Form.Item name={['longDefinition', 'hebrew']} label={t('suggest_concept_page.l_def-he')} rules={[{ required: false }]}>
          <Input.TextArea />
        </Form.Item>
        )}
    

        {(
        <Form.Item name={['link', 'english']} label={<BsLink style={{ fontSize: '24px' }} />} rules={[{ required: false }]}>
         <Input onChange={handleEnglishNameChange} />
        </Form.Item>
         )}

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{marginTop: '25px'}}>
            {t('suggest_concept_page.sbtn')}
          </Button>
        <Button type="danger" onClick={onReset}>
             {t('suggest_concept_page.rbtn')}
          </Button>
        </Form.Item>
      </Form>}
        </div>
        
    </>
        );
        
  function onReset() {
    form.resetFields();
    setEnglishNameEntered(false);
    setArabicNameEntered(false);
    setHebrewNameEntered(false);
  }
};


export default SuggestConceptPage;