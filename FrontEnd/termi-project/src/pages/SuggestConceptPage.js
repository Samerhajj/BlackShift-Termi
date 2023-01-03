import React,{useState} from "react";
import { Form, Input,Select, Button } from 'antd';
import { useTranslation } from 'react-i18next';

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
const SuggestConceptPage=()=>{
  
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
      const user = JSON.parse(localStorage.getItem('profileBody'));
    values.suggestedBy = user.fullName;
      values.shortDefinition = {
    english: values['shortDefinition-english'],
    arabic: values['shortDefinition-arabic'],
    hebrew: values['shortDefinition-hebrew']
  };
   values.longDefinition = {
    english: values['longDefinition-english'],
    arabic: values['longDefinition-arabic'],
    hebrew: values['longDefinition-hebrew']
  };
  delete values['shortDefinition-english'];
delete values['shortDefinition-arabic'];
delete values['shortDefinition-hebrew'];
delete values['longDefinition-english'];
delete values['longDefinition-arabic'];
delete values['longDefinition-hebrew'];
   console.log(values);
  };
    
    const [selectedCategory, setSelectedCategory] = useState("");

const handleCategoryChange = (value) => {
  setSelectedCategory(value);
};

const [form] = Form.useForm();
const onReset = () => {
  form.resetFields();
  setSelectedCategory("");
};


    //concept names have to be Select
    return (
        <>
    <div className="banner banner_profile">
        <div className="wrapper">
          <div className="banner_content">
            <h1 className="pulsing-element">
              <strong>Suggest Concept...</strong>
            </h1>
          </div>
        </div>
    </div>
    
    <div className="wrapper">
     <Form {...layout}  form ={form} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
    <Form.Item {...tailLayout}>
  <Button type="primary" htmlType="submit" >
    Suggest
  </Button>
 <Button type="danger" onClick={onReset}>
    Reset
  </Button>
</Form.Item>
      <Form.Item label="URL" name="ReadMore" rules={[{ validator: validateUrl }]}>
        <Input />
      </Form.Item>
        <Form.Item label="Category (English)" rules={[{ required: true, message: 'Please select a category' },
        { whitespace: true, message: 'Category cannot be empty' }]}>>
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
        <Form.Item label="Category (Arabic)" rules={[{ required: true, message: 'Please select a category' }, 
        { whitespace: true, message: 'Category cannot be empty' }]}>>
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
      <Form.Item label="Category (Hebrew)" rules={[{ required: true, message: 'Please select a category' }, 
      { whitespace: true, message: 'Category cannot be empty' }]}>>
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
      <Form.Item name="shortDefinition-english" label="Short Definition (English)" rules={[{ required: true }]}>
        <Input.TextArea />
      </Form.Item>
      <Form.Item name="shortDefinition-arabic" label="Short Definition (Arabic)" rules={[{ required: true }]}>
        <Input.TextArea />
      </Form.Item>
       <Form.Item name="shortDefinition-hebrew" label="Short Definition (Hebrew)" rules={[{ required: true }]}>
        <Input.TextArea />
      </Form.Item>
       <Form.Item name="longDefinition-english" label="Long Definition (English)" rules={[{ required: true }]}>
        <Input.TextArea />
      </Form.Item>
       <Form.Item name="longDefinition-arabic" label="Long Definition (Arabic)" rules={[{ required: true }]}>
        <Input.TextArea />
      </Form.Item>
       <Form.Item name="longDefinition-hebrew" label="Long Definition (Hebrew)" rules={[{ required: true }]}>
        <Input.TextArea />
      </Form.Item>
        </Form>
        </div>
        
    </>
        );
}


export default SuggestConceptPage;