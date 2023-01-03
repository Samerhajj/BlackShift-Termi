import React,{useState} from 'react';
import axios from "axios";
import { useNavigate} from 'react-router-dom';
import { Form, Input,Select, Button } from 'antd';
// --> components
import SuggestCard from './SuggestCard';

// --> APIs
import AdminAPI from '../../api/AdminAPI';

import './Admin.css'

const { Option } = Select;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
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
    
    const navigate = useNavigate();

  const handleAdminPanel = () => {
    navigate('/admin');
  };
  const validateUrl = (rule, value, callback) => {
  if (!value) {
    callback();
  } else if (!/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/.test(value)) {
    callback('Invalid URL');
  } else {
    callback();
  }
};
const onFinish = values => {
    console.log(values);
  };
  
   const [selectedCategory, setSelectedCategory] = useState("");

const handleCategoryChange = (value) => {
  setSelectedCategory(value);
};

return (
    <div>
    <div className="banner banner_profile">
        <div className="wrapper">
          <div className="banner_content">
            <h1 className="pulsing-element">
              <strong>Admin Add Terms</strong>
            </h1>
          </div>
        </div>
      </div>
               <div className="container d-flex justify-content-center">
               <div>
                      <button className="su-button mb-2" onClick={handleAdminPanel}>Back To Panel</button>
               </div>
             
          </div>
           <div className="wrapper">
     <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
      <Form.Item label="URL" name="ReadMore" rules={[{ validator: validateUrl }]}>
        <Input />
      </Form.Item>
       <Form.Item label="Category (English)">
          <Select
            placeholder="Select a category"
            value={selectedCategory}
            onChange={(value) => setSelectedCategory(value)}
          >
            <Option value="human resources">Human Resources</Option>
            <Option value="medicine">Medicine</Option>
            <Option value="software engineering">Software Engineering</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Category (Arabic)">
        <Select
          value={selectedCategory}
        onChange={(value) => setSelectedCategory(value)}
          placeholder="Select a category"
        >
          <Option value="human resources">الموارد البشرية</Option>
          <Option value="medicine">طب</Option>
          <Option value="software engineering">برمجة</Option>
        </Select>
      </Form.Item>
      <Form.Item label="Category (Hebrew)">
        <Select
          value={selectedCategory}
         onChange={(value) => setSelectedCategory(value)}
          placeholder="Select a category"
        >
          <Option value="human resources">שאבי אנוש</Option>
          <Option value="medicine">רפואה</Option>
          <Option value="software engineering">תִכנוּת</Option>
        </Select>
      </Form.Item>
      <Form.Item name={['conceptName', 'english']} label="Concept Name (English)" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['conceptName', 'arabic']} label="Concept Name (Arabic)" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name={['conceptName', 'hebrew']} label="Concept Name (Hebrew)" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item name="shortDefinition" label="Short Definition (English)" rules={[{ required: true }]}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item name="shortDefinition" label="Short Definition (Arabic)" rules={[{ required: true }]}>
        <Input.TextArea />
      </Form.Item>
       <Form.Item name="shortDefinition" label="Short Definition (Hebrew)" rules={[{ required: true }]}>
        <Input.TextArea />
      </Form.Item>
       <Form.Item name="longDefinition" label="Long Definition (English)" rules={[{ required: true }]}>
        <Input.TextArea />
      </Form.Item>
       <Form.Item name="longDefinition" label="Long Definition (Arabic)" rules={[{ required: true }]}>
        <Input.TextArea />
      </Form.Item>
       <Form.Item name="longDefinition" label="Long Definition (Hebrew)" rules={[{ required: true }]}>
        <Input.TextArea />
      </Form.Item>
        </Form>
        </div>
        
    </div>
    )
}


export default AddTermAdmin;