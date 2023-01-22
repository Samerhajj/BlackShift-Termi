// React
import React, { useState, useEffect, useContext } from 'react';

// Translate
import { useTranslation } from 'react-i18next';
import LanguageMap from '../api/LanguageAPI';

// APIs
import CategoryApi from '../api/CategoryAPI';

// Components
import {LoginContext} from "./../components/LoginContext";

const CategorySelector = (props) => {
    const user = useContext(LoginContext);
    const { i18n, t } = useTranslation();
    const [selectedCategory, setSelectedCategory] = useState(-1);
    const [categories, setCategories] = useState([]);
    
    const getCategories = async () =>{
        const res = await CategoryApi.getAllCategories();
        if(res.success){
            const categories = res.body;
            setCategories(categories);
            if(user.userData === undefined){
                setSelectedCategory(-1);
            }else{
                const index = categories.findIndex(cat => cat.categoryId == parseInt(user.userData.field, 10));
                setSelectedCategory(index);
                console.log(categories);
            }
        }else{
            console.log(res.message);
        }
    };
    
    useEffect(() => {
        getCategories();
    }, [user]);
    
    useEffect(() => {
        onCategoryChange(selectedCategory);
    }, [selectedCategory]);
    
    const onCategoryChange = (newCategory) => {
        console.log("Category Changed " + categories[newCategory]);
        setSelectedCategory(newCategory);
        props.categoryChanged(categories[newCategory]);
    };
    
    return(
        <select 
            id="category"
            value={selectedCategory}
            className="selectpicker show-menu-arrow form-control mb-2"
            data-style="btn-primary"
            title="Category"
            onChange={(e)=>{onCategoryChange(e.target.value)}}>
            <option value={-1}>{t("category-selector.category")}</option>
            {
                categories.map((category, index) => {
                let categoryName = category.categoryName[LanguageMap[i18n.language].name];
                let uppercaseName = categoryName.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
                return (
                    <option key={index} value={index}>{uppercaseName}</option>
                )})
            }
        </select>
    );
};
export default React.memo(CategorySelector);