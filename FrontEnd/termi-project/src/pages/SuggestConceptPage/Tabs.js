import React from 'react';
import { useState } from "react";
import { Form, Input,Select, Button } from 'antd';
import styles from "./SConcept.module.css";
import UserAPI from './../../api/UserAPI';


function Tabs() {
    
    const [toggleState, setToggleState] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState("");
    const englishOptions = [
      { value: 0, label: 'human resources' },
      { value: 1, label: 'software engineering' },
      { value: 'medicine', label: 'medicine' },
    ];
    const hebrewOptions = [
      { value: 0, label: 'משאבי אנוש' },
      { value: 1, label: 'תִכנוּת' },
      { value: 'medicine', label: 'רפואה' },
    ];
    const arabicOptions = [
      { value: 0, label: 'الموارد البشرية' },
      { value: 1, label: 'برمجة' },
      { value: 'medicine', label: 'طب' },
    ];
    const [form] = Form.useForm();
    const layout = {
    //   labelCol: { span: 8 },
    //   wrapperCol: { span: 16 },
    };
    const tailLayout = {
    //   wrapperCol: { span: 8, span: 16 },
    };
    console.log("IN TABS")
  const toggleTab = (index) => {
    setToggleState(index);
  };

  const onFinish = async(values)=> {
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
  

  function onReset() {
    form.resetFields();
    setSelectedCategory("");
  };


// const validateMessages = {
//   required: '${label} is required!',
//   types: {
//     email: '${label} is not validate email!',
//     number: '${label} is not a validate number!',
//   },
//   number: {
//     range: '${label} must be between ${min} and ${max}',
//   },
// };

  return (
    <div className="container">
      <div className={styles.bloc_tabs}>
        <button
          className={styles.toggleState === 1 ? `${styles.tabs} ${styles.active_tabs} ${styles.tab_button}` : `${styles.tabs} ${styles.tab_button}`}
          onClick={() => toggleTab(1)}
        >
          English
        </button>
        <button
          className={toggleState === 2 ? `${styles.tabs} ${styles.active_tabs} ${styles.tab_button}` : `${styles.tabs} ${styles.tab_button}`}
          onClick={() => toggleTab(2)}
        >
          עברית
        </button>
        <button
          className={toggleState === 3 ? `${styles.tabs} ${styles.active_tabs} ${styles.tab_button}` : `${styles.tabs} ${styles.tab_button}`}
          onClick={() => toggleTab(3)}
        >
          العربية
        </button>
      </div>

      <div className={styles.content_tabs}>
        <div
          className={toggleState === 1 ? `${styles.content} ${styles.active_content} `: styles.content}
        >
            <Form {...layout}  form ={form} name="nest-messages" onFinish={onFinish}>
                {/*<Form.Item {...tailLayout}>

                  </Form.Item>*/}

                    <Form.Item label="Category (English)" >
                      <Select
                         name="category"
                        placeholder="Select a category"
                        value={selectedCategory}
                        onChange={(value) => setSelectedCategory(value)}
                        options={englishOptions}>
                      </Select>
                    </Form.Item>
                  
                   <Form.Item name={['conceptName', 'english']} 
                   label="Concept Name (English)" 
                   >
                    <Input />
                  </Form.Item>
                  
                    <Form.Item name="shortDefinition-english" label="Short Definition (English)">
                        <Input.TextArea />
                    </Form.Item>
                    
                    <Button type="primary" htmlType="submit" style={{marginTop: '25px'}}>
                        Suggest
                    </Button>
                    
                    <Button type="danger" onClick={onReset}>
                        Reset
                    </Button>
        </Form>
        </div>

        <div
          className={toggleState === 2 ? `${styles.content} ${styles.active_content} `: styles.content}
        >
                     <Form {...layout}  form ={form} name="nest-messages" onFinish={onFinish} >
                {/*<Form.Item {...tailLayout}>

                  </Form.Item>*/}

                   <Form.Item label="Category (Hebrew)">
                     <Select
                     name="category"
                      value={selectedCategory}
                      onChange={(value) => setSelectedCategory(value)}
                      placeholder="Select a category"
                      options={hebrewOptions}>
                    </Select>
                    
                  </Form.Item>
                  
                    <Form.Item name={['conceptName', 'hebrew']} label="Concept Name (Hebrew)">
                        <Input />
                    </Form.Item>
                  
                  <Form.Item name="shortDefinition-hebrew" label="Short Definition (Hebrew)">
                    <Input.TextArea />
                  </Form.Item>
                    
                    <Button type="primary" htmlType="submit" style={{marginTop: '25px'}}>
                        Suggest
                    </Button>
                    
                    <Button type="danger" onClick={onReset}>
                        Reset
                    </Button>
        </Form>
        </div>
                <div
          className={toggleState === 3 ? `${styles.content} ${styles.active_content} `: styles.content}
        >
                   <Form {...layout}  form ={form} name="nest-messages" onFinish={onFinish} >
               {/*<Form.Item {...tailLayout}>

                  </Form.Item>*/}

                    <Form.Item label="Category (Arabic)" >
                   
                    <Select
                      name="category"
                      value={selectedCategory}
                      onChange={(value) => setSelectedCategory(value)}
                      placeholder="Select a category"
                      options={arabicOptions}>
                    </Select>
                  </Form.Item>
                  
                  <Form.Item name={['conceptName', 'arabic']} label="Concept Name (Arabic)" >
                    <Input />
                  </Form.Item>
                  
                  <Form.Item name="shortDefinition-arabic" label="Short Definition (Arabic)" >
                    <Input.TextArea />
                  </Form.Item>
                    
                    <Button type="primary" htmlType="submit" style={{marginTop: '25px'}}>
                        Suggest
                    </Button>
                    
                    <Button type="danger" onClick={onReset}>
                        Reset
                    </Button>
        </Form>
        </div>
        
        
      </div>
    </div>
  );
}

export default Tabs;