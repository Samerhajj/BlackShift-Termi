// React
import React, { useState, useEffect } from 'react';

// Translate
import { useTranslation } from 'react-i18next';
import LanguageMap from '../api/LanguageAPI';

// APIs
import CategoryApi from '../api/CategoryAPI';

const CategorySelector = (props) => {
    const { i18n, t } = useTranslation();
    const [selectedCategory, setSelectedCategory] = useState(props.initialCategory);
    const [categories, setCategories] = useState([]);
    
    useEffect(() => {
        const getCategories = async () =>{
            const res = await CategoryApi.getAllCategories();
            if(res.success){
                const categories = res.body;
                setCategories(categories);
                const index = categories.findIndex(cat => cat.categoryId == props.initialCategory);
                setSelectedCategory(index);
                console.log(categories);
            }else{
                console.log(res.message);
            }
        };
        getCategories();
    }, []);
    
    const onCategoryChange = (newCategory) => {
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
            <option value="Category">{t("category-selector.category")}</option>
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