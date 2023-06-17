// React
import React, { useContext } from 'react';

// Translate
import { useTranslation } from 'react-i18next';
import LanguageMap from '../api/LanguageAPI';

// Contexts
import { CategoriesContext } from "./CategoryContext";

const CategorySelector = (props) => {
    const { categories } = useContext(CategoriesContext);
    const { i18n, t } = useTranslation();
    
    const onCategoryChange = (newCategory) => {
        props.categoryChanged(newCategory);
  
    };
    
    return(
        <div className="form-floating" dir="ltr">
            <select 
                id="category"
                className="form-select show-menu-arrow form-select pb-1"
                data-style="btn-primary"
                defaultValue={undefined}
                title="Category"
                value={props.category}
                onChange={(e)=>{onCategoryChange(e.target.value)}}>
                {
                    categories.map((category, index) => {
                    let categoryName = category.categoryName[LanguageMap[i18n.language].name];
                    let uppercaseName = categoryName.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
                    return (
                        <option key={index} value={category.categoryId}>{uppercaseName}</option>
                    )})
                }
            </select>
            <label htmlFor="category">{t("category-selector.category")}</label>

        </div>
    );
};
export default React.memo(CategorySelector);