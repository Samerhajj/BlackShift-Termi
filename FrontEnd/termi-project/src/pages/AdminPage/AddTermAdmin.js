import React,{useState, useContext} from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Input,Select, Button } from 'antd';

// --> APIs
import AdminAPI from '../../api/AdminAPI';

// --> Contexts 
import { CategoriesContext } from "../../components/CategoryContext";
import { LoginContext } from "../../components/LoginContext";

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
    
  const { categories } = useContext(CategoriesContext);
  const { userData } = useContext(LoginContext);
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  console.log(userData);

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
    values['categories'] = [values.selectedCategory];
    values['suggestedBy'] = location.state ? location.state.suggestedBy : userData.fullName;
    values['termSuggestedByID'] = location.state ? location.state.termSuggestedByID : userData._id;// new
    // values['_id'] = location.state['_id'];
    delete values['selectedCategory'];

    console.log(values);
    const response = await AdminAPI.addSelectedTerm(values);
    
    if(response.success){
      console.log(response);
      if(location.state && location.state['_id']){
        values['_id'] = location.state['_id'];
        await AdminAPI.deleteSelectedTerm(values);
        navigate('/admin/suggestions');
      }
      navigate('/admin');
    }
    else{
      alert(response.message);
    }
  };
  
  const [form] = Form.useForm();
  const onReset = () => {
    form.resetFields();
  };


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
              <button className="su-button" onClick={handleAdminPanel}>Back To Panel</button>
          </div>
        </div>
           <div className="wrapper">
     <Form {...layout} name="nest-messages" form ={form} onFinish={onFinish} initialValues={location.state} validateMessages={validateMessages}>
          <Form.Item label="Category (English)" name="selectedCategory" rules={[{ required: true, message: 'Please select a category' }]}>
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
          
          <Form.Item label="Category (Arabic)" name="selectedCategory" rules={[{ required: true, message: 'Please select a category' }]}>
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
        
        <Form.Item label="Category (Hebrew)" name="selectedCategory" rules={[{ required: true, message: 'Please select a category' }]}>
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
        
      <Form.Item name={['conceptName', 'english']} label="Concept Name (English)" rules={[{ required: true }]}>
        <Input/>
      </Form.Item>
      <Form.Item name={['conceptName', 'arabic']} label="Concept Name (Arabic)" rules={[{ required: true }]}>
        <Input/>
      </Form.Item>
      <Form.Item name={['conceptName', 'hebrew']} label="Concept Name (Hebrew)" rules={[{ required: true }]}>
        <Input/>
      </Form.Item>
       <Form.Item name={['shortDefinition', 'english']} label="Short Definition (English)" rules={[{ required: true }]}>
        <Input.TextArea/>
      </Form.Item>
      <Form.Item name={['shortDefinition', 'arabic']} label="Short Definition (Arabic)" rules={[{ required: true }]}>
        <Input.TextArea/>
      </Form.Item>
       <Form.Item name={['shortDefinition', 'hebrew']} label="Short Definition (Hebrew)" rules={[{ required: true }]}>
        <Input.TextArea/>
      </Form.Item>
       <Form.Item name={['longDefinition', 'english']} label="Long Definition (English)" rules={[{ required: true }]}>
        <Input.TextArea/>
      </Form.Item>
       <Form.Item name={['longDefinition', 'arabic']} label="Long Definition (Arabic)" rules={[{ required: true }]}>
        <Input.TextArea/>
      </Form.Item>
       <Form.Item name={['longDefinition', 'hebrew']} label="Long Definition (Hebrew)" rules={[{ required: true }]}>
        <Input.TextArea/>
      </Form.Item>
      <Form.Item label="URL"  name="readMore" rules={[{ validator: validateUrl }]}>
        <Input/>
      </Form.Item>
       <Form.Item>
        <Button type="primary" htmlType="submit" style={{marginTop: '25px'}}>
          Suggest
        </Button>
         <Button type="danger" onClick={onReset}>
            Reset
          </Button>
        </Form.Item>
      </Form>
        </div>
        
    </div>
    );
  function handleAdminPanel(){
    navigate('/admin');
  };
};


export default AddTermAdmin;