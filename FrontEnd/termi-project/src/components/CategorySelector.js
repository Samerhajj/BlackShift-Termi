// React
import React, { useState, useEffect, useContext } from 'react';

// Translate
import { useTranslation } from 'react-i18next';
import LanguageMap from '../api/LanguageAPI';

// Contexts
import { CategoriesContext } from "./CategoryContext";
import { LoginContext } from "./LoginContext";

// Components

const CategorySelector = (props) => {
    const user = useContext(LoginContext);
    const { categories } = useContext(CategoriesContext);
    const { i18n, t } = useTranslation();
    
    const onCategoryChange = (newCategory) => {
        console.log("Category Changed " + newCategory);
        props.categoryChanged(newCategory);
    };
    
    return(
        <select 
            id="category"
            className="selectpicker show-menu-arrow form-control mb-2"
            data-style="btn-primary"
            defaultValue={undefined}
            title="Category"
            value={props.category}
            onChange={(e)=>{onCategoryChange(e.target.value)}}>
            <option value={undefined} disabled>{t("category-selector.category")}</option>
            {
                categories.map((category, index) => {
                let categoryName = category.categoryName[LanguageMap[i18n.language].name];
                let uppercaseName = categoryName.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
                return (
                    <option key={index} value={category.categoryId}>{uppercaseName}</option>
                )})
            }
        </select>
    );
};
export default React.memo(CategorySelector);