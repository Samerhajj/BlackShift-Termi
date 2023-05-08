// --> React
import React, { useContext, useState } from 'react'
import { Modal, Button } from "react-bootstrap";
import { useTranslation } from 'react-i18next';

// --> APIs
import LanguageMap from '../../../api/LanguageAPI';

// --> Contexts
import { CategoriesContext } from "../../../components/CategoryContext";
import { LoginContext } from "../../../components/LoginContext";
const EditProfileModal = (props)=>{
    const user = useContext(LoginContext);
  const { categories } = useContext(CategoriesContext);
  const { i18n, t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState(user.userData.field);
  const [gender, setGender] = useState(user.userData.gender);
  const [language, setLanguage] = useState(user.userData.language);
     const [selectedStatus, setSelectedStatus] = useState(user.userData.status);

console.log(user);
const statusOptions = [
  { value: "Student", label: "Student" },
  { value: "Works in the field", label: "Works in the field" },
  { value: "Other", label: "Other" }
];


  
  const onCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    props.handleChange(e);
  };
  
  const onGenderChange = (e) => {
    setGender(e.target.value);
    props.handleChange(e);
  };
  
  const onLanguageChange = (e) => {
    setLanguage(e.target.value);
    props.handleChange(e);
  };
  
 
  const onStatusChange = (e) => {
  const selectedValues = Array.from(e.target.selectedOptions, option => option.value);
  setSelectedStatus(selectedValues);
  props.handleChange({target: {name: "status" , value: selectedValues}});
};

  
    return(
    <Modal show={props.showModal} onHide={props.handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{t('profile.medit')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <form>
            <label>{t('profile.mfullname')}</label>
            <input type="text" onChange={props.handleChange}   name="fullName" className="form-control" value=
            {props.formValues.fullName}/>
            
            {/*<label>Email</label>
            <input type="email" onChange={props.handleChange} name="email" className="form-control" value=
            {props.formValues.email}/>*/}
            
            <label>{t('profile.mphonenumber')}</label>
            <input type="text" onChange={props.handleChange} name="phone" className="form-control" value=
            {props.formValues.phone}/>
            
            <label>{t('profile.mcategory')}</label>
            <select 
              id="category"
              className="selectpicker show-menu-arrow form-control mb-2"
              data-style="btn-primary"
              title="Category"
              name="field"
              value={selectedCategory}
              onChange={(e) =>{ onCategoryChange(e) }}>
              <option value={undefined} disabled selected>{t("category-selector.category")}</option>
              {
                  categories.map((category, index) => {
                  let categoryName = category.categoryName[LanguageMap[i18n.language].name];
                  let uppercaseName = categoryName.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
                  return (
                      <option key={index} value={category.categoryId}>{uppercaseName}</option>
                  )})
              }
            </select>
            
            <label>{t('profile.mplanguage')}</label>
            {/*<input type="text" onChange={props.handleChange} name="language" className="form-control" value={props.formValues.language}/>*/}
            
            <select 
              className="selectpicker show-menu-arrow form-control mb-2"
              aria-label="Default select"
              id="lang"
              name="language"
              value={language}
              onChange={(e) => {onLanguageChange(e)}}>
                <option value="" disabled selected>{t('register.select_lang')}</option>
                <option value="English">{t('register.lang_en')}</option>
                <option value="Arabic">{t('register.lang_ar')}</option>
                <option value="Hebrew">{t('register.lang_he')}</option>
            </select>
            
            <label>{t('profile.gender')}</label>
            <select
              className="selectpicker show-menu-arrow form-control mb-2"
              name="gender"
              value={gender}
              onChange={(e) =>{ onGenderChange(e) }}>
                <option value="" disabled selected>gender</option>
                <option value="male">♂</option>
                <option value="female">♀</option>
                <option value="other">⚧</option>
            </select>
            </form>
            
   <label>{t('profile.status')}</label>
{statusOptions.map((option) => (
  <div key={option.value} className="form-check">
    <input
      className="form-check-input"
      type="checkbox"
      name="status"
      value={option.value}
      checked={selectedStatus.includes(option.value)}
     onChange={(e) => {
  if (e.target.checked) {
    setSelectedStatus([...selectedStatus, option.value]);
  } else {
    setSelectedStatus(selectedStatus.filter((s) => s !== option.value));
  }
  setSelectedStatus((updatedStatus) => {
    props.handleChange({
      target: {
        name: "status",
        value: updatedStatus,
      },
    });
    return updatedStatus;
  });
}}

    />
        <label>{t(`profile.statusOptions.${option.label}`)}</label>
  </div>
))}



        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleCloseModal}>
            {t('profile.mclose')}
          </Button>
          <Button variant="primary" onClick={props.handleSaveChanges}>
            {t('profile.msavechanges')}
          </Button>
        </Modal.Footer>
    </Modal>
    )
}
export default EditProfileModal;
