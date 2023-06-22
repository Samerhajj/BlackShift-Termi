import React, { useState, useContext } from 'react';
import { Form, Input, Button, Spin,Select  } from 'antd';
import GptApi from '../api/GptApi';
import TermCard from '../components/TermCard/TermCard';
import CategorySelector from '../components/CategorySelector';
import UserAPI from "./../api/UserAPI";
import {LoginContext} from "./../components/LoginContext";

// Contexts
import { CategoriesContext } from "../components/CategoryContext";

const { Option } = Select;
const ChatGptPage = () => {
  const { categories } = useContext(CategoriesContext);
    const user = useContext(LoginContext);
  console.log(user)
  const [form] = Form.useForm();
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
const [gptConcept,setGptConcept]=useState();
  const handleFormChange = () => {
    const { getFieldValue } = form;
    const field1 = getFieldValue('field1');
    const field2 = getFieldValue('field2');
    setButtonDisabled(!field1);
  };
const handleButtonClick = async () => {
  try {
    const { getFieldValue } = form;
    const termName = getFieldValue('field1');
    const field2 = getFieldValue('field2');

    const category = categories.find((categry) => categry.categoryId === field2);

    setLoading(true);
    setButtonDisabled(true);

    // Perform your logic here with the form values
    const concept = await GptApi.generateDefinitions(termName);
    const parsedConcept = JSON.parse(concept);

    // Access the individual values
    const termEnglish = parsedConcept.conceptName.english;
    const termArabic = parsedConcept.conceptName.arabic;
    const termHebrew = parsedConcept.conceptName.hebrew;

    const shortDefEnglish = parsedConcept.shortDefinition.english;
    const shortDefArabic = parsedConcept.shortDefinition.arabic;
    const shortDefHebrew = parsedConcept.shortDefinition.hebrew;

    const longDefEnglish = parsedConcept.longDefinition.english;
    const longDefArabic = parsedConcept.longDefinition.arabic;
    const longDefHebrew = parsedConcept.longDefinition.hebrew;

    parsedConcept.categories = { data: [category.categoryName] };

    // Print the individual values
    console.log("Term in English:", termEnglish);
    console.log("Term in Arabic:", termArabic);
    console.log("Term in Hebrew:", termHebrew);

    console.log("Short Definition in English:", shortDefEnglish);
    console.log("Short Definition in Arabic:", shortDefArabic);
    console.log("Short Definition in Hebrew:", shortDefHebrew);

    console.log("Long Definition in English:", longDefEnglish);
    console.log("Long Definition in Arabic:", longDefArabic);
    console.log("Long Definition in Hebrew:", longDefHebrew);

    console.log(parsedConcept);
    setGptConcept(parsedConcept);

    // Call the suggestFromUser function to send the values to the backend
    const response = await UserAPI.suggestFromUser({
      selectedCategory: [category.categoryId],
      shortDefinition: {
        english: shortDefEnglish,
        arabic: shortDefArabic,
        hebrew: shortDefHebrew,
      },
      conceptName: {
        english: termEnglish,
        arabic: termArabic,
        hebrew: termHebrew,
      },
      suggestedBy: user.userData.fullName, // Replace with the actual suggested by value
      longDefinition: {
        english: longDefEnglish,
        arabic: longDefArabic,
        hebrew: longDefHebrew,
      },
      _id: user.userData._id, // Replace with the actual user ID value
      readMore: "", // Replace with the actual read more value
    });

    setLoading(false);
    console.log("Suggestion Response:", response);
  } catch (error) {
    setLoading(false);
    console.error('Error fetching concept from the API:', error);
  } finally {
    setButtonDisabled(false); // Enable the button
  }
};

  const handleCategoryChange = value => {
    console.log(value); // Log the value of field2
  };
  return (
    <>
      <div className="banner banner_game">
        <div className='wrapper'>
          <div className="banner_content" />
        </div>
      </div>
         {console.log(form.getFieldValue('field2'))}
      <h1>Ask ChatGPT</h1>
          {console.log(categories)}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', marginTop: '-200px', background: '#f0f2f5' }}>
        <div>
          <Form form={form} onFieldsChange={handleFormChange}>
            <Form.Item name="field1" rules={[{ required: true, message: 'Field 1 is required' }]}>
              <Input placeholder="Concept Name" />
            </Form.Item>
             <Form.Item name="field2" rules={[{ required: true, message: 'Field 2 is required' }]}>
              <Select
                placeholder="Select a category"
                onChange={handleCategoryChange}
                allowClear
              >
                {categories.map((category, index) => {
                  const categoryName = category.categoryName.english;
                  return (
                    <Option key={index} value={category.categoryId}>
                      {categoryName}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item>
              <Button type="primary" onClick={handleButtonClick} disabled={buttonDisabled}>
                Submit
              </Button>
            </Form.Item>
            
          </Form>
        {loading && <Spin />}
{gptConcept ? (
  <div>
    <TermCard
      role={"role"}
      term={gptConcept}
      isSearch={true}
      isFavorite={"true"}
      initialLanguage={"en"}
      //categories={{data: [{"english": "Human Resources","arabic":"الموارد البشرية","hebrew":"משאבי אנוש"}]}}
      categories={gptConcept.categories}
    />
  </div>
) : null}
        </div>
      </div>
    </>
  );
};

export default ChatGptPage;
