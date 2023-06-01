import React,{useState, useContext} from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Input,Select, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import yaml from 'js-yaml';

// --> APIs
import AdminAPI from '../../api/AdminAPI';
import NotificationsAPI from '../../api/NotificationsAPI';


// --> Contexts 
import { CategoriesContext } from "../../components/CategoryContext";
import { LoginContext } from "../../components/LoginContext";

// --> Components
import TermDiff from "../../components/TermDiff"


import './Admin.css'

const layout = {
  labelCol: { span: 8 }
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

const AddTermAdmin=()=> {
    
  const {t} = useTranslation();
  const { categories } = useContext(CategoriesContext);
  const { userData } = useContext(LoginContext);
  const role = userData.role;
  const navigate = useNavigate();
  const location = useLocation();
  const [initialText, setInitialText] = useState();
  const [modifiedText, setModifiedText] = useState();
  const [showModal, setShowModal] = useState(false);
  const validateUrl = (rule, value, callback) => {
  if (!value) {
    callback();
  } else if (!/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/.test(value)) {
    callback('Invalid URL');
  } else {
    callback();
  }
};
  const onFinish = async(values) => {
    // const modifiedValues = formatFormData(values);
    // console.log(modifiedValues);//new values
    // console.log(location.state);//initial values
    
    // const data = location.state ? location.state : null;
    let data = null;
    if(location.state){
      data={...location.state};
      delete data._idTerm;
      delete data.suggestedBy;
      // setOriginalData({...location.state});
    }
    
   // // // // // 
    
    
    setInitialText(inputCollector(data));
    setModifiedText(inputCollector(form.getFieldsValue()));
    
    setShowModal(true);
    
    // if(location.state && location.state._idTerm){
    //   values['_id'] = location.state._idTerm;
    // }
    
    
    // values['categories'] = [values.selectedCategory];
    // values['suggestedBy'] = location.state ? location.state.suggestedBy : userData.fullName;
    // values['termSuggestedByID'] = location.state ? location.state.termSuggestedByID : userData._id;
    // const response = await AdminAPI.addSelectedTerm(values);
    
    // delete values['selectedCategory'];
    
    // inputCollector();

    // if(response.success){
    //   NotificationsAPI.successNotification("Successfully added to the Database!");
    //   console.log(response);
    //   if(location.state && location.state['_idSuggest']){
    //     values['_id'] = location.state['_idSuggest'];
    //     await AdminAPI.deleteSelectedTerm(values);
    //     navigate('/admin/suggestions');
    //   }
    //   navigate('/admin');
    // }
    // else{
    //   NotificationsAPI.errorNotification("Something Went Wrong!");
      
    // }
  };
  
  const [form] = Form.useForm();
  const onReset = () => {
    form.resetFields();
  };



const handleSuggest = async () => {
  
    const newText=form.getFieldsValue();
    console.log(location.state);
    newText['categories'] = [newText.selectedCategory];
    delete newText['selectedCategory'];
    newText['suggestedBy'] = location.state ? location.state.suggestedBy : userData.fullName;
    newText['termSuggestedByID'] = location.state ? location.state.termSuggestedByID : userData._id;
    
    
    if(location.state && location.state._idTerm){
      newText['_id'] = location.state._idTerm;
    }
    
    console.log(newText);
    
  // const response = await AdminAPI.addSelectedTerm(newText);
  const response = await AdminAPI.addSelectedTerm(newText,role);

  
    if(response.success){
      NotificationsAPI.successNotification("Successfully added to the Database!");
      console.log(response);
      if(location.state && location.state['_idSuggest']){
        newText['_id'] = location.state['_idSuggest'];
        await AdminAPI.deleteSelectedTerm(newText,role);
        navigate('/admin/suggestions');
      }else{
        navigate('/admin');
      }
    }
    else{
      NotificationsAPI.errorNotification("Something Went Wrong!");
      
    }
};


function inputCollector(data){
  const formData = data;
  const jsonData = JSON.stringify(formData);
  let parsedFormData;
  try {
    parsedFormData = JSON.parse(jsonData);
  } catch (error) {
    console.error(`Error parsing JSON: ${error}`);
  }
  const yamlData = yaml.dump(parsedFormData);
  // console.log(yamlData);
  
  let parsedYamlData;
  try {
    parsedYamlData = yaml.load(yamlData);
  } catch (error) {
    console.error(`Error parsing YAML: ${error}`);
  }
  const jsonData1 = JSON.stringify(parsedYamlData);
  const formattedJsonData = jsonData1.replace(/":/g, ': ');
  const textData = yaml.dump(parsedFormData).replace(/\n/g, '\r\n');
  
  console.log(textData); // the old text
  return textData;
}// this function collect all the inputs

// inputCollector();
// console.log(text);

// // Remove curly brackets and quotation marks from the text
// const cleanText = text.replace(/[{}"]/g, '');

// // Split the text by commas to get each line
// const lines = cleanText.split(',');

// // Print each line without quotation marks
// lines.forEach(line => console.log(line.trim().replace(/"/g, '')));


function formatFormData(formData) {
  // create a deep copy of the form data object
  const modifiedFormData = JSON.parse(JSON.stringify(formData));

  // delete the selectedCategory property from the copied object
  delete modifiedFormData.selectedCategory;

  // add suggestedBy and termSuggestedByID properties if they don't exist
  if (!modifiedFormData.suggestedBy) {
    modifiedFormData.suggestedBy = location.state ? location.state.suggestedBy : userData.fullName;
  }

  if (!modifiedFormData.termSuggestedByID) {
    modifiedFormData.termSuggestedByID = location.state ? location.state.termSuggestedByID : userData._id;
  }

  return modifiedFormData;
}


  function handleAdminPanel(){
    navigate('/admin');
  }

  return (
      <div>
      <div className="banner banner_admin">
          <div className="wrapper">
            <div className="banner_content">
              <h1 className="pulsing-element">
                <strong>Admin Add Terms</strong>
              </h1>
            </div>
          </div>
        </div>
          <div className="container d-flex justify-content-center mb-2">
             <div className="admin-sg goAndChange">
                <button className="su-button style_for_button_in_viewSuggestions" onClick={handleAdminPanel}>{t('user-suggestions.backtopanel')}</button>
            </div>
          </div>
             <div className="wrapper">
       <Form {...layout} name="nest-messages" form ={form} onFinish={onFinish} initialValues={location.state} validateMessages={validateMessages}>
            <Form.Item label={t('add-term-admin.category_en')} name="selectedCategory" rules={[{ required: true, message: 'Please select a category' }]}>
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
            
            <Form.Item label={t('add-term-admin.category_ar')} name="selectedCategory" rules={[{ required: true, message: 'Please select a category' }]}>
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
          
          <Form.Item label={t('add-term-admin.category_he')} name="selectedCategory" rules={[{ required: true, message: 'Please select a category' }]}>
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
          
        <Form.Item name={['conceptName', 'english']} label={t('add-term-admin.concept_name_en')} rules={[{ required: true }]}>
          <Input/>
        </Form.Item>
        <Form.Item name={['conceptName', 'arabic']} label={t('add-term-admin.concept_name_ar')} rules={[{ required: true }]}>
          <Input/>
        </Form.Item>
        <Form.Item name={['conceptName', 'hebrew']} label={t('add-term-admin.concept_name_he')} rules={[{ required: true }]}>
          <Input/>
        </Form.Item>
         <Form.Item name={['shortDefinition', 'english']} label={t('add-term-admin.short_def_en')} rules={[{ required: true }]}>
          <Input.TextArea/>
        </Form.Item>
        <Form.Item name={['shortDefinition', 'arabic']} label={t('add-term-admin.short_def_ar')} rules={[{ required: true }]}>
          <Input.TextArea/>
        </Form.Item>
         <Form.Item name={['shortDefinition', 'hebrew']} label={t('add-term-admin.short_def_he')} rules={[{ required: true }]}>
          <Input.TextArea/>
        </Form.Item>
         <Form.Item name={['longDefinition', 'english']} label={t('add-term-admin.long_def_en')} rules={[{ required: true }]}>
          <Input.TextArea/>
        </Form.Item>
         <Form.Item name={['longDefinition', 'arabic']} label={t('add-term-admin.long_def_ar')} rules={[{ required: true }]}>
          <Input.TextArea/>
        </Form.Item>
         <Form.Item name={['longDefinition', 'hebrew']} label={t('add-term-admin.long_def_he')} rules={[{ required: true }]}>
          <Input.TextArea/>
        </Form.Item>
        <Form.Item name={'readMore'} label={t('add-term-admin.url')} rules={[{ validator: validateUrl }]}>
          <Input/>
        </Form.Item>
        
         <Form.Item>
          <div className="container d-flex justify-content-center mb-2">
            <Button type="primary" htmlType="submit" style={{marginTop: '25px'}}>
              {t('add-term-admin.suggest_button')}
            </Button>
          </div>
          <div className="container d-flex justify-content-center mb-2">
            <Button type="danger" onClick={onReset}>
              {t('add-term-admin.reset_button')}
            </Button>
          </div>
          </Form.Item>
        </Form>
          </div>
        {initialText!=null && (
          <div>
            <TermDiff oldTerm={initialText} newTerm={modifiedText} showModal={showModal} setShowModal={setShowModal} handleSuggest={handleSuggest}/>
          </div>
        )}
      </div>
    );
};


export default AddTermAdmin;