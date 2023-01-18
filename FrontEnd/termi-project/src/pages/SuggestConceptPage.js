import React,{useState} from "react";
import { Form, Input,Select, Button } from 'antd';
import { useTranslation } from 'react-i18next';
import UserAPI from './../api/UserAPI';
import {Modal ,Tab ,Row} from "react-bootstrap";
import Tabs from './SuggestConceptPage/Tabs'
const { Option } = Select;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { span: 8, span: 16 },
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
      localStorage.setItem('currentPage', 'SuggestConceptPage')//test

  
const validateUrl = (rule, value, callback) => {
  if (!value) {
    callback();
  } else if (!/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/.test(value)) {
    callback('Invalid URL');
  } else {
    callback();
  }
};
{
//   const onFinish = values => {
//       const user = JSON.parse(localStorage.getItem('profileBody'));
//     values.suggestedBy = user.fullName;
    
//     //Combine the values of short definitions into a single object,
//       values.shortDefinition = {
//     english: values['shortDefinition-english'],
//     arabic: values['shortDefinition-arabic'],
//     hebrew: values['shortDefinition-hebrew']
//   };
//   //combine the values of long definitions into a single object,
//   values.longDefinition = {
//     english: values['longDefinition-english'],
//     arabic: values['longDefinition-arabic'],
//     hebrew: values['longDefinition-hebrew']
//   };
//   //delete the withstand values from the original fields after combining , we dont need em
//   delete values['shortDefinition-english'];
// delete values['shortDefinition-arabic'];
// delete values['shortDefinition-hebrew'];
// delete values['longDefinition-english'];
// delete values['longDefinition-arabic'];
// delete values['longDefinition-hebrew'];
//   console.log(values);
//   };
} 

// --> 
const [selectedCategory, setSelectedCategory] = useState("");
const [form] = Form.useForm();

const englishOptions = [
  { value: 0, label: 'human resources' },
  { value: 1, label: 'software engineering' },
];
const arabicOptions = [
  { value: 0, label: 'الموارد البشرية' },
  { value: 1, label: 'برمجة' },
];
const hebrewOptions = [
  { value: 0, label: 'משאבי אנוש' },
  { value: 1, label: 'תִכנוּת' },
];


  const onFinish = async(values)=> {
   
      values.shortDefinition = {
     english: values['shortDefinition-english'],
     arabic: values['shortDefinition-arabic'],
     hebrew: values['shortDefinition-hebrew']
  };
   delete values['shortDefinition-english'];
 delete values['shortDefinition-arabic'];
 delete values['shortDefinition-hebrew'];
  console.log(values);
    const res = await UserAPI.suggestFromUser(values,selectedCategory);
   
    console.log(res);
    if(res.success){
      form.resetFields();
      setSelectedCategory("");
    }
    else{
      console.log(res.message);
    }
  }

    //concept names have to be Select
    return (
        <>
    <div className="banner banner_note">
        <div className="wrapper">
          <div className="banner_content">
            <h1 className="">
              <strong><h3>Suggest Concept...</h3></strong>
            </h1>
          </div>
        </div>
    </div>
    
    <div className="wrapper">
    
    
    {/*<Tabs/>*/}
    
    
    {
    
     <Form {...layout}  form ={form} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                      <Form.Item {...tailLayout}>
                  <Button type="primary" htmlType="submit" style={{marginTop: '25px'}}>
                    Suggest
                  </Button>
                   <Button type="danger" onClick={onReset}>
                      Reset
                    </Button>
                  </Form.Item>
            
                  
                    <Form.Item label="Category (English)" rules={[{ required: true, message: 'Please select a category' },
                    { whitespace: true, message: 'Category cannot be empty' }]}>
                     
                      
                      <Select
                         name="category"
                        placeholder="Select a category"
                        value={selectedCategory}
                        onChange={(value) => setSelectedCategory(value)}
                        options={englishOptions}>
                      </Select>
                    </Form.Item>
                    
                    
                    <Form.Item label="Category (Arabic)" rules={[{ required: true, message: 'Please select a category' }, { whitespace: true, message: 'Category cannot be empty' }]}>
                   
                    <Select
                      name="category"
                      value={selectedCategory}
                      onChange={(value) => setSelectedCategory(value)}
                      placeholder="Select a category"
                      options={arabicOptions}>
                    </Select>
                  </Form.Item>
                  
                  <Form.Item label="Category (Hebrew)" rules={[{ required: true, message: 'Please select a category' }, 
                  { whitespace: true, message: 'Category cannot be empty' }]}>
                    
                     <Select
                     name="category"
                      value={selectedCategory}
                      onChange={(value) => setSelectedCategory(value)}
                      placeholder="Select a category"
                      options={hebrewOptions}>
                    </Select>
                    
                  </Form.Item>
                  
                  
                   <Form.Item name={['conceptName', 'english']} 
                   label="Concept Name (English)" 
                   rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                  
                  <Form.Item name={['conceptName', 'arabic']} label="Concept Name (Arabic)" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                  
                  
                  <Form.Item name={['conceptName', 'hebrew']} label="Concept Name (Hebrew)" rules={[{ required: true }]}>
                    <Input />
                  </Form.Item>
                  
                  
                  <Form.Item name="shortDefinition-english" label="Short Definition (English)" rules={[{ required: true }]}>
                    <Input.TextArea />
                  </Form.Item>
                  
                  
                  <Form.Item name="shortDefinition-arabic" label="Short Definition (Arabic)" rules={[{ required: true }]}>
                    <Input.TextArea />
                  </Form.Item>
                  
                  
                   <Form.Item name="shortDefinition-hebrew" label="Short Definition (Hebrew)" rules={[{ required: true }]}>
                    <Input.TextArea />
                  </Form.Item>
                  
        </Form>}
        

        
        </div>
        
    </>
        );
        
  function handleCategoryChange(value){
    setSelectedCategory(value);
  };

  function onReset() {
    form.resetFields();
    setSelectedCategory("");
  };
}


export default SuggestConceptPage;