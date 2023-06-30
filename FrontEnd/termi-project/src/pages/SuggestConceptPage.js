import React, { useState, useContext, useEffect } from "react";
import { Form, Input, Select, Button } from "antd";
import { useTranslation } from "react-i18next";
import { BsLink } from "react-icons/bs";
import axios from "axios";

// APIs
import UserAPI from "./../api/UserAPI";
import SearchApi from "../api/SearchAPI";
import NotificationsAPI from "../api/NotificationsAPI";
import GptApi from "../api/GptApi";

// Contexts
import { LoginContext } from "../components/LoginContext";
import { CategoriesContext } from "../components/CategoryContext";

import gpt_icon from "../assets/images/gpt_icon.png";

const SuggestConceptPage = () => {
  const [chatGptConcept, setChatGptConcept] = useState("");
  const { t, i18n } = useTranslation();

  const { userData, setUserData } = useContext(LoginContext);
  const { categories } = useContext(CategoriesContext);
  const [englishNameEntered, setEnglishNameEntered] = useState(false);
  const [arabicNameEntered, setArabicNameEntered] = useState(false);
  const [hebrewNameEntered, setHebrewNameEntered] = useState(false);
  const [showChatGptButton, setShowChatGptButton] = useState(false);
  const [fieldsDisabled, setFieldsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [chatGptClicked, setChatGptClicked] = useState(false);
  const [anyConceptNameEntered, setAnyConceptNameEntered] = useState(false);

  const [conceptName, setConceptName] = useState({
    english: "",
    arabic: "",
    hebrew: "",
  });
  const [shortDefinition, setShortDefinition] = useState({
    english: "",
    arabic: "",
    hebrew: "",
  });
  const [concept, setConcept] = useState(null);



  const [longDefinition, setLongDefinition] = useState({
    english: "",
    arabic: "",
    hebrew: "",
  });

  const handleEnglishNameChange = (e) => {
    const value = e.target.value;
    setEnglishNameEntered(value.length > 0);
    setAnyConceptNameEntered(
      value.length > 0 || arabicNameEntered || hebrewNameEntered
    );
  };

  const handleHebrewNameChange = (e) => {
    const value = e.target.value;
    setHebrewNameEntered(value.length > 0);
    setAnyConceptNameEntered(
      value.length > 0 || englishNameEntered || arabicNameEntered
    );
  };

  const handleArabicNameChange = (e) => {
    const value = e.target.value;
    setArabicNameEntered(value.length > 0);
    setAnyConceptNameEntered(
      value.length > 0 || englishNameEntered || hebrewNameEntered
    );
  };

  const handleChatGptButtonClick = async () => {
    setIsLoading(true);
    setChatGptClicked(true);
    try {
      setChatGptConcept("ChatGPT Processing.. takes time..");

      const userInput = form.getFieldValue(["conceptName", "english"]);
      const selectedCategoryIndex = form.getFieldValue("selectedCategory");
      const selectedCategory = categories.find(
        (category) => category.categoryId === selectedCategoryIndex
      );
      const englishCategoryName = selectedCategory
        ? selectedCategory.categoryName.english
        : "";

      const conceptResponse = await GptApi.generateDefinitions(userInput);
      const response = JSON.parse(conceptResponse);
      // Update form fields with API response
      
    form.setFieldsValue({
      conceptName: {
        english: response.conceptName.english,
        arabic: response.conceptName.arabic,
        hebrew: response.conceptName.hebrew,
      },
      shortDefinition: {
        english: response.shortDefinition.english,
        arabic: response.shortDefinition.arabic,
        hebrew: response.shortDefinition.hebrew,
      },
      longDefinition: {
        english: response.longDefinition.english,
        arabic: response.longDefinition.arabic,
        hebrew: response.longDefinition.hebrew,
      },
    });
    
     // Update the state variables to show the entire form
    setEnglishNameEntered(true);
    setHebrewNameEntered(true);
    setArabicNameEntered(true);
    setAnyConceptNameEntered(true);
    } catch (error) { 
      console.error("Error fetching concept from the API:", error);
    } finally {
      setIsLoading(false);
      setChatGptConcept("Get Concepts ideas ChatGPT");
    }
    
  };

  useEffect(() => {
    setShowChatGptButton(
      englishNameEntered || arabicNameEntered || hebrewNameEntered
    );
  }, [englishNameEntered, arabicNameEntered, hebrewNameEntered]);

  useEffect(() => {
    const englishName = form.getFieldValue(["conceptName", "english"]);
    const arabicName = form.getFieldValue(["conceptName", "arabic"]);
    const hebrewName = form.getFieldValue(["conceptName", "hebrew"]);

    setShowChatGptButton(!!(englishName || arabicName || hebrewName));
  }, [form]);

  useEffect(() => {
    if (englishNameEntered) {
      setChatGptConcept("");
    }
  }, [englishNameEntered]);
const validateUrl = async (rule, value) => {
  if (!value) {
    return Promise.resolve();
  } else if (!/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/.test(value)) {
    return Promise.reject("Invalid URL");
  } else {
    return Promise.resolve();
  }
};

  const [form] = Form.useForm();

  const onFinish = async (values) => {
    let searchRes;
    if (englishNameEntered) {
      searchRes = await SearchApi.search(
        conceptName.english,
        "english",
        values.selectedCategory
      );
    } else if (arabicNameEntered) {
      searchRes = await SearchApi.search(
        conceptName.arabic,
        "arabic",
        values.selectedCategory
      );
    } else {
      searchRes = await SearchApi.search(
        conceptName.hebrew,
        "hebrew",
        values.selectedCategory
      );
    }

    if (!searchRes.success && searchRes.error == false) {
      values.suggestedBy = userData.fullName;
      values._id = userData._id;

      // Retrieve short definition from concept name if not already entered
      if (!values.shortDefinition) {
        values.shortDefinition = {
          english: values.conceptName.english,
          arabic: values.conceptName.arabic,
          hebrew: values.conceptName.hebrew,
        };
      }

      // Retrieve short definition from ChatGPT if requested
      if (values.retrieveShortDefinition) {
        try {
          const response = await axios.get("https://ser.y2022.kinneret.cc/gpt-api");
          const data = response.data;
          const concept = data.concept;
          values.shortDefinition = {
            english: concept,
          };
        } catch (error) {
          console.error("Error fetching concept from the API:", error);
        }
      }

      console.log(values);
      const res = await UserAPI.suggestFromUser(values);
      values.suggestion = userData["suggestion"];
      console.log(res);
      if (res.success) {
        setUserData({ ...userData, suggestConceptCounter: userData.suggestConceptCounter + 1 });
        NotificationsAPI.successNotification("Suggestion Submitted!");
      } else {
        console.log(res.message);
      }
      onReset();
    } else {
      NotificationsAPI.errorNotification("Concept already exists!");
    }
  };

  const checkConceptName = (_, value) => {
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

  function onReset() {
    form.resetFields();
    setEnglishNameEntered(false);
    setArabicNameEntered(false);
    setHebrewNameEntered(false);
    setAnyConceptNameEntered(false);
  }

  return (
    <>
      <div className="banner banner_note">
        <div className="wrapper">
          <div className="banner_content">
            <h1 className="">
              <strong>
                <h3>{t("suggest_concept_page.suggest_title")}</h3>
              </strong>
            </h1>
          </div>
        </div>
      </div>

      <div className="wrapper">
        <Form
          {...layout}
          className="mt-5"
          form={form}
          name="nest-messages"
          onFinish={onFinish}
          validateMessages={validateMessages}
        >

          <div style={{ display: "flex", justifyContent: "center",marginTop: "0px",marginBottom:"10px" }}>
            {showChatGptButton && (
              <Button
                className="chatGptButton"
                onClick={handleChatGptButtonClick}
                disabled={isLoading}
              >
                <img
                  src={gpt_icon}
                  alt="GPT Icon"
                  style={{ width: "25px", height: "25px", marginRight: "10px" ,marginBottom:"4px"}}
                />
                {isLoading
                  ? "ChatGPT Processing.. takes time.."
                  : chatGptConcept || "Get Concepts ideas ChatGPT"}
              </Button>
            )}
          </div>
          

          <Form.Item
            label={t("suggest_concept_page.category_en")}
            name="selectedCategory"
            rules={[{ required: true, message: "Please select a category" }]}
          >
            <Select
              name="categoryEN"
              placeholder="Select a category"
              disabled={isLoading}
            >
              {categories.map((category, index) => (
                <Select.Option
                  key={index}
                  value={category.categoryId}
                >
                  {category.categoryName.english.toUpperCase()}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label={t("suggest_concept_page.category_ar")}
            name="selectedCategory"
            rules={[{ required: true, message: "Please select a category" }]}
          >
            <Select
              name="categoryAR"
              placeholder="Select a category"
              disabled={isLoading}
            >
              {categories.map((category, index) => (
                <Select.Option
                  key={index}
                  value={category.categoryId}
                >
                  {category.categoryName.arabic}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label={t("suggest_concept_page.category_he")}
            name="selectedCategory"
            rules={[{ required: true, message: "Please select a category" }]}
          >
            <Select
              name="categoryHE"
              placeholder="Select a category"
              disabled={isLoading}
            >
              {categories.map((category, index) => (
                <Select.Option
                  key={index}
                  value={category.categoryId}
                >
                  {category.categoryName.hebrew}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name={["conceptName", "english"]}
            label={t("suggest_concept_page.c_name_en")}
            rules={[{ validator: (_, value) => checkConceptName(_, value) }]}
          >
            <Input
              onChange={handleEnglishNameChange}
              disabled={isLoading}
            />
          </Form.Item>

          <Form.Item
            name={["conceptName", "arabic"]}
            label={t("suggest_concept_page.c_name_ar")}
            rules={[{ validator: (_, value) => checkConceptName(_, value) }]}
          >
            <Input
              onChange={handleArabicNameChange}
              disabled={isLoading}
            />
          </Form.Item>

          <Form.Item
            name={["conceptName", "hebrew"]}
            label={t("suggest_concept_page.c_name_he")}
            rules={[{ validator: (_, value) => checkConceptName(_, value) }]}
          >
            <Input
              onChange={handleHebrewNameChange}
              disabled={isLoading}
            />
          </Form.Item>

          {englishNameEntered && (
            <Form.Item
              name={["shortDefinition", "english"]}
              label={t("suggest_concept_page.s_def-en")}
              rules={[{ required: true }]}
            >
              <Input.TextArea
                disabled={isLoading}
                value={shortDefinition.english}
                onChange={(e) =>
                  setShortDefinition({
                    ...shortDefinition,
                    english: e.target.value,
                    arabic: shortDefinition.arabic,
                    hebrew: shortDefinition.hebrew,
                  })
                }
              />
            </Form.Item>
          )}

          {arabicNameEntered && (
            <Form.Item
              name={["shortDefinition", "arabic"]}
              label={t("suggest_concept_page.s_def-ar")}
              rules={[{ required: true }]}
            >
              <Input.TextArea
                disabled={isLoading}
                value={shortDefinition.arabic}
              />
            </Form.Item>
          )}

          {hebrewNameEntered && (
            <Form.Item
              name={["shortDefinition", "hebrew"]}
              label={t("suggest_concept_page.s_def-he")}
              rules={[{ required: true }]}
            >
              <Input.TextArea
                disabled={isLoading}
                value={shortDefinition.hebrew}
              />
            </Form.Item>
          )}

          {englishNameEntered && (
            <Form.Item
              name={["longDefinition", "english"]}
              label={t("suggest_concept_page.l_def-en")}
              rules={[{ required: false }]}
            >
              <Input.TextArea
                disabled={isLoading}
                value={longDefinition.english}
                onChange={(e) =>
                  setLongDefinition({
                    ...longDefinition,
                    english: e.target.value,
                  })
                }
              />
            </Form.Item>
          )}

          {arabicNameEntered && (
            <Form.Item
              name={["longDefinition", "arabic"]}
              label={t("suggest_concept_page.l_def-ar")}
              rules={[{ required: false }]}
            >
              <Input.TextArea
                disabled={isLoading}
                value={longDefinition.arabic}
              />
            </Form.Item>
          )}

          {hebrewNameEntered && (
            <Form.Item
              name={["longDefinition", "hebrew"]}
              label={t("suggest_concept_page.l_def-he")}
              rules={[{ required: false }]}
            >
              <Input.TextArea
                disabled={isLoading}
                value={longDefinition.hebrew}
              />
            </Form.Item>
          )}

          <Form.Item
            name={"readMore"}
            label={<BsLink style={{ fontSize: "24px" }} />}
            rules={[{ required: false, validator: validateUrl }]}
          >
            <Input disabled={isLoading} />
          </Form.Item>

         <Form.Item style={{ display: 'flex', justifyContent: 'center', marginTop: '25px' }}>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginTop: "25px" }}
              disabled={isLoading}
            >
              {t("suggest_concept_page.sbtn")}
            </Button>
            <Button
              type="danger"
              onClick={onReset}
              disabled={isLoading}
            >
              {t("suggest_concept_page.rbtn")}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default SuggestConceptPage;
